import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Box, Button, Typography, Container } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import cases from '../services/cases'
import ImageSlider from './ImageSlider'

const Case = ({ casesForUser, updateCases }) => {
  const id = useParams().id
  const navigate = useNavigate()

  const currentCase = casesForUser.find((c) => c._id === id)

  const handleDelete = async () => {
    const deletedCase = await cases.deleteCase(id)
    const updatedCases = casesForUser.filter((c) => c._id !== id)
    updateCases(updatedCases)
    navigate('/cases')
  }

  // TODO:
  // * better loading screen
  if (!currentCase) {
    return <div>Loading...</div>
  }

  return (
    <Container maxWidth="lg" sx={{ height: '100vh', overflow: 'visible' }}>
      <Link to={'/cases'} style={{ textDecoration: 'none', color: '#313131' }}>
        <Box
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        >
          <ArrowBackIcon />
          <Typography variant="h6">ALL</Typography>
        </Box>
      </Link>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: '2rem',
        }}
      >
        <Typography variant="h2">TU BEDZIE MAPA</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: '36px', md: '50px' },
            fontFamily: 'Playfair Display',
          }}
        >
          {currentCase.name}
        </Typography>
        <Button
          onClick={handleDelete}
          size="small"
          sx={{
            backgroundColor: '#3C404A',
            borderRadius: '8px',
            color: '#FEFEFE',
            paddingX: '2rem',
            paddingY: '.5rem',
            height: '100%',
            fontFamily: 'Inter',
            fontWeight: '700',
            textTransform: 'none',
            '&:hover': { backgroundColor: '#EC6D62' },
          }}
        >
          Delete
        </Button>
      </Box>
      <Box sx={{ borderTop: '1px solid #313131', paddingTop: '1rem' }}>
        <Typography variant="h5" sx={{ fontFamily: 'Raleway' }}>
          Person | Company of interest:<strong> {currentCase.interest}</strong>
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'center',
          marginTop: '2rem',
        }}
      >
        <Box
          sx={{
            width: '50%',
            flex: '1',
            marginRight: '2rem',
          }}
        >
          <ImageSlider imageUrls={currentCase.photos.map((p) => p.url)} />
        </Box>
        <Box sx={{ width: '100%', height: '100$', flex: { xs: '1', lg: '2' } }}>
          <Typography variant="body2">{currentCase.description}</Typography>
        </Box>
      </Box>
    </Container>
  )
}

export default Case
