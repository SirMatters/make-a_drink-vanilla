export default {
  name: 'ingredient',
  title: 'Cocktail ingredient',
  type: 'document',
  fields: [
    {
      name: 'ingredientName',
      title: 'Name of ingredient',
      type: 'string'
    },{
      name: 'image',
      title: 'Ingredient image',
      type: 'image',
      options: {hotspot: true}
    }, {
      name: 'brand',
      title: 'ingredient brand',
      type: 'string'
    }, {
      name: 'measuredIn',
      title: 'Ingredient measure',
      type: 'string',
      description: 'What is the ingredient measured in?'
    }, {
      name: 'containsAlcohol',
      title: 'Alochol contents',
      type: 'boolean',
    }, {
      name: 'alcoholContents',
      title: 'Alcohol contents',
      type: 'number',
      description: 'Enter number 0-100',
      validation: Rule => Rule.min(0).max(100)
    }
  ]
}