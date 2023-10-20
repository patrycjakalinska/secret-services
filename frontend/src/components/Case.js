import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Box, Button, Typography, Container } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import cases from '../services/cases'
import ImageSlider from './ImageSlider'
import ImageUploadModal from './ImageUploadModal'
import UpdateModal from './UpdateModal'
import { useState } from 'react'

const Case = ({ casesForUser, updateCases, user }) => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [updateModalOpen, setUpdateModalOpen] = useState(false)
  const id = useParams().id
  const [currentCase, setCurrentCase] = useState(
    casesForUser.find((c) => c._id === id)
  )
  const navigate = useNavigate()

  const handleDelete = async () => {
    await cases.deleteCase(id)
    const updatedCases = casesForUser.filter((c) => c._id !== id)
    updateCases(updatedCases)
    navigate('/cases')
  }

  return (
    <Container maxWidth="lg" sx={{ height: '100vh', overflow: 'visible' }}>
      <ImageUploadModal
        caseToUpdate={currentCase}
        open={uploadModalOpen}
        setOpen={setUploadModalOpen}
        updateCaseInfo={setCurrentCase}
      />
      <UpdateModal
        open={updateModalOpen}
        setOpen={setUpdateModalOpen}
        updateCaseInfo={setCurrentCase}
      />
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: 'center',
          }}
        >
          <Button
            onClick={handleDelete}
            size="small"
            sx={{
              backgroundColor: '#3C404A',
              borderRadius: '8px',
              color: '#FEFEFE',
              paddingX: '2rem',
              paddingY: '.5rem',
              marginX: '1rem',
              height: '100%',
              fontFamily: 'Inter',
              fontWeight: '700',
              textTransform: 'none',
              '&:hover': { backgroundColor: '#EC6D62' },
            }}
          >
            Delete
          </Button>
          {user.userType === 'admin' && (
            <Button
              onClick={() => setUpdateModalOpen(true)}
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
              Add update
            </Button>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          borderTop: '1px solid #313131',
          paddingTop: '1rem',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h5" sx={{ fontFamily: 'Raleway' }}>
          Person | Company of interest:<strong> {currentCase.interest}</strong>
        </Typography>
        <Link
          to={`/cases/${id}/evidence`}
          style={{
            textDecoration: 'none',
            color: '#313131',
            display: 'flex',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              marginX: '1rem',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6">All evidence</Typography>
          </Box>
        </Link>
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
          <ImageSlider
            images={currentCase.photos}
            setCurrentCase={setCurrentCase}
            caseId={currentCase._id}
          />
          <Button
            variant="contained"
            disableElevation
            onClick={() => setUploadModalOpen(true)}
            sx={{
              textTransform: 'none',
              borderRadius: '8px',
              fontWeight: '700',
              backgroundColor: '#EC6D62',
              fontSize: '12',
              width: '100%',
              marginY: '1rem',
              '&:hover': { backgroundColor: '#3C404A' },
            }}
          >
            Add photos
          </Button>
        </Box>
        <Box sx={{ width: '100%', height: '100$', flex: { xs: '1', lg: '2' } }}>
          <Typography variant="body2">{currentCase.description}</Typography>
        </Box>
      </Box>
    </Container>
  )
}

export default Case
