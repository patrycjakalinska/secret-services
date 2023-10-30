import ReactFullpage from '@fullpage/react-fullpage'
import { Container } from '@mui/system'
import Grid from '@mui/material/Grid'
import CssBaseline from '@mui/material/CssBaseline'
import React from 'react'
import ServicePanel from '../ServicePanel'

const tiers = [
  {
    title: 'Surveillance',
    price: '99$',
    description:
      "Our 'Surveillance' service provides discreet and professional monitoring, offering tailored solutions to meet your specific needs. Our expert team uses advanced technology to deliver comprehensive reports and crucial information, ensuring your peace of mind. Whether it's for business, personal, or legal purposes, trust us to secure your interests.",
    color: '#3C404A',
    buttonHover: '#EC6D62',
    buttonText: '#FEFDFD',
  },
  {
    title: 'Background check',
    price: '130$',
    description:
      'Our "Background Check" service offers comprehensive investigations for individuals and entities, providing crucial information for informed decision-making in personal, professional, or partnership matters. Trust us to reveal the facts you need.',
    color: '#3C404A',
    buttonHover: '#EC6D62',
    buttonText: '#FEFDFD',
  },
  {
    title: 'Missing person',
    price: '225$',
    description:
      'Our "Missing Person" service is dedicated to locating and reuniting individuals with their loved ones. With our experienced team and extensive resources, we are committed to resolving cases with care and professionalism, offering hope and closure to those searching for answers. ',
    color: '#EC6D62',
    buttonHover: '#3C404A',
    buttonText: '#FEFDFD',
  },
]
const ServicesSection = () => {
  return (
    <div id="services">
      <Container
        sx={{
          display: 'flex',
          fontFamily: 'Inter',
          flexDirection: { lg: 'row', md: 'row' },
          justifyContent: { lg: 'space-between', md: 'center', sm: 'center' },
          alignItems: 'center',
          paddingX: { lg: '3rem', md: '3rem', xs: '1rem' },
          height: '100vh',
        }}
      >
        <CssBaseline />
        <Grid
          container
          spacing={{ lg: 5, md: 1 }}
          sx={{ display: { lg: 'flex', md: 'flex', sm: 'none', xs: 'none' } }}
        >
          {tiers.map((tier, index) => (
            <Grid item xs={12} md={4} key={index}>
              <ServicePanel tier={tier} />
            </Grid>
          ))}
        </Grid>
        <Container sx={{ display: { lg: 'none', md: 'none' } }}>
          <ReactFullpage.Wrapper>
            {tiers.map((tier, idx) => (
              <div key={idx} className="slide">
                <Container>
                  <ServicePanel tier={tier} />
                </Container>
              </div>
            ))}
          </ReactFullpage.Wrapper>
        </Container>
      </Container>
    </div>
  )
}

export default ServicesSection
