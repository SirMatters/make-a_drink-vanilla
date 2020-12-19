export default {
  name: 'prepStep',
  title: 'Preparation step',
  type: 'document',
  fields: [{
    name: 'stepAction',
    title: 'Step Action',
    type: 'text'
  }, {
    name: 'stepIcon',
    title: 'Step demo icon',
    type: 'image',
    options: {
      hotspot: true
    }
  }]
}