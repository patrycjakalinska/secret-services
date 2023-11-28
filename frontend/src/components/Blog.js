import { Typography, Container, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import blogs from '../services/blogs'
import { useParams } from 'react-router-dom'
import example from '../assets/example.jpg'

const Blog = () => {
  const [currentBlog, setCurrentBlog] = useState({})
  const [formattedDate, setFormattedDate] = useState('')
  const id = useParams().id

  useEffect(() => {
    blogs
      .getBlogById(id)
      .then((foundBlog) => {
        setCurrentBlog(foundBlog)
        const currentDate = new Date(foundBlog.date)
        const formatted = `${currentDate.getDate()} ${currentDate.toLocaleString(
          'default',
          { month: 'long' }
        )} ${currentDate.getFullYear()}`
        setFormattedDate(formatted)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <Container
      disableGutters
      maxWidth='false'
      sx={{ padding: '0', minHeight: '100vh', height: '100%' }}
    >
      <Box>
        <Box
          sx={{
            width: '100%',
            height: '20rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: currentBlog.photo ? `url(${currentBlog.photo.url})``url(${example})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            textAlign: 'left',
            padding: { xs: '2rem', md: '3.75rem' },
          }}
        >
          <Typography
            variant='h3'
            sx={{
              fontFamily: 'Playfair Display',
              textShadow: '0px 4px 2px rgba(0, 0, 0, 0.35)',
              color: currentBlog.titleColor,
            }}
          >
            {currentBlog.title}
          </Typography>
          <Typography
            variant='h6'
            sx={{
              fontFamily: 'Inter',
              fontWeight: '400',
              color: currentBlog.dateColor,
            }}
          >
            {formattedDate}
          </Typography>
        </Box>
        <Box sx={{ position: 'absolute', margin: '2rem' }}>
          <Link
            to={'/blogs'}
            sx={{
              color: '%313131',
              textTransform: 'none',
              textDecoration: 'none',
            }}
          >
            <ArrowBackIcon
              sx={{ color: '#313131', width: '32px', height: '32px' }}
            />
          </Link>
        </Box>

        <Box
          sx={{
            backgroundColor: '#FEFDFD',
            width: '100%',
            display: 'flex',
            maxWidth: { md: '750px', lg: '920px' },
            minHeight: '60vh',
            margin: '0 auto',
            padding: '3.75rem',
          }}
        >
          <Typography
            variant='body1'
            sx={{
              fontFamily: 'Inter',
              fontWeight: '400',
              textAlign: 'left',
              lineHeight: '32px',
            }}
          >
            {currentBlog.content}
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}

export default Blog
