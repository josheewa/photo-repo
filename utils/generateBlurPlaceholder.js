import sharp from 'sharp'

const cache = new Map()

export default async function getBase64ImageUrl(image) {
  let url = cache.get(image)
  if (url) {
    return url
  }

  const imageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_jpg,w_8,q_70/${image.public_id}.${image.format}`

  try {
    const buffer = await fetchImageBuffer(imageUrl)
    const optimizedBuffer = await optimizeImage(buffer)

    url = `data:image/jpeg;base64,${optimizedBuffer.toString('base64')}`
    cache.set(image, url)
    return url
  } catch (error) {
    console.error(error)

    // Display a user-friendly message on the page
    alert('An error occurred while loading the page. Please refresh the page and try again.')
  }
}

async function fetchImageBuffer(url) {
  const response = await fetch(url)
  const buffer = await response.arrayBuffer()
  return Buffer.from(buffer)
}

async function optimizeImage(buffer) {
  const optimizedBuffer = await sharp(buffer).jpeg().toBuffer()
  return optimizedBuffer
}
