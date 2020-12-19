export default {
  name: 'prepStep',
  title: 'Cocktail preparation step',
  type: 'object',
  fields: [
    {
      name: 'stepText', 
      type: 'string', 
      title: 'Step Action'
    },
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
}