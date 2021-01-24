export default {
  name: 'vote',
  type: 'object',
  fields: [
    {
      name: 'cocktail',
      type: 'reference',
      to: [{type: 'cocktail'}]
    }, {
      name: 'score',
      type: 'number',
      validation: Rule => Rule.integer().max(5).min(0)
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