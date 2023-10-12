import {
  Container,
  Box,
  TextField,
  Typography,
  Button,
  Grid,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import signLogo from '../img/sign.png'
import users from '../services/users'

const RegisterForm = ({ setIsLogged }) => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleRegister = async (event) => {
    event.preventDefault()
    try {
      const user = await users.register({ name, surname, mail, password })
      window.localStorage.setItem('user-token', user.token)

      setIsLogged(true)

      setName('')
      setSurname('')
      setMail('')
      setPassword('')
      navigate('/')
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
            paddingY: '3em',
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
              Sign up
            </Typography>
            <form onSubmit={handleRegister}>
              <Grid container spacing={2} sx={{ marginTop: '2em' }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    onChange={({ target }) => setName(target.value)}
                    required
                    fullWidth
                    autoFocus
                    placeholder="Jane"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    onChange={({ target }) => setSurname(target.value)}
                    required
                    fullWidth
                    placeholder="Doe"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={({ target }) => setMail(target.value)}
                    required
                    fullWidth
                    placeholder="jane.doe@mail.com"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={({ target }) => setPassword(target.value)}
                    type="password"
                    required
                    fullWidth
                    placeholder="●●●●●●●●●●"
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
                    Already have an account?{' '}
                    <strong style={{ color: '#313131' }}>
                      <Link
                        to="/login"
                        style={{ textDecoration: 'none', color: '#313131' }}
                      >
                        Login in.
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

export default RegisterForm
