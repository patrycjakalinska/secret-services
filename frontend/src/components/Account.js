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
import '../styles/styles.css'
import { styled } from '@mui/material/styles'
import cases from '../services/cases'

const Account = ({ user }) => {
  const navigate = useNavigate()

  if (Object.keys(user).length === 0) {
    navigate('/login')
    return null
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
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{ flex: 1, paddingRight:'1rem', marginRight: '1em', borderRight: '1px solid gray' }}
          >
            <Box>
              <Grid item xs={12}>
                {user.name} {user.surname}
              </Grid>
              <Grid item xs={12} sx={{ font: '' }}>
                {user.mail}
              </Grid>
            </Box>
            <Grid item xs={12} sx={{ marginY: '.5em' }}>
              Edit profile
            </Grid>
            <Grid item xs={12} sx={{ marginY: '.5rem' }}>
              Payments
            </Grid>
            <Grid item xs={12} sx={{ marginY: '.5rem' }}>
              Chats
            </Grid>
            <Grid item xs={12} sx={{ marginY: '.5rem' }}>
              My cases
            </Grid>
            <Grid
              item
              fullwidth
              xs={12}
              sx={{
                marginTop: '.5rem',
                paddingTop: '1em',
                borderTop: '1px solid black',
              }}
            >
              Logout
            </Grid>
          </Grid>
          <Box
            sx={{
              flex: 2,
            }}
          ></Box>
        </Box>
      </Box>
    </Container>
  )
}

export default Account
