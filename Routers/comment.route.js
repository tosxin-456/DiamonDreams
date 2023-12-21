const commentController = require('../Controllers/comment.controller')
const express = require('express')
const router = express.Router();

router.post('/:blog/new', commentController.postComment);

module.exports = router