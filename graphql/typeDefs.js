const { gql } = require('apollo-server')

// type definitions: get all posts + data from database and return to user
// ! = required
module.exports = gql`
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