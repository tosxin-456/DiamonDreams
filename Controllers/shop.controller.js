require('dotenv').config()

const shopModel = require('../Models/shop.model')
const shopValidator = require('../Validators/admin.validator')
const formatZodError = require('../Validators/error.message')
const jwt = require('jsonwebtoken')




const addItem = async (req, res) => {
  const result = adminValidator.registerAdmin.safeParse(req.body)
  if(!result.success){
    return res.status(401).json(formatZodError(result.error.issues))
  }
  const itemName = req.body.itemName
  const itemPrice =  req.body.itemPrice
  const quantity = req.body.quantity
    const addShopItem = new shopModel({
      itemName,
      itemPrice,
      quantity
    })
   addShopItem.save()
}