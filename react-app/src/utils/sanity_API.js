import dotenv from 'dotenv'
const sanityClient = require('@sanity/client');

dotenv.config({path: '.env'});
const SANITY_TOKEN = process.env.SANITY_TOKEN;

const client = sanityClient({
  projectId: 'dbheocak',
  dataset: 'production',
  token: SANITY_TOKEN,
  useCdn: true
})

const formatCocktails = (cocktails) => {
  const res = cocktails.reduce((a,b) => {
    a[b._id] = {};
    a[b._id] = {
      id: b._id,
      name: b._name,
      timestamp: new Date(b._createdAt).getTime(),
      author: b.author._ref, // FIXME: get acutal person, not ref
      description: b.description,
      steps: b.prepSteps ? b.prepSteps.reduce((aa,bb,ii) => {
        aa[ii+1] = { text: bb.stepText}
        return aa
      },{}) : {},
      ingredients: [],
      tags: [],
      image: b.mainImage._ref // FIXME: get actual image link, not ref
    };
    return a
  }, {})
  return res
}

export const _getCocktails = () => {
  const query =  `*[_type == "cocktail" && !(_id in path('drafts.**'))]`
  return client
    .fetch(query)
    .then(cocktails => formatCocktails(cocktails))
}

export const _deleteCocktail  = () => {}

export const _editCocktail  = () => {}


// _getCocktails();

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

// _addCocktail(testCocktail)

const formatPerson = (person) => {
	person.votes = person.votes || []
  person.votes = person.votes.map(v => {
    return {
      [v.id]: v.score
    }
  })
	return person
}

const _getPersons = () => {
  return client
    .fetch(`
    *[_type == "person" && !(_id in path('drafts.**'))]{
      "id": _id,
      "handle": handle.current,
      firstName,
      lastName,
      "avatar": avatar.asset->url,
      "votes" : votes[] {
        score,
        "id": cocktail._ref
			}
    }
    `)
    .then(res => {
      console.log(JSON.stringify(res))
    })
}

const _formatComment = (comment) => {
  comment.timestamp = comment.timestamp || new Date().getTime();
  comment.timestamp = new Date(comment.timestamp).getTime()
  comment.edited = null; // FIXME: replace null with exact value
  return comment
}

const _getComments = () => {
  return client.fetch(`
  *[_type == "comment" && !(_id in path('drafts.**'))] {
    "id": _id,
    text,
    "author" : author -> _id,
    "timestamp" : _cratedAt,
    "isFor" : isFor -> _id,
    likes,
    "replyingTo" : replyingTo -> _id
  }`)
}