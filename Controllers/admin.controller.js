require('dotenv').config()

const adminModel = require('../Models/admin.model')
const adminValidator = require('../Validators/admin.validator')
const formatZodError = require('../Validators/error.message')
const cryptoHash = require('crypto')
const jwt = require('jsonwebtoken')



function hashValue(value) {
  const hash = cryptoHash.createHash("sha256");
  hash.update(value);
  return hash.digest("base64");
}
const signUp = async (req, res) => {
  const result = adminValidator.registerAdmin.safeParse(req.body)
  if(!result.success){
    return res.status(401).json(formatZodError(result.error.issues))
  }
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*;:]).{8,}$/
  const email = req.body.email;
  const password = req.body.password;
  const hint = req.body.hint;
  if (!regex.test(password)) {
   return res.status(400).json('The password must contain a capital letter, a lowercase letter, a number, a special character and should not be less than 8 characters.')
  }
    const user = await adminModel.findOne({ email: email });
    if (user) {
      res.status(409).json('a user with these details already exist')
    }
    else {
      const hashedPassword = await hashValue(password)
      const newAdmin = new adminModel({
        email,
        password:hashedPassword,
        hint
      })
      await newAdmin.save()
      res.status(200).json('new admin saved')
    }
}

const login = async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const admin = await adminModel.findOne({ email: email })
  if (!admin) {
    res.status(404).json('no user exists with these details')
  }
  const matchPassword = await hashValue(password)
  if (matchPassword === admin.password) {
    if (admin.login === false) {
      await  adminModel.updateOne({ _id: admin._id }, { login: true })
      const payload = { admin_id: admin._id, email: admin.email }
      const secretKey = process.env.JWT_TOKEN
      const token = jwt.sign(payload,secretKey)
      return res.status(200).json(token)
    }
    else {
     return res.status(200).json('logged in on another device')
    }
  }
   res.status(404).json('wrong password try again')

}
module.exports = { signUp, login }
