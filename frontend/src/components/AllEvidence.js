import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  CardActionArea,
  Button,
  Box,
  Container,
  Typography,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import AllPhotosModal from './modals/AllPhotosModal'
import { Link } from 'react-router-dom'
import cases from '../services/cases'
import example from '../../public/assets/example.jpg'

const AllEvidence = () => {
  const id = useParams().id
  const [openAllPhotos, setOpenAllPhotos] = useState(false)
  const [evidence, setEvidence] = useState([])
  const [sortedEvidence, setSortedEvidence] = useState([])
  const [newestButtonColor, setNewestButtonColor] = useState('#EC6D62')
  const [oldestButtonColor, setOldestButtonColor] = useState('#313131')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    cases
      .getEvidenceForCase(id)
      .then((foundEvidence) => {
        setEvidence(foundEvidence)
        setSortedEvidence(foundEvidence)
      })
      .catch((err) => console.log(err))
  }, [id]) // Changed dependency to only 'id'

  useEffect(() => {
    if (sortBy === 'newest') {
      const sortedObjects = [...evidence].sort(
        (objA, objB) =>
          new Date(objB.date).getTime() - new Date(objA.date).getTime()
      )
      setSortedEvidence(sortedObjects)
    } else if (sortBy === 'oldest') {
      const sortedObjects = [...evidence].sort(
        (objA, objB) =>
          new Date(objA.date).getTime() - new Date(objB.date).getTime()
      )
      setSortedEvidence(sortedObjects)
    }
  }, [sortBy, evidence])

  const handleSort = (value) => {
    setSortBy(value)

    if (value === 'newest') {
      setNewestButtonColor('#EC6D62')
      setOldestButtonColor('#313131')
    } else if (value === 'oldest') {
      setOldestButtonColor('#EC6D62')
      setNewestButtonColor('#313131')
    }
  }

  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      <AllPhotosModal
        evidence={evidence}
        open={openAllPhotos}
        setOpen={setOpenAllPhotos}
      />
      <Container
        maxWidth='lg'
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginY: '1rem',
        }}
      >
        <Link
          to={`/cases/${id}`}
          style={{ textDecoration: 'none', color: '#313131' }}
        >
          <Button
            sx={{
              textDecoration: 'none',
              textTransform: 'none',
              fontSize: '18px',
              color: '#313131',
            }}
          >
            <ArrowBackIcon />
            <Typography variant='h6'>Back to case</Typography>
          </Button>
        </Link>
        <Box
          sx={{ fontSize: '18px', display: 'flex', flexDirection: 'column' }}
        >
          <span style={{ alignSelf: 'center' }}>Sort by</span>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Button
              sx={{
                textDecoration: 'none',
                textTransform: 'none',
                color: newestButtonColor,
                fontSize: '18px',
              }}
              onClick={() => handleSort('newest')}
            >
              newest
            </Button>
            <span style={{ alignSelf: 'center' }}> | </span>
            <Button
              sx={{
                textDecoration: 'none',
                textTransform: 'none',
                color: oldestButtonColor,
                fontSize: '18px',
              }}
              onClick={() => handleSort('oldest')}
            >
              oldest
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Button
            disableElevation
            onClick={() => setOpenAllPhotos(true)}
            sx={{
              backgroundColor: 'none',
              textTransform: 'none',
              color: '#313131',
            }}
          >
            <Typography variant='h6'>All photos</Typography>
            <ArrowForwardIcon />
          </Button>
        </Box>
      </Container>
      <Container
        maxWidth='lg'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid container spacing={2}>
          {sortedEvidence.map((e) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={e._id}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Card
                sx={{
                  maxWidth: 345,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '20px',
                }}
              >
                <Link
                  to={`/cases/${id}/evidence/${e._id}`}
                  style={{ textDecoration: 'none', color: '#313131' }}
                >
                  <CardActionArea>
                    <CardMedia
                      component='img'
                      height='140'
                      image={e.photos.length > 0 ? e.photos[0].url : example}
                      alt='green iguana'
                    />
                    <CardContent
                      sx={{
                        display: 'flex',
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
                          fontFamily: 'Inter',
                          fontWeight: '400',
                        }}
                      >
                        {e.title}
                      </Typography>
                      <Typography
                        variant='body2'
                        color='text.secondary'
                        sx={{
                          fontFamily: 'Raleway',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          paddingBottom: '.5rem',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          height: '100%',
                        }}
                      >
                        {e.description}
                      </Typography>
                      <Box
                        sx={{
                          paddingTop: '.5rem',
                          borderTop: '1px solid #31313120',
                        }}
                      >
                        <Typography
                          color='#31313140'
                          sx={{ fontSize: '12px', fontFamily: 'Inter' }}
                        >
                          {e.date.split('T')[0]}
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  )
}

export default AllEvidence
