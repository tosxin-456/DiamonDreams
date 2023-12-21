const mongoose = require('mongoose');
const schema = mongoose.Schema

const adminSchema = new schema({
  profilePic: {
    type: String,
    default:'https://www.gravatar.com/avatar/0662d90eb3d5d9764f07d6e25da3f5ca?s=200&r=pg&d=mm'
  },
  email: {
    type: String,
    required:true
  },
  password: {
    type: String,
    required:true
  },
  hint: {
    type: String,
    required:true
  },
  login: {
    type: Boolean,
    default:false
  }
})

const adminModel = mongoose.model('admin', adminSchema)
module.exports = adminModel