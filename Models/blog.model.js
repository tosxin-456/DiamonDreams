const mongoose = require('mongoose');
const schema = mongoose.Schema
const blogSchema = new schema({
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: 'admins'
  },
  title: {
    type: String,
    required:true
  },
  images: {
    type: Array,
  },
  body: {
    type: String,
    required:true
  }
})


const blogModel = mongoose.model('blogs', blogSchema)

module.exports = blogModel