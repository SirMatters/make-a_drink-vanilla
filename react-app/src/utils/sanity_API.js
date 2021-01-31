import dotenv from 'dotenv'
import { _getUsersByIds } from './API';
const sanityClient = require('@sanity/client');

dotenv.config({path: '.env'});
const SANITY_TOKEN = process.env.SANITY_TOKEN;

const client = sanityClient({
  projectId: 'dbheocak',
  dataset: 'production',
  token: SANITY_TOKEN,
  useCdn: false
})

const formatCocktail = (cocktail) => {
  cocktail.steps = cocktail.steps || [];
	return {
		...cocktail,
		"votes" : cocktail.votes.length || 0,
		"score" : +(cocktail.votes.reduce((a,b) => {
			a += b.votes[0].score
			return a
		}, 0) / cocktail.votes.length).toFixed(2) || 0,
		"timestamp": new Date(cocktail.timestamp).getTime(),
		"steps": cocktail.steps.reduce((a,b,i) => {
			a[i+1] = b;
			return a
		}, {})
	}
}

export const _getCocktails = () => {
  const query =  `
  *[
    _type == "cocktail" &&
    !(_id in path('drafts.**'))
  ] {
    "id": _id,
    name, 
    steps,
    "author": author->_id,
    "timestamp": _createdAt,
    "ingredients": ingredients[] -> _id,
     "votes": *[_type == "person" && references(^._id)] {votes[]{
        score,
        "id": cocktail._ref
      }}
  }
  `
  return client
    .fetch(query)
    .then(cocktails => cocktails.map(formatCocktail))
}

export const _deleteCocktail  = () => {}

export const _editCocktail  = () => {}


const testCocktail = {
  _type: 'cocktail',
  name: 'The ERSH7',
  author: {
    "_ref": "7137ccb1-1fcd-4cff-aeb7-5b95d2a24a36",
    "_type": "reference"
  },
  description: "Ersh will fucking screw you. Indeed, screw you!",
  steps: [
    "Add some vodka to shit lager",
    "Drink like it is your last day on the Earth (it is)."
  ],
  tags: ['beer', 'vodka'],
  ingredients: []
}

const _addCocktail = (cocktail) => {
  return client
    .create(cocktail)
    .then(res => {
    console.log(`A new cocktail was created ${res._id}`)
  })
}


const formatPerson = (person) => {
	person.votes = person.votes || []
  person.votes = person.votes.reduce((a,b) => {
    a[b.id] = b.score
    return a
  }, {})
	return person
}

export const _getUsers = () => {
  return client
    .fetch(`
    *[_type == "person" && 
    !(_id in path('drafts.**'))]{
      "id": _id,
      "handle": handle.current,
      firstName,
      lastName,
      "avatar": avatar.asset->url,
      "votes" : votes[] {
        score,
        "id": cocktail -> _id
			}
    }
    `)
    .then(persons => {
      return persons.reduce((a,b) => {
        a[b.id] = formatPerson(b);
        return a
      }, {})
    })
}

export const _getUserDataById = (userId) => {
  return client.fetch(`
  *[_id == "${userId}"]{
    "id": _id,
      "handle": handle.current,
      firstName,
      lastName,
      "avatar": avatar.asset->url,
      "votes" : votes[] {
        score,
        "id": cocktail -> _id
			}
  }`)
  .then(res => {
    console.log('Person fetched from sanity:', formatPerson(res[0]))
    return res[0]
  })
  .catch(err => `User fetch error: ${err}`)
}

export const _formatComment = (comment) => {
  comment.timestamp = comment.timestamp || new Date().getTime();
  comment.timestamp = new Date(comment.timestamp).getTime()
  comment.edited = null; // FIXME: replace null with exact value
  return comment
}

export const _getComments = () => {
  return client
  .fetch(`
    *[_type == "comment" && !(_id in path('drafts.**'))] {
      "id": _id,
      text,
      "author" : author -> _id,
      "timestamp" : _cratedAt,
      "isFor" : isFor -> _id,
      likes,
      "replyingTo" : replyingTo -> _id
    }
  `)
  .then(comments => {
    return comments.reduce((a,b) => {
      a[b.id] = _formatComment(b);
      return a
    }, {})
  })
}

(async () => {
  const ent = await _getUserDataById('8ac170bf-65a8-4d0e-b649-5b31b16f5d90');
  console.log(ent)
})();
