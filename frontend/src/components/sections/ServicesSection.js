import ReactFullpage from '@fullpage/react-fullpage'
import { useEffect, useState } from 'react'
import { Container } from '@mui/system'
import Grid from '@mui/material/Grid'
import CssBaseline from '@mui/material/CssBaseline'
import React from 'react'
import ServicePanel from '../ServicePanel'

const ServicesSection = ({ tiers }) => {
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
