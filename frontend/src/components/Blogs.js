import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Typography,
  Container,
  Box,
  Grid,
} from '@mui/material'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import { Link } from 'react-router-dom'
import AddBlogModal from './modals/AddBlogModal'
import blog from '../services/blogs'
import example from '../../public/assets/example.jpg'
import { useEffect, useState } from 'react'

const Blogs = ({ user }) => {
  const [blogs, setBlogs] = useState([])
  const [blogAddModalOpen, setBlogAddModalOpen] = useState(false)

  useEffect(() => {
    blog
      .getAll()
      .then((foundBlogs) => setBlogs(foundBlogs))
      .catch((err) => console.log(err))
  }, [])

  return (
    <Container
      maxWidth='lg'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginY: '1rem',
      }}
    >
      <AddBlogModal
        open={blogAddModalOpen}
        setOpen={setBlogAddModalOpen}
        updateBlogs={setBlogs}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}
        >
          <Typography
            variant='h2'
            sx={{
              fontFamily: 'Playfair Display',
              fontWeight: '300',
              paddingRight: '1rem',
              paddingY: '1rem',
              borderRight: '2px solid #313131',
            }}
          >
            Blogs
          </Typography>
          <Typography
            variant='h6'
            sx={{
              fontFamily: 'Playfair Display',
              fontWeight: '300',
              paddingLeft: '1rem',
              paddingY: '1rem',
              color: 'rgba(49, 49, 49, 0.50)',
            }}
          >
            new posts every week on Thursday
          </Typography>
        </Box>
        {user.userType === 'admin' && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              onClick={() => setBlogAddModalOpen(true)}
              size='small'
              sx={{
                backgroundColor: '#3C404A',
                borderRadius: '8px',
                color: '#FEFEFE',
                paddingY: '.5rem',
                width: { xs: '5rem', sm: '10rem' },
                fontFamily: 'Inter',
                fontWeight: '700',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#EC6D62' },
              }}
            >
              Add blog post
            </Button>
          </Box>
        )}
      </Box>
      <Grid container spacing={2} sx={{ marginTop: '2rem' }}>
        {blogs.map((blog) => (
          <Grid item xs={12}>
            <Card
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderRadius: '20px',
              }}
            >
              <CardMedia
                component='img'
                height='140'
                image={blog.photo !== undefined ? blog.photo.url : example}
                sx={{ flex: 1 }}
                alt='green iguana'
              />
              <CardContent
                sx={{
                  display: 'flex',
                  flex: 2,
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <Typography
                  gutterBottom
                  noWrap
                  variant='h5'
                  component='div'
                  sx={{
                    fontFamily: 'Raleway',
                    fontWeight: '500',
                  }}
                >
                  {blog.title}
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{
                    fontFamily: 'Raleway',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {blog.content}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Box
                  sx={{
                    width: '80%',
                    paddingY: '1rem',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}
                >
                  {/* <BookmarkBorderIcon color='#313131' /> */}
                </Box>
                <Link to={`/blogs/${blog._id}`}>
                  <Button
                    size='small'
                    sx={{
                      color: '#FEFDFD',
                      backgroundColor: '#EC6D62',
                      borderRadius: '8px',
                      margin: '1rem',
                      paddingX: '2.5rem',
                      paddingY: '.5rem',
                      textTransform: 'none',
                      '&:hover': { backgroundColor: '#313131' },
                    }}
                  >
                    <Typography sx={{ fontSize: '14px' }}>Read more</Typography>
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Blogs
