import React from 'react'
import ImageGallery from 'react-image-gallery'

const MyCarousel = ({ images }) => {
  const data = images.map(({ public_id, format, width, height }) => ({
    original: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_pad,w_1500,h_1000,b_black/${public_id}.${format}`,
    thumbnail: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_pad,w_150,h_100,b_black/${public_id}.${format}`,
    originalClass: width > height ? 'landscape-image' : 'portrait-image',
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

export default MyCarousel
