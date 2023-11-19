import {
  CardContent,
  Typography,
  Container,
  Box,
  Button,
  CardActions,
  Grid,
} from '@mui/material'
import Backdrop from '../misc/Backdrop'
import { useState, useEffect } from 'react'
import users from '../../services/users'

const exampleBills = [
  {
    title: 'Missing Person',
    amount: '220',
    isPayed: true,
  },
  {
    title: 'Detective services',
    amount: '50',
    isPayed: false,
  },
  {
    title: 'Additional fees',
    amount: '15.99',
    isPayed: false,
  },
]

const AccountBalance = ({ user, updateUserInfo, show }) => {
  const [bills, setBills] = useState(user.bought)
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState()

  useEffect(() => {
    const totalBalance = bills.reduce((acc, bill) => {
      const amountWithoutDollar = parseFloat(bill.price.replace(/\$/g, ''))
      return acc + amountWithoutDollar
    }, 0)
    setBalance(totalBalance)
  }, [bills])

  if (!show) {
    return null
  }

  const handlePay = (id) => {
    users
      .payBill(id)
      .then((newBills) => setBills(newBills.bought))
      .catch((err) => console.log(err))
  }
  return (
    <Container
      maxWidth='xl'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '28rem',
        overflowY: bills.length > 3 ? 'auto' : 'visible',
      }}
    >
      <Backdrop loading={loading} />
      <Box
        sx={{
          backgroundColor: '#FEFDFD',
          width: '100%',
        }}
      >
        <Box
          sx={{
            width: '100%',
          }}
        >
          <Typography
            variant='h3'
            sx={{
              fontFamily: 'Playfair Display',
              fontWeight: '900',
              width: '100%',
              fontSize: { lg: '26px', md: '24px', sm: '22px', xs: '20px' },
              color: '#313131',
              textAlign: 'left',
            }}
          >
            Your account balance
          </Typography>
          {bills.map((bill) => (
            <Grid
              container
              id={bill._id}
              spacing={1}
              sx={{
                border: '1px solid #31313131',
                borderRadius: '20px',
                boxShadow: '10 0 1',
                marginY: '0.5rem',
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  flex: 2,
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <Typography
                  gutterBottom
                  noWrap
                  variant='h6'
                  component='div'
                  sx={{
                    fontFamily: 'Raleway',
                    fontWeight: '500',
                    fontSize: '16px',
                  }}
                >
                  {bill.title}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Typography
                  variant='h6'
                  sx={{ fontSize: '12px', fontFamily: 'Raleway' }}
                >
                  {bill.price}
                </Typography>
                {bill.isPayed ? (
                  <Button
                    size='small'
                    disabled
                    onClick={() => console.log('payed')}
                    sx={{
                      color: '#FEFDFD',
                      backgroundColor: '#EC6D62',
                      borderRadius: '8px',
                      margin: '1rem',
                      paddingX: '1.5rem',
                      paddingY: '.5rem',
                      textTransform: 'none',
                      '&:hover': { backgroundColor: '#313131' },
                    }}
                  >
                    <Typography sx={{ fontSize: '14px' }}>Payed.</Typography>
                  </Button>
                ) : (
                  <Button
                    size='small'
                    onClick={() => handlePay(bill._id)}
                    sx={{
                      color: '#FEFDFD',
                      backgroundColor: '#EC6D62',
                      borderRadius: '8px',
                      margin: '1rem',
                      paddingX: '2.5rem',
                      paddingY: '.5rem',
                      textTransform: 'none',
                      '&:hover': { backgroundColor: '#313131' },
                    }}
                  >
                    <Typography sx={{ fontSize: '14px' }}>Pay now</Typography>
                  </Button>
                )}
              </CardActions>
            </Grid>
          ))}
          <Box
            sx={{
              marginTop: '1rem',
              borderTop: '1px solid #31313131',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            <Typography
              variant='h6'
              sx={{
                paddingRight: '1rem',
                color: '#EC6D62',
                fontFamily: 'Raleway',
                fontWeight: '400',
              }}
            >
              Your balance:{' '}
            </Typography>
            {balance !== 0 ? (
              <Typography
                variant='h6'
                sx={{
                  color: '#EC6D62',
                  fontFamily: 'Raleway',
                  fontWeight: '700',
                }}
              >
                -{balance} $
              </Typography>
            ) : (
              <Typography
                variant='h6'
                sx={{
                  color: '#EC6D62',
                  fontFamily: 'Raleway',
                  fontWeight: '700',
                }}
              >
                0
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default AccountBalance
