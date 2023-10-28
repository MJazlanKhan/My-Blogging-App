import express from "express";
import AuthController from "../controller/authController.js"
import path, { dirname } from "path";
import { fileURLToPath } from 'url';
import BlogPost from '../models/blogPostModel.js'
import mongoose from "mongoose";
import multer from "multer"
import authModel from "../models/authModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router();

const imageSchema = new mongoose.Schema({
  url: String,
});

const Image = mongoose.model('Image', imageSchema);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });


router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const imageURL = `/uploads/${req.file.filename}`;
    const newImage = new Image({ url: imageURL });
    await newImage.save();
    res.json({ url: imageURL });
  } catch (error) {
    console.error('Image upload failed:', error);
    res.status(500).json({ error: 'Image upload failed' });
  }
});



// All Routes

router.post('/user/register', AuthController.userRegisteration)
router.post('/user/Login', AuthController.userLogin)
router.post('/user/Reset', AuthController.userReset)
router.post('/post', AuthController.createBlogPost)
router.get('/posts', AuthController.allPost)
router.get('/posts/:postId', AuthController.singlePost)
router.put('/posts/:postId', AuthController.updatePost)
router.delete('/posts/:postId', AuthController.deletePost)







export default router;
