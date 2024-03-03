import React from 'react'
// import ImageGallery from 'react-image-gallery'
import cloudinary from '../utils/cloudinary.js'

const HomeCarousel = ({ images }) => {
  console.log(images)
  const data = images.map(({ public_id, format }) => ({
    original: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_pad,w_1500,h_1000,b_black/${public_id}.${format}`,
    thumbnail: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_pad,w_150,h_100,b_black/${public_id}.${format}`,
    loading: 'lazy',
  }))
  console.log(data)

  return <>
  <div>

  </div>
  </>
}


export async function getServerSideProps() {
  console.log("hi")
  try {
    const results = await cloudinary.v2.search
    .expression(`folder:${process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER}/* AND tags=favorites`)
    .sort_by('public_id', 'desc')
    .max_results(400)
    .execute()
    
    let reducedResults = []
    
    let i = 0
    for (let result of results.resources) {
      reducedResults.push({
        id: i,
        public_id: result.public_id,
        format: result.format,
      })
      i++
    }
    
    return {
      props: {
        images: reducedResults,
      },
    }
  } catch (error) {
    console.error('Error in Cloudinary operations:', error)
    return {
      props: {
        error: 'Failed to fetch images',
      },
    }
  }
}


export default HomeCarousel