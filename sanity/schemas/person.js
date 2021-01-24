export default {
  name: 'person',
  title: 'Persons',
  type: 'document',
  fields: [{
    name: 'firstName',
    title: 'Person\'s first name',
    type: 'string',
    description: 'person\'s first name'
  }, {
    name: 'lastName',
    title: 'Person\'s last name',
    type: 'string',
    description: 'person\'s last name'
  }, {
    name: 'handle',
    title: 'Handle',
    type: 'slug',
    description: 'person nickname',
    options: {
      source: 'name',
      maxLength: 50
    }
  }, {
    name: 'avatar',
    title: 'Avatar',
    type: 'image',
    options: {
      hotspot: true
    }
  }, {
    name: 'votes',
    type: 'array',
    of: [
      {
        type: 'object',
        fields: [
          {
            name: 'cocktail',
            type: 'reference',
            to: [{type: 'cocktail'}],
            validaton: Rule => Rule.required()
          }, {
            name: 'score',
            type: 'number',
            options: {list: [0,1,2,3,4,5]},
            validation: Rule => Rule.required().integer().max(5).min(0)
          }
        ],
        preview: {
          select: {
            title: 'cocktail.name',
            score: 'score'
          },
          prepare(selection) {
            const {title, score} = selection;
            return {
              title: title,
              subtitle: `Scored: ${score}`
            }
          }
        }
      }
    ],
    validation: Rule => Rule.custom(votes => {
      if (!votes) {
        return true
      }
      const duplicated = votes.filter(v => {
        const voteRef = v.cocktail._ref;
        return votes.filter(vv => vv.cocktail._ref === voteRef).length !== 1;
      })
      return duplicated.length === 0 ? true : "You can not vote twice for the same cocktail"
    })
    
  }],
  preivew: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      handle: 'handle',
    },
    prepare(selection) {
      const {firstName, lastName, handle} = selection;
      return {
        title: `${firstName} ${lastName}`,
        subtitle: handle
      }
    }
  }
}