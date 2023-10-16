import {
  Container,
  Box,
  TextField,
  Typography,
  Button,
  Grid,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { styled } from '@mui/material/styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Backdrop from './utils/Backdrop'
import cases from '../services/cases'
import uploads from '../services/upload'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

const CaseForm = ({ updateCases }) => {
  const [name, setName] = useState('')
  const [interest, setInterest] = useState('')
  const [location, setLocation] = useState('')
  // TODO:
  // * change location to location needed to MapBox
  const [description, setDescription] = useState('')
  const [fileName, setFileName] = useState('')
  const [selectedFiles, setSelectedFiles] = useState([])
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSelectImages = (e) => {
    const files = e.target.files
    setSelectedFiles(files)
    setFileName('Selected ' + e.target.files.length + ' photos')
  }

  const addNewCase = async (event) => {
    event.preventDefault()
    try {
      if (selectedFiles) {
        setLoading(true)
        const data = new FormData()
        data.append('caseName', name)
        for (let i = 0; i < selectedFiles.length; i++) {
          data.append('files', selectedFiles[i])
        }
        const photosDetails = await uploads.uploadCasePhotos(data)
        const newCase = await cases.addNew({
          name,
          interest,
          location,
          description,
          photos: photosDetails,
        })
        setLoading(false)

        updateCases((prevCase) => [...prevCase, newCase])
        setName('')
        setInterest('')
        setLocation('')
        setDescription('')
        setFileName('')
        setSelectedFiles('')

        navigate(`/cases/${newCase._id}`)
      }
    } catch (err) {
      console.log('Something went wrong.')
    }
  }

  return (
    <Container
      maxWidth="xl"
      id="home"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Backdrop loading={loading} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: '#FEFDFD',
          width: '80%',
          height: 'auto',
          borderRadius: '25px',
        }}
      >
        <Box
          sx={{
            paddingY: '3em',
            paddingX: { lg: '5em', md: '3.5em', sm: '3em', xs: '2em' },
            width: '100%',
          }}
        >
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontFamily: 'Playfair Display',
                fontWeight: '900',
                fontSize: { lg: '40px', md: '40px', sm: '35px', xs: '30px' },
                color: '#313131',
                textAlign: 'center',
              }}
            >
              Create new case
            </Typography>
            <form onSubmit={addNewCase}>
              <Grid container spacing={4} sx={{ marginTop: '2em' }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    onChange={({ target }) => setName(target.value)}
                    label="Case name"
                    fullWidth
                    autoFocus
                    sx={{
                      marginBottom: '.5em',
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    onChange={({ target }) => setInterest(target.value)}
                    label="Person|Company of interest"
                    fullWidth
                    sx={{
                      marginBottom: '.5em',
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    onChange={({ target }) => setLocation(target.value)}
                    label="Location"
                    fullWidth
                    sx={{
                      marginBottom: { xs: '0', md: '.5em' },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    component="label"
                    variant="contained"
                    disableElevation
                    sx={{
                      textTransform: 'none',
                      borderRadius: '8px',
                      fontWeight: '700',
                      backgroundColor: '#EC6D62',
                      fontSize: '12',
                      width: '100%',
                      height: { xs: '120%', md: '80%' },
                      '&:hover': { backgroundColor: '#3C404A' },
                    }}
                    startIcon={<CloudUploadIcon />}
                  >
                    {fileName || 'Attach images'}
                    <VisuallyHiddenInput
                      type="file"
                      multiple
                      onChange={handleSelectImages}
                    />
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={({ target }) => setDescription(target.value)}
                    label="Description"
                    fullWidth
                    multiline
                    rows={3}
                    sx={{
                      marginBottom: '.5em',
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    disableElevation
                    type="submit"
                    variant="contained"
                    sx={{
                      fontWeight: '700',
                      backgroundColor: '#EC6D62',
                      fontSize: '20px',
                      textTransform: 'none',
                      borderRadius: '8px',
                      width: '50%',
                      '&:hover': { backgroundColor: '#3C404A' },
                    }}
                  >
                    Send
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default CaseForm
