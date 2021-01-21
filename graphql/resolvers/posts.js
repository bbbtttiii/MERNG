const { AuthenticationError, UserInputError } = require('apollo-server')

const Post = require('../../models/Post')
const checkAuth = require('../../utilities/checkAuth')

// each query needs a resolver which returns something from a query
module.exports = {

  Query: {

    async getPosts() {
      try {
        // {createdAt: -1} to sort in descending order
        const posts = await Post.find().sort({ createdAt: -1 })
        return posts
      } catch (err) {
        throw new Error(err)
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId)
        if (post) {
          return post
        } else {
          throw new Error('Post not found')
        }
      } catch (err) {
        throw new Error(err)
      }
    }
  },

  Mutation: {

    async createPost(_, { body }, context) {
      const user = checkAuth(context)
      // check if post is empty
      if (body.trim() === '' ) {
        throw new Error('Post body must not be empty')
      }
      const newPost = new Post({
        body,
        user: user.indexOf,
        username: user.username,
        createdAt: new Date().toISOString()
      })
      const post = await newPost.save()
      context.pubsub.publish('NEW_POST', {
        newPost: post
      })
      return post
    },

    async deletePost(_, { postId }, context) {
      const user = checkAuth(context)
      //need to check that post belongs to user!
      try {
        const post = await post.findById(postId)
        if (user.username == post.username) {
          await post.delete()
          return 'Post deleted successfully'
        } else {
          throw new AuthenticationError('Not allowed')
        }
      } catch (err) {
        throw new Error(err)
      }
    },

    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context)
      const post = await Post.findById(postId)
      if (post) {
        // 
        if (post.likes.find(like => like.username === username)) {
          // post already liked by user - unlike it
          post.likes = post.likes.filter((like) => like.username !== username)
        } else {
          // not liked by user - like it
          post.likes.push({
            username,
            createdAt: new Date().toISOString()
          })
        }
        await post.save()
        return post
      } else throw new UserInputError('Post not found')
    }
  },

  Subscription: {
    newPost: {
      // ?
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST')
    }
  }
}