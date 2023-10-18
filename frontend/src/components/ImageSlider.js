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
      <Carousel showArrows={true} infiniteLoop={true}>
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%', // Set a fixed height for each slide
              position: 'relative',
            }}
          >
            <Zoom>
              <img
                src={image.url}
                alt={`Image ${index + 1}`}
                style={{ maxHeight: '100%', height: 'auto' }}
              />
            </Zoom>
            {image.tags.map((t) => (
              <span>{t}</span>
            ))}
            <Box
              sx={{
                position: 'absolute',
                bottom: '25px',
                left: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Button
                onClick={() => handleDelete(image._id, caseId, image.publicId)}
                sx={{
                  backgroundColor: '#FEFEFE',
                  '&:hover': {
                    backgroundColor: '#313131',
                    '& svg': {
                      color: '#FEFEFE', // Change the color of the icon on hover
                    },
                  },
                }}
              >
                <DeleteOutlineIcon sx={{ color: '#313131', '&:hover': {} }} />
              </Button>
            </Box>
          </Box>
        ))}
      </Carousel>
    </div>
  )
}

export default ImageSlider
