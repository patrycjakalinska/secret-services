import {
  Container,
  Box,
  Grid,
  TextField,
  Typography,
  Button,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import signLogo from '../img/sign.png'
import login from '../services/login'
import AlertDialog from './AlertDialog'

const LoginForm = ({ setIsLogged }) => {
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [openDialog, setOpenDialog] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await login.login({ mail, password })
      window.localStorage.setItem('user-token', user.token)

      setIsLogged(true)
      setMail('')
      setPassword('')
      setError('')

      navigate('/')
    } catch (e) {
      setError('Bad credentials.')
      setOpenDialog(true)
    }
  }

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
            xs: 'center',
            md: 'space-between',
          },
          backgroundColor: '#FEFDFD',
          width: '100%',
          height: 'auto',
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
            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                marginTop: '1em',
                paddingX: { xs: '1em', md: '2em' },
                fontFamily: 'Raleway',
                fontWeight: '400',
                fontSize: {
                  xs: '15px',
                  sm: '18px',
                  md: '20px',
                },
              }}
            >
              Enter your details to login to your account
            </Typography>
            <form onSubmit={handleLogin}>
              <Grid container spacing={2} sx={{ marginTop: '2em' }}>
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    onChange={({ target }) => setMail(target.value)}
                    placeholder="jane.doe@mail.com"
                    required
                    fullWidth
                    color="grey"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    placeholder="●●●●●●●●●●"
                    type="password"
                    onChange={({ target }) => setPassword(target.value)}
                    fullWidth
                    required
                    color="grey"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#5A4E4ECC',
                      fontSize: '.8rem',
                    }}
                  >
                    Don’t have account yet?{' '}
                    <strong style={{ color: '#313131' }}>
                      <Link
                        to="/register"
                        style={{ textDecoration: 'none', color: '#313131' }}
                      >
                        Register now.
                      </Link>
                    </strong>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
              </Grid>
            </form>
            {openDialog && (
              <AlertDialog
                open={openDialog}
                close={() => setOpenDialog(false)}
              />
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: { lg: 'flex', md: 'flex', sm: 'none', xs: 'none' },
          }}
        >
          <img
            src={signLogo}
            alt="logo"
            style={{ maxWidth: '100%', height: 'auto', padding: 0, margin: 0 }}
          />
        </Box>
      </Box>
    </Container>
  )
}

export default LoginForm
