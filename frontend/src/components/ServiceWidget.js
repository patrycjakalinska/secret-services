import { Container, Grid, Card, CardContent, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import services from '../services/service'

const ServiceWidget = () => {
  const [tiers, setTiers] = useState([])

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await services.getAll()
        setTiers(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchServices()
  }, [])

  return (
    <Container>
      <Grid
        container
        spacing={2}
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        {tiers.map((tier, idx) => (
          <Grid item sx={{}}>
            <Card
              sx={{
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
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
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Raleway',
                    paddingBottom:'.5rem'
                  }}
                >
                  {tier.title}
                </Typography>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    borderTop:'1px solid #FEFDFD50',
                    paddingTop:'.5rem'
                  }}
                >
                  <Typography
                    sx={{
                      letterSpacing: '0.16px',
                      font: 'Raleway',
                      fontWeight: '800',
                    }}
                  >
                    {tier.price}{' '}
                    <span style={{ color: 'rgba(254,253,253,0.6' }}> /h</span>
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default ServiceWidget
