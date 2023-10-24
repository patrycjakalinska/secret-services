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
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import PortraitIcon from '@mui/icons-material/Portrait'
import Backdrop from '../misc/Backdrop'
import users from '../../services/users'
import uploads from '../../services/upload'

const genders = ['Woman', 'Man', 'Other']

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

const PersonDetailsForm = ({ user, updateUserInfo, show }) => {
  const [name, setName] = useState(user.name)
  const [surname, setSurname] = useState(user.surname)
  const [mail, setMail] = useState(user.mail)
  const [number, setNumber] = useState(user.number)
  const [gender, setGender] = useState(user.gender)
  const [fileName, setFileName] = useState('')
  const [selectedFile, setSelectedFile] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

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

  const handleImageChange = (e) => {
    setSelectedFile(e.target.files[0])
    setFileName(e.target.files[0].name)
  }

  const updateCurrentUser = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      const updatedUserData = {
        name,
        surname,
        mail,
        number,
        gender,
      }

      const userResponse = await users.updateUser(updatedUserData)
      const updatedUser = userResponse.data

      if (selectedFile) {
        const data = new FormData()
        data.append('file', selectedFile)
        const res = await uploads.uploadProfilePic(data)
        if (res) {
          updatedUser.profilePicture.url = res.profilePicture.url
          updatedUser.profilePicture.profileId = res.profilePicture.profileId
        } else {
          console.log('Error uploading pic to Cloudinary.')
        }
      }
      updateUserInfo(updatedUser)
      setLoading(false)

      setName(user.name)
      setSurname(user.surname)
      setMail(user.mail)
      setNumber(user.number)
      setGender(user.gender)
      setFileName('')
      setSelectedFile('')
      //navigate(`/user/${user.id}`)
    } catch (err) {
      console.log(err)
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
      <Backdrop loading={loading} />
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
                fontFamily: 'Inter',
                fontWeight: '300',
                fontSize: { lg: '26px', md: '24px', sm: '22px', xs: '20px' },
                color: '#313131',
                textAlign: 'left',
              }}
            >
              Update your <strong>profile info</strong>
            </Typography>
            <form onSubmit={updateCurrentUser} encType="multipart/form-data">
              <Grid container spacing={4} sx={{ marginTop: '2em' }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    onChange={({ target }) => setName(target.value)}
                    label="Name"
                    defaultValue={user.name}
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
                    defaultValue={user.surname}
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
                    defaultValue={user.mail}
                    fullWidth
                    sx={{
                      marginBottom: { xs: '0', md: '.5em' },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Gender
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={gender}
                      defaultValue={user.gender}
                      label="Gender"
                      onChange={({ target }) =>
                        handleGenderChange(target.value)
                      }
                    >
                      {genders.map((g) => (
                        <MenuItem key={g} value={g}>
                          {g}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    onChange={({ target }) => setNumber(target.value)}
                    label="Phone number"
                    defaultValue={user.number}
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
                    startIcon={<PortraitIcon />}
                  >
                    {fileName || 'Select profile picture'}
                    <VisuallyHiddenInput
                      type="file"
                      onChange={handleImageChange}
                    />
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
                    Update
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
