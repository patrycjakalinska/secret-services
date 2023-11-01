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
import { styled } from '@mui/material/styles'
import Backdrop from '../misc/Backdrop'

//TODO:
// * add this user info to backend but only send crucial info, and do route on specific
// information - like this payments info
const PaymentsDetailsForm = ({ user, updateUserInfo, show }) => {
  const [bankName, setBankName] = useState(user.name)
  const [bankNumber, setBankNumber] = useState(user.surname)
  const [cardNumber, setCardNumber] = useState(user.mail)
  const [cardExpDate, setCardExpDate] = useState(user.number)
  const [cvc, setCvc] = useState(user.gender)
  const [loading, setLoading] = useState(false)

  if (!show) {
    return null
  }

  const updateBillingInfo = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      const updatedBillingData = {
        bankName,
        bankNumber,
        cardNumber,
        cardExpDate,
        cvc,
      }

      setLoading(false)
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
                fontFamily: 'Playfair Display',
                fontWeight: '900',
                fontSize: { lg: '26px', md: '24px', sm: '22px', xs: '20px' },
                color: '#313131',
                textAlign: 'left',
              }}
            >
              Update your <strong>billing info</strong>
            </Typography>
            <form onSubmit={updateBillingInfo} encType="multipart/form-data">
              <Grid container spacing={4} sx={{ marginTop: '2em' }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    onChange={({ target }) => setBankName(target.value)}
                    label="Bank name"
                    fullWidth
                    autoFocus
                    sx={{
                      marginBottom: '.5em',
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    onChange={({ target }) => setBankNumber(target.value)}
                    label="Bank number"
                    fullWidth
                    sx={{
                      marginBottom: '.5em',
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    onChange={({ target }) => setCardNumber(target.value)}
                    label="Card number"
                    fullWidth
                    sx={{
                      marginBottom: { xs: '0', md: '.5em' },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    onChange={({ target }) => setCvc(target.value)}
                    label="CVC/CVV"
                    fullWidth
                    sx={{
                      marginBottom: { xs: '0', md: '.5em' },
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

export default PaymentsDetailsForm
