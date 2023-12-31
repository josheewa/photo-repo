import cloudinary from 'cloudinary'

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export default cloudinary

// utils/cloudinary.js

// const cloudinary = require('cloudinary').v2

// // Configure Cloudinary with your credentials
// cloudinary.v2.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// })

// // Function to fetch images based on tags
// async function getImagesByTags(tags) {
//   try {
//     const results = await cloudinary.v2.search
//       .expression(`resource_type:image AND tags=${tags.join(',')}`)
//       .sort_by('public_id', 'desc')
//       .max_results(20) // Adjust as needed
//       .execute()

//     const images = results.resources.map((image) => ({
//       public_id: image.public_id,
//       format: image.format,
//       // Add other properties as needed
//     }))

//     return images
//   } catch (error) {
//     console.error('Error fetching images from Cloudinary:', error)
//     throw error
//   }
// }

// module.exports = { getImagesByTags }

// export default cloudinary
