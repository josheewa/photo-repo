import React, { useState, useEffect } from 'react'
import ImageGallery from 'react-image-gallery'

const TagCarousel = ({ startingImagePublicId, tag, format }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const assetsData = await getAssets(startingImagePublicId, tag, format)
        setData(assetsData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [startingImagePublicId, tag, format])

  return <ImageGallery items={data} autoPlay={false} showPlayButton={false} slideDuration={250} />
}

export default TagCarousel

const getAssets = async (startingImagePublicId, tag, format) => {
  try {
    // Fetch data from the Cloudinary JSON API
    const response = await fetch(`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/list/${tag}.json`)

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`)
    }

    // Parse the JSON data from the response
    const data = await response.json()
    // Find the index of the starting image
    const startingImageIndex = data.resources.findIndex(
      (asset) => asset.public_id === startingImagePublicId
    )
    // Rotate the array so that anything in front of the first image is placed at the end
    const rotatedResources = [
      ...data.resources.slice(startingImageIndex),
      ...data.resources.slice(0, startingImageIndex),
    ]

    // Map the rotated array to the desired format
    const rotatedMediaAssets = rotatedResources.map((asset) => ({
      original: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_pad,w_1500,h_1000,b_auto/${asset.public_id}.${asset.format}`,
      thumbnail: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_pad,w_150,h_100,b_auto/${asset.public_id}.${asset.format}`,
    }))
    return rotatedMediaAssets
  } catch (error) {
    console.error('Error fetching media assets:', error)
    return []
  }
}
