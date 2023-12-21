require('dotenv').config();
const adminModel = require('../Models/admin.model')
const jwt =  require('jsonwebtoken')

const verifyToken  = async (req, res, next) => {
  let token 
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ){
    try {
      token =  req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_TOKEN)
      req.admin = await adminModel.findById(decoded.admin_id)
        next();
    } catch (error) {
      console.error(error)
    res.status(401)
    throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
  return res.status(401).json( "You are not authorized");
}
};

const verifyAdmin = (req,res,next)=>{
if(req.admin && req.admin.role==='admin'){
  
  next()
}else{
  res.status(401).json('Only authorized admins can access the route')
}
}


module.exports = { verifyToken, verifyAdmin }