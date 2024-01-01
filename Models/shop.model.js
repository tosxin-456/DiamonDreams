const mongoose = require('mongoose');
const schema = mongoose.Schema
const shopSchema = new schema({
  itemName: {
    type: String,
    required:true
  },
  itemPrice: {
    type: Array,
  },
  quantity: {
    type: String,
    required:true
  }
})


const shopModel = mongoose.model('shop', shopSchema)

module.exports = shopModel