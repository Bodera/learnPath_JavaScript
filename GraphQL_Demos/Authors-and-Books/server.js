const express = require('express')
const expressGraphQL = require('express-graphql')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')
const app = express()

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'SimpleDemonstration',
    fields: () => ({
      message: { 
        type: GraphQLString,
        resolve: () => 'Grretings from GraphQL side!'  
      }
    })
  })
})

app.use(
  '/graphql',
  expressGraphQL({
    schema: schema,
    graphiql: true
  })
)

app.listen(8083, () => console.log('Server is up!'))
