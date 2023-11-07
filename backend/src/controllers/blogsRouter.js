const express = require('express')
const blogsRouter = express.Router()
const Blog = require('../models/blog')
const cloudinaryConfig = require('../utils/cloudinary')
const User = require('../models/user')
const verifyToken = require('../utils/auth')

blogsRouter.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({})
    res.status(200).json(blogs)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' })
  }
})

blogsRouter.post(
  '/',
  cloudinaryConfig.upload.single('file'),
  verifyToken,
  async (req, res) => {
    const { file } = req
    try {
      const newBlog = new Blog({
        title: req.body.title,
        content: req.body.content,
        photo: {
          url: '',
          publicId: '',
        },
      })

      if (!file) {
        return res.status(400).json({ error: 'No image file provided.' })
      }

      const encoded = file.buffer.toString('base64')
      const imageDetails = await cloudinaryConfig.handleUpload(encoded, 'blogs')

      if (imageDetails) {
        console.log(imageDetails)
        console.log(newBlog)
        newBlog.photo.url = imageDetails.secure_url
        console.log(newBlog.photo)
        newBlog.photo.publicId = imageDetails.public_id
        console.log(newBlog)
      }

      const savedBlog = await newBlog.save()
      console.log(savedBlog)
      return res.status(201).json(savedBlog)
    } catch (err) {
      res.status(500).json({ error: 'Internal server error.' })
    }
  }
)

blogsRouter.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    res.status(200).json(blog)
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error.' })
  }
})

module.exports = blogsRouter
