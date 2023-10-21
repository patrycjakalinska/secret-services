import { useParams } from 'react-router-dom'
import { useState } from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  CardActionArea,
  Box,
  Container,
  Typography,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link } from 'react-router-dom'
import example from '../img/example.jpg'

const AllEvidence = ({ casesForUser }) => {
  const id = useParams().id
  const [currentCase, setCurrentCase] = useState(
    casesForUser.find((c) => c._id === id)
  )

  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          marginY: '1rem',
        }}
      >
        <Link
          to={`/cases/${id}`}
          style={{ textDecoration: 'none', color: '#313131' }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <ArrowBackIcon />
            <Typography variant="h6">Back to case</Typography>
          </Box>
        </Link>
      </Container>
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid container spacing={2}>
          {currentCase.evidence.map((e) => (
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
                      component="img"
                      height="140"
                      image={e.photos.length > 0 ? e.photos[0].url : example}
                      alt="green iguana"
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
                        variant="h5"
                        component="div"
                        sx={{
                          fontFamily: 'Raleway',
                          fontWeight: '500',
                        }}
                      >
                        {e.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontFamily: 'Raleway',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {e.description}
                      </Typography>
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
