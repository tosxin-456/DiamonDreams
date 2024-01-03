require('dotenv').config()
const commentModel = require('../Models/comment.model');
const blogModel = require('../Models/blog.model')
const password = process.env.SECRET_OPENAI
const OpenAIAPI   = require('openai');


const postComment = async(req, res) => {
  const name = req.body.name
  const email = req.body.email
  const comment = req.body.comment
  const blog_id = req.params.blog
  const blogComment = await blogModel.findOne({ _id: blog_id })
  const regex = /\b(?:Fuck you|mad|foolish|liar|thief|fool|stupid|bad|don't care|werey|stupid|crazy|bitch|ass|pussy|dick|lies|swear|nigger|nigga|asshole|ass|bum bum|shut up|get out|nigger|nyash|fuck|arse|ass|Bitchass)\b/i;

  if (!blogComment) {
    res.status(404).json('no blog with this details exists')
  }
  // const response = await openai.chat.completions.create({
  //   model: 'gpt-3.5-turbo',
  //   messages: [
  //     { role: 'system', content: 'Is the following comment offensive?' },
  //     { role: 'user', content: `${comment}  yes or no` }
  //   ],
  //   max_tokens: 300
  // });
  // const generatedText = response.data.choices[0].text.toLowerCase();
  if (regex.test(comment)) {
    res.status(200).json('The comment is offensive.');
  } else {
    const newComment = new commentModel({
      post:blog_id,
      name,
      email,
      comment
    })
    await newComment.save()
    res.status(200).json('comment posted')
  }

}



module.exports = {postComment}