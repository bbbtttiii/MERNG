// import Apollo (server), GQL, and Mongoose (ORM)
const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')
const mongoose = require('mongoose')

// import Post model
const Post = require('./models/Post')

// mongodb connection string
const { MONGODB } = require('./config.js')

// type definitions: get all posts + data from database and return to user
// ! = required
const typeDefs = gql`
  type Post{
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type Query{
    getPosts: [Post]
  }
`
// each query needs a resolver which returns something from a query
const resolvers = {
  Query: {
    async getPosts() {
      try{
        const posts = await Post.find()
        return posts
      } catch(err){
        throw new Error(err)
      }
    }
  }
}

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

