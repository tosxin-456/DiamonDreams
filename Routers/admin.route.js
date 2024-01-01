const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/admin.controller');
const authentication = require('../authorization/jwt')
const blogController = require('../Controllers/blog.controller')
const shopController = require('../Controllers/shop.controller')


router.get('/', (req, res) => {
  res.status(200).json('the server is working correctly')
})

router.post('/register', adminController.signUp)

router.post('/login', adminController.login)

router.post('/new/blog', authentication.verifyToken , blogController.uploadBlog )

router.post('/new/item', authentication.verifyToken , blogController.uploadBlog )



module.exports = router