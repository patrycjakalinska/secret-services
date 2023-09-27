import '../../styles/styles.css'
import { Container } from '@mui/system'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import logo from '../../img/lady.png'

const WelcomeSection = () => {
  return (
    <div>
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          flexDirection: { lg: 'row', md: 'row', sm: 'column', xs: 'column' },
          justifyContent: { lg: 'space-between', md: 'center' },
          alignItems:'center',
          height:'100vh',
          padding: '10rem',
          paddingX: { lg:'5rem', md: '4rem', xs: '1rem' },
          fontFamily: 'Inter',
        }}
      >
        <Box sx={{ display: { md: 'flex', sm: 'none', xs: 'none' } }}>
          <img src={logo} alt="logo" className="WelcomeSection__Icon" />
        </Box>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            textAlign: 'left',
            backgroundColor: '#3C404A',
            borderRadius: '100px 0 100px 0',
            color: '#F1F0F0',
            width: '85%',
            height: '30rem',
            marginLeft: { lg: '8rem', md: '5rem', sm: '2.5rem', xs: '0.8rem' },
          }}
        >
          <Container>
            <Typography
              variant="h2"
              sx={{
                fontFamily: 'Playfair Display',
                paddingRight: {lg:'2rem', md:'1.8rem', sm:'1.6rem', xs:'1rem'},
                marginBottom: {
                  lg: '1.2rem',
                  md: '1rem',
                  sm: '3rem',
                  xs: '1rem',
                },
                fontSize: {lg:'50px',md:'45px', sm:'48px', xs:'36px'}
              }}
            >
              Lorem Ipsum <span style={{ color: '#EC6D62' }}>firten</span>, si.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                paddingRight: { lg: '8rem', md: '2.5rem', sm: '2rem' },
                lineHeight: 'normal',
                letterSpacing: 'normal',
                fontSize: {lg:'18px', md:'16px', sm:'16px', xs:'14px'}
              }}
            >
              Bottom text with quick description goes here. Or anything you
              want. Description of services, of company and people.
            </Typography>
          </Container>
          <Container sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              disableElevantion
              size="large"
              sx={{
                display: 'flex',
                borderRadius: '30px',
                fontWeight: 600,
                fontSize: '18px',
                marginTop: {lg:'2rem', md:'1.8rem', sm:'1.5rem', xs:'1.2rem'},
                padding: {lg:'1rem 3rem',md:'0.5rem 2.4rem', sm:'0.6rem 1.6rem', xs:'0.5rem 1.5rem'},
                color: '#FBF3F3',
                backgroundColor: '#EC6D62',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#FBF3F3', color: '#EC6D62' },
              }}
            >
              Spy now.
            </Button>
          </Container>
        </Container>
      </Container>
    </div>
  )
}

export default WelcomeSection
