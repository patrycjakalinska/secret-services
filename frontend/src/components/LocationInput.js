import React from 'react'
import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

const LocationInput = ({ setLocation, setGeometry, map }) => {
  useEffect(() => {
    const geocoder = new MapboxGeocoder({
      accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
      mapboxgl: mapboxgl,
    })

    document.getElementById('geocoder').appendChild(geocoder.onAdd(map))

    // Handle the result of geocoding
    geocoder.on('result', (e) => {
      const { text, geometry } = e.result
      const lng = geometry.coordinates[0]
      const lat = geometry.coordinates[1]

      setLocation(text)
      setGeometry({ longitude: lng, latitude: lat })
    })
  }, [map])

  const handleSelect = async (value) => {}

  return (
    <Box
      id="geocoder"
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}
    >
      <Typography
        sx={{
          fontFamily: 'Raleway',
          paddingLeft: '1rem',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        Location:{' '}
      </Typography>
    </Box>
  )
}

export default LocationInput
