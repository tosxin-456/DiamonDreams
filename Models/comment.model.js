const mongoose = require('mongoose');
const schema = mongoose.Schema
const commentSchema = new schema({
  post: {
    type: mongoose.Schema.ObjectId,
    ref:'blogs'
  },
  name: {
    type: String,
    required:true
  },
  email: {
    type: String,
    required:true
  },
  comment: {
    type: String,
    required:true
  }
})


const commentModel = mongoose.model('comments', commentSchema)

module.exports = commentModel