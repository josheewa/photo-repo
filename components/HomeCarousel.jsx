import React from 'react'
import ImageGallery from 'react-image-gallery'

const HomeCarousel = ({ images }) => {
  const data = images.map(({ public_id, format }) => ({
    original: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_pad,w_1500,h_1000,b_black/${public_id}.${format}`,
    thumbnail: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_pad,w_150,h_100,b_black/${public_id}.${format}`,
    loading: 'lazy',
  }))

  return (
    <ImageGallery
      items={data}
      autoPlay={true}
      showPlayButton={true}
      slideInterval={4000}
      slideDuration={250}
    />
  )
}

export default HomeCarousel
