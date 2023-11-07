import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import blogs from '../services/blogs'
import { useParams } from 'react-router-dom'

const Blog = () => {
  const [currentBlog, setCurrentBlog] = useState({})
  const id = useParams().id

  useEffect(() => {
    blogs
      .getBlogById(id)
      .then((foundBlog) => setCurrentBlog(foundBlog))
      .catch((err) => console.log(err))
  }, [])
  console.log(currentBlog)
  return <Typography variant='h2'>{currentBlog.title}</Typography>
}

export default Blog
