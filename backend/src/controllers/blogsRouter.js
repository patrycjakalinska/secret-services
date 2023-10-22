const express = require('express')
const blogsRouter = express.Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const verifyToken = require('../utils/auth')

blogsRouter.get('/', async (req, res) => {
  const blogsForUser = await Blog.find({})
  res.status(200).json(blogsForUser)
})

blogsRouter.post('/', verifyToken, async (req, res) => {
  if (
    req.user.userId === '65250e4695ab505c44fc28e6' ||
    req.user.userId === '6525829697a74c5030300445'
  ) {
    const blog = new Blog(req.body)
    const savedBlogForUser = await blog.save()
    res.status(200).json({ savedBlogForUser })
  } else {
    res.status(403).json({ message: 'Access denied' })
  }
})

blogsRouter.get('/:id', async (req, res) => {
  const blogForUser = await Blog.findById(req.params.id)
  res.status(200).json({ blogForUser })
})

module.exports = blogsRouter
