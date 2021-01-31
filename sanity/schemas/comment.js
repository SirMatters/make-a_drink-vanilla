export default {
  type: "document",
  name: "comment",
  title: "Comment",
  fields: [
    {
      name: "author",
      type: "reference",
      to: [{type: "person"}],
    }, {
      name: "text",
      type: "text",
    }, {
      name: "isFor",
      type: "reference",
      to: [{type: 'cocktail'}]
    }, {
      name: 'likes',
      type: 'array',
      of: [{
          name: 'person',
          type: 'reference',
          to: [{type: 'person'}]
      }]
    }, {
      name: 'replyingTo',
      type: 'reference',
      to: [{type: 'comment'}],
    }
  ],
  preview: {
    select: {
      firstName: "author.firstName",
      lastName: "author.lastName",
      text: "text",
      media: "author.avatar"
    },
    prepare(selection) {
      const {firstName, lastName, text, media} = selection;
      return {
        title: `${firstName} ${lastName}`,
        subtitle: text,
        media: media
      }
    }
  } 
}