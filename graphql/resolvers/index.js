const postsResolvers = require('./posts')
const usersResolvers = require('./users')
const comments = require('./comments')

module.exports = {
  Query: {
    ...postsResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation
  }
}