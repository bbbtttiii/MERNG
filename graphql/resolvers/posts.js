const Post = require('../../models/Post')

// each query needs a resolver which returns something from a query
module.exports = {
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