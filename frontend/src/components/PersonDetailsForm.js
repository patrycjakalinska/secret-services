import {
  Container,
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { styled } from '@mui/material/styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import users from '../services/users'

const genders = ['woman', 'man', 'other']

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

const PersonDetailsForm = ({ user, updateUser, show }) => {
  const [name, setName] = useState(user.name)
  const [surname, setSurname] = useState(user.surname)
  const [mail, setMail] = useState(user.mail)
  const [profilePic, setProfilePic] = useState(user.profilePictureURL)
  const [number, setNumber] = useState(user.number)
  const [gender, setGender] = useState(user.gender)

  if (!show) {
    return null
  }

  const handleGenderChange = (newGender) => {
    if (genders.includes(newGender)) {
      setGender(newGender)
    } else {
      console.log('Something went wrong')
    }
  }

  const updateCurrentUser = async (event) => {
    event.preventDefault()
    try {
      const updatedUser = await user.updateUser({
        name,
        surname,
        mail,
        profilePic,
        number,
        gender,
      })

      setName(user.name)
      setSurname(user.surname)
      setMail(user.mail)
      setNumber(user.number)
      setGender(user.gender)

      updateUser(updatedUser)
    } catch (err) {
      console.log('Something went wrong.')
    }
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#FEFDFD',
        }}
      >
        <Box
          sx={{
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
              Update your <strong>profile info</strong>
            </Typography>
            <form onSubmit={updateCurrentUser}>
              <Grid container spacing={4} sx={{ marginTop: '2em' }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    onChange={({ target }) => setName(target.value)}
                    label="Name"
                    fullWidth
                    autoFocus
                    sx={{
                      marginBottom: '.5em',
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    onChange={({ target }) => setSurname(target.value)}
                    label="Surname"
                    fullWidth
                    sx={{
                      marginBottom: '.5em',
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    onChange={({ target }) => setMail(target.value)}
                    label="E-mail address"
                    fullWidth
                    sx={{
                      marginBottom: { xs: '0', md: '.5em' },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Gender
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={gender}
                      label="Gender"
                      onChange={handleGenderChange}
                    >
                      {genders.map((g) => (
                        <MenuItem value={g}>{g}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={({ target }) => setNumber(target.value)}
                    label="Phone number"
                    fullWidth
                    multiline
                    rows={3}
                    sx={{
                      marginBottom: '.5em',
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
                    Attach image
                    <VisuallyHiddenInput type="file" />
                  </Button>
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

export default PersonDetailsForm
