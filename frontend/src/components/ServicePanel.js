import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
} from '@mui/material'
import users from '../services/users'

const ServicePanel = ({ tier }) => {
  const handleBuy = (service) => {
    users
      .buyService(service)
      .then((updatedUser) => console.log(updatedUser))
      .catch((err) => console.log(err))
  }

  return (
    <Card
      sx={{
        minWidth: 275,
        height: { lg: '100%', md: '100%', sm: '30rem', xs: '40rem' },
        width: { md: '90%', lg: '100%' },
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyConerent: 'space-between',
        backgroundColor: tier.color,
        alignItems: 'center',
        textAlign: 'center',
        color: '#FEFDFD',
        borderRadius: '42px 0',
        boxShadow: '0px 8px 10px 5px rgba(0,0,0,0.25)',
      }}
    >
      <CardContent
        sx={{
          padding: '40px 50px 0 50px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <Typography
            variant='h4'
            sx={{
              fontFamily: 'Playfair Display',
              mb: '3rem',
              fontSize: { lg: '32px', md: '32px', sm: '42px', xs: '38px' },
            }}
          >
            {tier.title}
          </Typography>
          <Typography
            variant='body2'
            sx={{ fontSize: { md: '16px', sm: '18px', xs: '20px' } }}
          >
            {tier.description}
          </Typography>
        </div>
        <div>
          <Typography
            variant='h4'
            sx={{
              letterSpacing: '0.16px',
              fontSize: '32px',
              marginTop: { lg: '2rem', md: '1rem', sm: '0rem', xs: '0rem' },
            }}
          >
            {tier.price}
          </Typography>
          <Typography
            variant='h6'
            sx={{ fontSize: '16px', m: 0, color: 'rgba(254, 253, 253, 0.60)' }}
          >
            per hour
          </Typography>
        </div>
      </CardContent>
      <CardActions>
        <Button
          size='medium'
          variant='contained'
          onClick={() => handleBuy(tier)}
          disableElevation
          sx={{
            borderRadius: '16px',
            fontSize: '22px',
            fontWeight: 100,
            color: tier.color,
            padding: '0.7rem 2.2rem',
            textTransform: 'none',
            mb: '1.5rem',
            backgroundColor: '#FEFDFD',
            '&:hover': {
              backgroundColor: tier.buttonHover,
              color: tier.buttonText,
            },
          }}
        >
          Buy now
        </Button>
      </CardActions>
    </Card>
  )
}

export default ServicePanel
