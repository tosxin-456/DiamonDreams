const mongoose = require('mongoose')
const schema = mongoose.Schema

const likeSchema = new schema({
  like:{
   type: mongoose.Schema.ObjectId,
    ref: 'blogs',
    user: {
      type: mongoose.Schema.ObjectId,
      ref:'users'
   }
  }
})