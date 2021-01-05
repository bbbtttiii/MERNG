const bcrypt = require('bcrypt.js')
const jwt = require('jsonwebtoken')

const { SECRET_KEY } = require('../../config')
const User = require('../../models/User')

module.exports = {
  Mutation: {
    // _: parent, result from last 'step'
    // args: typeDefs (registerInput)
    // context: 
    // info: 
    async register(
      _,
      {
        registerInput: { username, email, password, confirmPassword }
      },
      context,
      info
    ) {
      // need to validate data, user exists, hash pw/auth token
      // hashing function is async
      password = await bcrypt.hash(password, 12)
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString()
      })
      const res = await newUser.save()
      const token = jwt.sign({
        id: res.id,
        email: res.email,
        username: res.username
      }, )
    }
  }
}