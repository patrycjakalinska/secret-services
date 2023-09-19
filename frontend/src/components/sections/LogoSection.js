import '../../styles.css'
import Typography from '@mui/material/Typography'
import { Container } from '@mui/system'

import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from 'styled-components'

import background from '../../img/background.jpg'

// TODO:
// * responsive Typography
const LogoSection = () => {
  let theme = createTheme()
  theme.typography.h1 = {
    fontSize: '30rem',
    '@media (min-width:600px)': {
      fontSize: '25rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '20rem',
    },
  }

  return (
    <ThemeProvider theme={theme}>
      <Container
      maxWidth='md'
        sx={{
          // backgroundImage:`url(${background})`,
          // backgroundSize: "cover",
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography variant="h1">SECRET</Typography>
      </Container>
    </ThemeProvider>
  )
}

export default LogoSection
