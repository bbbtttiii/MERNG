// import Apollo (server) and Mongoose (ORM)
const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

//import typeDefs
const typeDefs = require('./graphql/typeDefs')

//import resolvers
const resolvers = require('./graphql/resolvers')

// mongodb connection string
const { MONGODB } = require('./config.js')

// set up Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers
})

// connect to db
mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB connected')
    return server.listen({ port: 5000 })
  })
  // initialize server- returns a promise, which logs the url for easy access
  .then(res=> {
    console.log(`Server running at ${res.url}`)
  })

