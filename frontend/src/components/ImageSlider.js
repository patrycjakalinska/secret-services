import React, { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const ImageSlider = ({ imageUrls }) => {
  return (
    <div>
      <Carousel showArrows={true} infiniteLoop={true}>
        {imageUrls.map((imageUrl, index) => (
          <div key={index}>
            <Zoom>
              <img
                src={imageUrl}
                alt={`Image ${index + 1}`}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </Zoom>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default ImageSlider
