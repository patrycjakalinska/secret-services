import '../../styles/styles.css'
import Typography from '@mui/material/Typography'
import { Container } from '@mui/system'

// TODO:
// * responsive Typography
const LogoSection = () => {
  return (
    <Container
      id="home"
      sx={{
        margin: '0px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { lg: '17rem', md: '14rem', sm: '9rem', xs: '5rem' },
          fontWeight: '700',
          fontFamily: 'Inter',
          paddingLeft: { lg: '5rem', md: '0rem', sm: '0rem', xs: '0rem' },
          color: '#EC6D62',
        }}
      >
        SEC
      </Typography>
      <Typography
        variant="h1"
        sx={{
          fontSize: { lg: '17rem', md: '14rem', sm: '9rem', xs: '5rem' },
          fontWeight: '700',
          fontFamily: 'Inter',
          paddingLeft: { lg: '5rem', md: '0rem', sm: '0rem', xs: '0rem' },
        }}
      >
        RET
      </Typography>
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg> */}
    </Container>
  )
}

export default LogoSection
