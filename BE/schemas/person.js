export default {
  name: 'person',
  title: 'Persons',
  type: 'document',
  fields: [{
    name: 'name',
    title: 'Person Name',
    type: 'string',
    description: 'person name'
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
  }]
}