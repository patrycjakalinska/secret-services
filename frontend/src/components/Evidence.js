import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Box, Button, Typography, Container } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import cases from '../services/cases'
import ImageSlider from './ImageSlider'
import { useState } from 'react'

const Evidence = ({ casesForUser, updateCases, user }) => {
  const { id, evidenceId } = useParams()
  const [currentCase, setCurrentCase] = useState(
    casesForUser.find((c) => c._id === id)
  )
  const [evidence, setEvidence] = useState(
    currentCase.evidence.find((e) => e._id === evidenceId)
  )
  const navigate = useNavigate()

  const handleDelete = async () => {
    await cases.deleteEvidence(id, evidenceId)

    const updatedCase = {
      ...currentCase,
      evidence: currentCase.evidence.filter((e) => e._id !== evidenceId),
    }

    const updatedCases = casesForUser.map((c) =>
      c._id === id ? updatedCase : c
    )

    updateCases(updatedCases)

    navigate(`/cases/${id}/evidence`)
  }

  return (
    <Container maxWidth="lg" sx={{ height: '100vh', overflow: 'visible' }}>
      <Link
        to={`/cases/${id}/evidence`}
        style={{ textDecoration: 'none', color: '#313131' }}
      >
        <Box
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        >
          <ArrowBackIcon color="#313131" />
          <Typography variant="h6">ALL EVIDENCE</Typography>
        </Box>
      </Link>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <Typography
            sx={{
              fontSize: { xs: '36px', md: '50px' },
              fontFamily: 'Playfair Display',
            }}
          >
            Update:
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '36px', md: '50px' },
              marginLeft: '1rem',
              fontFamily: 'Inter',
            }}
          >
            {evidence.title}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: 'center',
          }}
        >
          {user.userType === 'admin' && (
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
          Location: <strong> {evidence.location}</strong>
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
        <Box sx={{ width: '100%', height: '100$', flex: { xs: '1', lg: '2' } }}>
          <Typography variant="body2">{currentCase.description}</Typography>
        </Box>
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
        </Box>
      </Box>
    </Container>
  )
}

export default Evidence
