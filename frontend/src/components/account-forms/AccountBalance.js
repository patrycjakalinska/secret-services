import { CardContent, Typography } from '@mui/material'
import { useState } from 'react'

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

const AccountBalance = () => {
  const [bills, setBills] = useState(exampleBills)
  // TODO: sum bills balance (even minus)
  // const [balance, setBalance] = useState()

  const handlePay = (id) => {
    users
      .payBill(id)
      .then((newBills) => setBills(newBills))
      .catch((err) => console.log(err))
  }
  return (
    <Container
      maxWidth='xl'
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
          <Typography
            variant='h3'
            sx={{
              fontFamily: 'Playfair Display',
              fontWeight: '900',
              fontSize: { lg: '26px', md: '24px', sm: '22px', xs: '20px' },
              color: '#313131',
              textAlign: 'left',
            }}
          >
            Your account balance
          </Typography>
          {bills.map((bill) => (
            <Grid container spacing={2} sx={{ marginTop: '2rem' }}>
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
                  variant='h5'
                  component='div'
                  sx={{
                    fontFamily: 'Raleway',
                    fontWeight: '500',
                  }}
                >
                  {bill.title}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant='h6' sx={{ fontFamily: 'Raleway' }}>
                  {bill.amount}
                </Typography>
                {bill.isPayed ? (
                  <Button
                    size='small'
                    disabled
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
                    <Typography sx={{ fontSize: '14px' }}>Payed.</Typography>
                  </Button>
                ) : (
                  <Button
                    size='small'
                    onClick={handlePay}
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
        </Box>
      </Box>
    </Container>
  )
}

export default AccountBalance
