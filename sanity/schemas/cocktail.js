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
    name: 'image',
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
    name: 'steps',
    title: 'Preparation steps',
    type: 'array',
    of: [{
      type: 'string', 
    }]
  }, {
    name: 'author',
    title: 'Cocktail author',
    type: 'reference',
    to: [{type: 'person'}]
  },
  {
    name: 'tags',
    type: 'array',
    of: [{type: 'string'}],
    options: {
      layout: 'tags'
    }
  },
  {
    name: 'ingredients',
    type: 'array',
    of: [
      {
        type: 'reference',
        to: [{type: 'ingredient'}]
      }
    ]
  }
],
}