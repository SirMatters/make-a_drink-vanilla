import dotenv from 'dotenv'
const sanityClient = require('@sanity/client');

dotenv.config({path: '.env'});
const SANITY_TOKEN = process.env.SANITY_TOKEN;

const client = sanityClient({
  projectId: 'dbheocak',
  dataset: 'production',
  // token: SANITY_TOKEN,
  useCdn: true
})

const query = `*[_type == "cocktail"]`;
client
  .fetch(query)
  .then(cocktails => {
    console.log('All cocktails:')
    cocktails.forEach(cocktail => {
      console.log(`${JSON.stringify(cocktail)}`)
    })
  })