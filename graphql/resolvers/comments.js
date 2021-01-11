//imports must be in alphabetical order
const { AuthenticationError, UserInputError } = require('apollo-server')

const checkAuth = require('../../utilities/checkAuth')
const Post = require('../../models/Post')

module.exports = {
  Mutation: {
    async createComment(_, { postId, body }, context) {
      const { username } = checkAuth(context)
      if (body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment cannot be empty'
          }
        })
      }
      const post = await Post.findById(postId)
      if (post) {
        // unshift: adds newest comment first
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString()
        })
        await post.save()
        return post
      } else throw new UserInputError('Post not found')
    },
    
    async deleteComment(_, { postId, commentId }, context) {
      const { username } = checkAuth(context)
      const post = await Post.findById
      if (post) {
        const commentIndex = post.comments.findIndex(c => c.id === commentId)
        // check if user owns comment
        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1)
          await post.save()
          return post
        } else {
          // if user doesn't own comment
          throw new AuthenticationError('Not allowed')
        }
      } else {
        throw new UserInputError('Post not found')
      }
    }
  }
}