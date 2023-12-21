const multer = require('multer')
const cloudinary = require('cloudinary').v2
const {CloudinaryStorage} = require('multer-storage-cloudinary')
const blogModel = require('../Models/blog.model')

cloudinary.config({
  cloud_name:'dba1aezsn',
  api_key:'295898651828171',
  api_secret:'QNrofias3hxbrH-Cyh-Vt7svui8'
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Blog Images",
    filename: (req, file) => {
      const uniqueName = Date.now() + '-' + file.originalname;
     return  uniqueName;
    }
  }
});


const upload = multer({storage:storage})

const uploadBlog = async (req, res,) => {
  const admin = req.admin
  try {
    upload.array('images', 4)(req, res, async (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json('An error occurred, try again');
      }
      if (!req.files || req.files.length === 0) {
        return res.status(400).json('No files uploaded');
      }
      const imageUrls = req.files.map(file => file.path);
      // Perform image upload to Cloudinary for each image
      const uploadPromises = imageUrls.map(imageUrl => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload(imageUrl, (error, result) => {
            if (error) {
              console.log('Error uploading image:', error);
              reject(error);
            } else {
              resolve(result.secure_url);
            }
          });
        });
      });
      // Wait for all image uploads to complete
      const uploadedImageUrls = await Promise.all(uploadPromises);
      
      const sender = admin._id
      const title = req.body.title
      const body = req.body.body
      const images = uploadedImageUrls
      const newBlog = new blogModel({
        sender,
        title,
        body,
        images
      })
      await newBlog.save()
      return res.status(200).json('Blog uploaded successfully');
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json('An error occurred');
  }
};


module.exports = { uploadBlog } 
