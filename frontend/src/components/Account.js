import { Container, Box, Grid, Avatar, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined'
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined'
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'

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
          paddingY: '3em',
          paddingX: '2em',
          width: '80%',
          height: 'auto',
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
              src="/static/images/avatar/2.jpg"
              sx={{ marginRight: '1rem', height: '4rem', width: '4rem' }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Grid item xs={12} sx={{display:'flex', flexDirection:'column', justifyContent:'center'} }>
                <Typography
                  variant="h7"
                  sx={{ fontFamily: 'Inter', fontWeight: '500' }}
                >
                  {user.name} {user.surname}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{display:'flex', flexDirection:'column', justifyContent:'flex-start'} }>
                <Typography
                  variant="h7"
                  sx={{ fontSize: '14px', color: 'rgba(49, 49, 49, 0.50)' }}
                >
                  {user.mail}
                </Typography>
              </Grid>
            </Box>
          </Box>
          <Grid
            item
            xs={12}
            sx={{ display: 'flex', flexDirection: 'row', marginY: '.5em' }}
          >
            <Box sx={{ marginRight: '1rem' }}>
              <PersonOutlineOutlinedIcon />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontWeight: '500',
                  fontSize: '12px',
                }}
              >
                Edit profile
              </Typography>
              <Typography
                sx={{ fontSize: '12px', color: 'rgba(49, 49, 49, 0.50)' }}
              >
                Change name, number, address
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: 'flex', flexDirection: 'row', marginY: '.5em' }}
          >
            <Box sx={{ marginRight: '1rem' }}>
              <PaymentsOutlinedIcon />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontWeight: '500',
                  fontSize: '12px',
                }}
              >
                Payments
              </Typography>
              <Typography
                sx={{ fontSize: '10px', color: 'rgba(49, 49, 49, 0.50)' }}
              >
                Change billing information
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: 'flex', flexDirection: 'row', marginY: '.5em' }}
          >
            <Box sx={{ marginRight: '1rem' }}>
              <TextsmsOutlinedIcon />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontWeight: '500',
                  fontSize: '12px',
                }}
              >
                Chats
              </Typography>

              <Typography
                sx={{ fontSize: '10px', color: 'rgba(49, 49, 49, 0.50)' }}
              >
                View and delete chat messages
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: 'flex', flexDirection: 'row', marginY: '.5em' }}
          >
            <Box sx={{ marginRight: '1rem' }}>
              <BusinessCenterOutlinedIcon />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontWeight: '500',
                  fontSize: '12px',
                }}
              >
                My cases
              </Typography>
              <Typography
                sx={{ fontSize: '10px', color: 'rgba(49, 49, 49, 0.50)' }}
              >
                Modify and disable cases
              </Typography>
            </Box>
          </Grid>
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
            <Box sx={{ marginRight: '1rem' }}>
              <LogoutOutlinedIcon />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontWeight: '500',
                  fontSize: '12px',
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
        ></Box>
        {/* </Box> */}
      </Box>
    </Container>
  )
}

export default Account
