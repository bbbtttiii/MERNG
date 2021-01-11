// import Apollo (server), PubSub (publish/subscribe pattern), and Mongoose (ORM)
const { ApolloServer, PubSub } = require('apollo-server')
const mongoose = require('mongoose')

// import typeDefs and resolvers
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

// import mongodb connection string
const { MONGODB } = require('./config.js')

// define PubSub
const pubsub = new PubSub()

// define Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => { req, pubsub }
})

// connect to db
mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected')
    return server.listen({ port: 5000 })
  })
  // initialize server: returns a promise, which logs the url for easy access
  .then(res=> {
    console.log(`Server running at ${res.url}`)
  })

