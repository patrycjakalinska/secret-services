import Map, { Marker, NavigationControl, Popup } from 'react-map-gl'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import TroubleshootIcon from '@mui/icons-material/Troubleshoot'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import 'mapbox-gl/dist/mapbox-gl.css'
import '../styles.css'
import { Typography } from '@mui/material'

const MapComponent = ({ evidence }) => {
  const [mapCenter, setMapCenter] = useState(
    evidence.length !== 0
      ? [evidence[0].geometry.longitude, evidence[0].geometry.latitude]
      : [52, 21]
  )
  const [showPopups, setShowPopups] = useState(evidence.map(() => false))

  const handleMarkerClick = (idx) => {
    const newShowPopups = Array(evidence.length).fill(false)
    newShowPopups[idx] = true
    setShowPopups(newShowPopups)
  }

  return (
    <Map
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      initialViewState={{
        longitude: mapCenter[0],
        latitude: mapCenter[1],
        zoom: 14,
      }}
      style={{ height: '100%' }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {evidence.map((e, idx) => (
        <Marker
          id={idx}
          longitude={e.geometry.longitude}
          latitude={e.geometry.latitude}
          anchor="bottom"
          onClick={() => handleMarkerClick(idx)}
        >
          <img
            id={idx}
            style={{ height: '40px', width: '40px', borderRadius: '50%' }}
            src={e.photos.length !== 0 ? e.photos[0].url : <TroubleshootIcon />}
          />

          {showPopups[idx] && (
            <Popup
              longitude={e.geometry.longitude}
              latitude={e.geometry.latitude}
              anchor="bottom"
              closeOnClick={false}
              onClose={() => handleMarkerClick(idx)}
              offset={50}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: '14px',
                  fontFamily: 'Raleway',
                  fontWeight: '700',
                }}
              >
                <Link
                  to={`/cases/${e.case}/evidence/${e._id}`}
                  style={{
                    textDecoration: 'none',
                    color: '#313131',
                    display: 'flex',
                  }}
                >
                  {e.title}
                  <ArrowForwardIcon color="#313131" fontSize="small" />
                </Link>
              </Typography>
              <Typography sx={{ fontSize: '12px', fontFamily: 'Inter' }}>
                {e.date.toString().split('T')[0]}{' '}
                <span style={{ color: '#EC6D62' }}>
                  {e.date.toString().split('T')[1]}
                </span>
              </Typography>
            </Popup>
          )}
        </Marker>
      ))}
      <NavigationControl />
    </Map>
  )
}

export default MapComponent
