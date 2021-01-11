const { AuthenticationError } = require('apollo-server')

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
      const newPost = new Post({
        body,
        user: user.indexOf,
        username: user.username,
        createdAt: new Date().toISOString()
      })
      const post = await newPost.save()
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
    }
  }
}