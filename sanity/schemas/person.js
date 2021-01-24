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
    of: [{type: 'vote',}]
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