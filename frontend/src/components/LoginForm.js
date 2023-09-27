import {
  Container,
  Box,
  FormControl,
  TextField,
  Typography,
  Button,
} from '@mui/material'
import { useState } from 'react'
import '../styles/styles.css'
import signLogo from '../img/sign.png'
import { createTheme } from '@mui/system'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('login')
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: '#313131', // your primary color
      },
      secondary: {
        main: '#EC6D62', // your secondary color
      },
    },
  })

  return (
    <Container
      maxWidth="xl"
      id="home"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: {
            lg: 'space-between',
            md: 'space-between',
            sm: 'center',
            xs: 'center',
          },
          backgroundColor: '#FEFDFD',
          width: '100%',
          height:'auto',
          borderRadius: '25px',
        }}
      >
        <Box
          sx={{
            paddingY: '5em',
            paddingX: { lg: '5em', md: '3.5em', sm: '3em', xs: '2em' },
            width: { lg: '30%', md: '30%', sm: '60%', xs: '100%' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
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
              Sign in
            </Typography>
            <Box
              sx={{
                paddingY: { lg: '1em', md: '1em', sm: '.5em', xs: '.5em' },
                paddingX: { lg: '5em', md: '2em', sm: '2em', xs: '0' },
                textAlign: 'center',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontFamily: 'Raleway',
                  fontWeight: '400',
                  fontSize: {
                    lg: '20px',
                    md: '20px',
                    sm: '18px',
                    xs: '15px',
                  },
                }}
              >
                Enter your details to login to your account
              </Typography>
            </Box>
          </Box>
          <Box sx={{ flex: 1 }}>
            <form onSubmit={handleLogin}>
              <FormControl
                fullWidth
                margin="normal"
                sx={{
                  color: '#616161',
                  fontFamily: 'Raleway',
                  fontWeight: '500',
                }}
              >
                <TextField
                  placeholder="jane.doe@mail.com"
                  required
                  color="grey"
                  sx={{
                    marginBottom: '1em',
                    borderRadius: '8px',
                    border: '1px solid #E4E4E4',
                  }}
                />
                <TextField
                  placeholder="●●●●●●●●●●"
                  required
                  color='grey'
                  sx={{
                    marginBottom: '1em',
                    borderRadius: '8px',
                    border: '1px solid #E4E4E4',
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{ color: '#5A4E4ECC', fontSize: '.8rem' }}
                >
                  Don’t have account yet?{' '}
                  <strong style={{ color: '#313131' }}>Register now.</strong>
                </Typography>
              </FormControl>
              <Button
                disableElevation
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  fontWeight: '700',
                  backgroundColor: '#EC6D62',
                  marginTop: '1em',
                  fontSize: '20px',
                  textTransform: 'none',
                  borderRadius: '8px',

                  '&:hover': { backgroundColor: '#3C404A' },
                }}
              >
                Sign in
              </Button>
            </form>
          </Box>
        </Box>
        <Box
          sx={{
            display: { lg: 'flex', md: 'flex', sm: 'none', xs: 'none' },
            //padding: { lg: '2em', md: '2em', sm: '0', xs: '0' },
          }}
        >
          <img
            src={signLogo}
            alt="logo"
            style={{ maxWidth: '100%', height: 'auto', padding:0, margin:0 }}
          />
        </Box>
      </Box>
    </Container>
  )
}

export default LoginForm
