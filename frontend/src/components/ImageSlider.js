import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Zoom from 'react-medium-image-zoom'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import uploads from '../services/upload'

import 'react-medium-image-zoom/dist/styles.css'
import Backdrop from './utils/Backdrop'
import { borderRadius } from '@mui/system'

const ImageSlider = ({ images, setCurrentCase, caseId }) => {
  const [loading, setLoading] = useState(false)

  const handleDelete = async (id, caseId) => {
    setLoading(true)
    const updatedCase = await uploads.deletePhoto(id, caseId)
    setCurrentCase(updatedCase)
    setLoading(false)
  }

  return (
    <div>
      <Backdrop loading={loading} />
      <Carousel showArrows={true} infiniteLoop={true} showThumbs={false}>
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%', // Set a fixed height for each slide
              position: 'relative',
            }}
          >
            <Zoom zoomMargin={35} objectFit={'cover'}>
              <img
                src={image.url}
                alt={`Image ${index + 1}`}
                loading="lazy"
                style={{
                  maxHeight: '100%',
                }}
              />
            </Zoom>
            <Box></Box>
            <Box
              sx={{
                position: 'absolute',
                bottom: '25px',
                left: { xs: '.9rem', sm: '1.2rem', md: '1.5rem', lg: '1rem' },
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#F1F0F099',
                width: '90%',
                borderRadius: '12px',
              }}
            >
              <Button
                onClick={() => handleDelete(image._id, caseId, image.publicId)}
                sx={{
                  borderRadius: '12px',
                  backgroundColor: 'none',
                  '&:hover': {
                    backgroundColor: '#31313199',
                    '& svg': {
                      color: '#F1F0F0',
                    },
                  },
                }}
              >
                <DeleteOutlineIcon sx={{ color: '#313131', '&:hover': {} }} />
              </Button>
              <Box
                sx={{
                  marginX: '1rem',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                {image.tags.map((t, i) => (
                  <span key={i} style={{ padding: '5px' }}>
                    {t}
                  </span>
                ))}
              </Box>
            </Box>
          </Box>
        ))}
      </Carousel>
    </div>
  )
}

export default ImageSlider
