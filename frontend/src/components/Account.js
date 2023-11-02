import { Container, Box, Grid, Avatar, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined'
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined'
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { useState } from 'react'
import { styled } from '@mui/material/styles'
import cases from '../services/cases'
import PersonDetailsForm from './account-forms/PersonDetailsForm'
import PaymentsDetailsForm from './account-forms/PaymentsDetailsForm'

const Account = ({ user, updateUserInfo, formType = 'main' }) => {
  const navigate = useNavigate()

  if (Object.keys(user).length === 0) {
    navigate('/login')
    return null
  }
  return (
    <Container
      maxWidth="xl"
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
          paddingY: '3em',
          paddingX: '2em',
          width: '80%',
          height: '50%',
          borderRadius: '25px',
        }}
      >
        {/* <Box
          sx={{
            paddingY: '3em',
            paddingX: { lg: '5em', md: '3.5em', sm: '3em', xs: '2em' },
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
        > */}
        <Grid
          container
          spacing={2}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'space-between',
            flex: 1,
            paddingRight: '1rem',
            marginRight: '1em',
            borderRight: '1.5px solid rgba(49, 49, 49, 0.50)',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Avatar
              alt="Remy Sharp"
              src={`${user.profilePicture.url}`}
              sx={{ marginRight: '1rem', height: '4rem', width: '4rem' }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="h7"
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: '500',
                    fontSize: '18px',
                  }}
                >
                  {user.name} {user.surname}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                }}
              >
                <Typography
                  variant="h7"
                  sx={{ fontSize: '14px', color: 'rgba(49, 49, 49, 0.50)' }}
                >
                  {user.mail}
                </Typography>
              </Grid>
            </Box>
          </Box>
          <Grid item xs={12} sx={{}}>
            <Link
              to={`/user/${user.id}/info`}
              style={{
                textDecoration: 'none',
                color: '#313131',
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Box
                sx={{
                  marginRight: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <PersonOutlineOutlinedIcon fontSize="medium" />
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: '500',
                    fontSize: '16px',
                  }}
                >
                  Edit profile
                </Typography>
                <Typography
                  sx={{ fontSize: '14px', color: 'rgba(49, 49, 49, 0.50)' }}
                >
                  Change name, number, address
                </Typography>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row' }}>
            <Link
              to={`/user/${user.id}/payments`}
              style={{
                textDecoration: 'none',
                color: '#313131',
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Box
                sx={{
                  marginRight: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <PaymentsOutlinedIcon />
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: '500',
                    fontSize: '16px',
                  }}
                >
                  Payments
                </Typography>
                <Typography
                  sx={{ fontSize: '14px', color: 'rgba(49, 49, 49, 0.50)' }}
                >
                  Change billing information
                </Typography>
              </Box>
            </Link>
          </Grid>
          {/* <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box
              sx={{
                marginRight: '1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <TextsmsOutlinedIcon />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontWeight: '500',
                  fontSize: '16px',
                }}
              >
                Chats 
              </Typography>

              <Typography
                sx={{ fontSize: '14px', color: 'rgba(49, 49, 49, 0.50)' }}
              >
                View and delete chat messages
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box
              sx={{
                marginRight: '1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <BusinessCenterOutlinedIcon />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontWeight: '500',
                  fontSize: '16px',
                }}
              >
                My cases
              </Typography>
              <Typography
                sx={{ fontSize: '14px', color: 'rgba(49, 49, 49, 0.50)' }}
              >
                Modify and disable cases
              </Typography>
            </Box>
          </Grid> */}
          <Grid
            item
            fullwidth
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: '.5rem',
              paddingTop: '1em',
            }}
          >
            <Box
              sx={{
                marginRight: '1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <LogoutOutlinedIcon />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontWeight: '500',
                  fontSize: '16px',
                }}
              >
                Logout
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            flex: 2,
          }}
        >
          <PersonDetailsForm
            user={user}
            updateUserInfo={updateUserInfo}
            show={formType === 'profile'}
          />
          <PaymentsDetailsForm
            user={user}
            updateUserInfo={updateUserInfo}
            show={formType === 'payment'}
          />
        </Box>
        {/* </Box> */}
      </Box>
    </Container>
  )
}

export default Account
