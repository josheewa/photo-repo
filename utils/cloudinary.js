// utils/cloudinary.js
// import fetch from 'node-fetch';

import cloudinary from 'cloudinary'

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  secure: true,
})

export default cloudinary

// export async function fetchCloudinaryResources(tag) {
//   try {
//     const response = await fetch(
//       `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/list/${tag}.json`
//     );

//     if (response.ok) {
//       const data = await response.json();
//       return data;
//     } else {
//       throw new Error(`Failed to fetch resources: ${response.statusText}`);
//     }
//   } catch (error) {
//     console.error('Error fetching resources:', error.message);
//     throw new Error('Internal Server Error');
//   }
// }



// import cloudinary from 'cloudinary'

// cloudinary.v2.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
//   api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
//   secure: true,
// })

// export default cloudinary

// utils/cloudinary.js

// const cloudinary = require('cloudinary')

// // Configure Cloudinary with your credentials
// cloudinary.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
//   api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
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
