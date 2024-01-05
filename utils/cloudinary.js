// import cloudinary from 'cloudinary'
// import dotenv from 'dotenv';
// dotenv.config();
console.log('Initial state of CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY)

const cloudinary = require('cloudinary').v2
if (process.env.CLOUDINARY_API_KEY) {
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  })
}

export const getImagesByTags = async (tags) => {
  try {
    const tagExpression = tags.map((tag) => `tags=${tag}`).join(' OR ')
    const expression = `folder:${process.env.CLOUDINARY_FOLDER}/* AND resource_type:image AND ${tagExpression}`
    
    const result = await cloudinary.v2.search
    .expression(expression)
    .sort_by('public_id', 'desc')
    .max_results(400)
    .execute()
    
    // console.log(result.resources)
    return result.resources // Return the set of images
  } catch (error) {
    console.error('Error fetching images by tags:', error)
    throw error
  }
}

getImagesByTags(['city', 'astro'])


export default cloudinary