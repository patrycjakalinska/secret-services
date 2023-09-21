import ReactFullpage from '@fullpage/react-fullpage'
import { Container } from '@mui/system'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import CssBaseline from '@mui/material/CssBaseline'
import React from 'react'
import ServicePanel from '../ServicePanel'

const tiers = [
  {
    title: 'Service',
    price: '99$',
    description:
      'Consequat id porta nibh venenatis. Sed libero enim sed faucibus turpis. Porttitor leo a diam sollicitudin tempor id eu. Maecenas volutpat blandit aliquam etiam erat velit. Sed arcu non odio euismod lacinia at quis risus.',
    color: '#3C404A',
    buttonHover: '#EC6D62',
    buttonText: '#FEFDFD',
  },
  {
    title: 'Service',
    price: '130$',
    description:
      'Gravida quis blandit turpis cursus. Vivamus arcu felis bibendum ut. Facilisis leo vel fringilla est ullamcorper eget nulla facilisi etiam. Diam maecenas ultricies mi eget',
    color: '#3C404A',
    buttonHover: '#EC6D62',
    buttonText: '#FEFDFD',
  },
  {
    title: 'Service',
    price: '225$',
    description:
      'Consequat id porta nibh venenatis. Sed libero enim sed faucibus turpis. Porttitor leo a diam sollicitudin tempor id eu. Maecenas volutpat blandit aliquam etiam erat velit. Sed arcu non odio euismod lacinia at quis risus.',
    color: '#EC6D62',
    buttonHover: '#3C404A',
    buttonText: '#FEFDFD',
  },
]
const ServicesSection = () => {
  return (
    <div>
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
