
export default {
  name: 'cocktail',
  title: 'Cocktails',
  type: 'document',
  fields: [{
    name: 'name',
    title: 'Cocktail name',
    type: 'string',
    description: 'Name of the cocktail'
  }, 
  {
    name: 'mainImage',
    title: 'Cocktail main image',
    type: 'image',
    options: {
      hotspot: true
    }
  },
  {
    name: 'description',
    title: 'Cocktail description',
    type: 'text',
  }, {
    name: 'prepSteps',
    title: 'Preparation steps',
    type: 'array',
    of: [{
      name:'prepStep', 
      type: 'object', 
      fields: [
        {
          name: 'stepText', 
          type: 'string', 
          title: 'Step Action'},
        {
          name: 'stepImage', 
          type: 'image', 
          title: 'Step demo image', 
          options: {hotspot: true}
        }, {
          name: 'stepIngredient',
          type: 'reference',
          to: [{type: 'ingredient'}]
        }
      ]
      //TODO: provide custom select
    }]
  }, {
    name: 'author',
    title: 'Cocktail author',
    type: 'reference',
    to: [{type: 'person'}]
  }],
}