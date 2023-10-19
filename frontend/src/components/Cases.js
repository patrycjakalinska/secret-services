import {
  Card,
  CardContent,
  CardMedia,
  Box,
  Grid,
  CardActionArea,
  CardActions,
  Button,
  Container,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'
import example from '../img/example.jpg'
import { useNavigate } from 'react-router-dom'

const Cases = ({ cases }) => {
  console.log(cases)

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
          alignItems: 'center',
          marginY: '1rem',
        }}
      >
        <Button
          disableElevation
          type="submit"
          variant="contained"
          sx={{
            fontWeight: '700',
            backgroundColor: '#EC6D62',
            marginTop: '1em',
            fontSize: '20px',
            textTransform: 'none',
            borderRadius: '18px',

            '&:hover': { backgroundColor: '#3C404A' },
          }}
        >
          <Link
            to="/newcase"
            style={{
              padding: '.5rem',
              textDecoration: 'none',
              color: '#F1F0F0',
            }}
          >
            Create new case
          </Link>
        </Button>
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
          {cases.map((c) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={c._id}
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
                  to={`/cases/${c._id}`}
                  style={{ textDecoration: 'none', color: '#313131' }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={c.photos.length > 0 ? c.photos[0].url : example}
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
                        {c.name}
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
                        {c.description}
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

export default Cases
