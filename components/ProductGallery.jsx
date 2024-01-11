import React, { useEffect } from 'react'

const ProductGallery = ({ startingImagePublicId, tag }) => {
  useEffect(() => {
    const initializeGallery = async () => {
      // Initialize the Product Gallery widget
      const myGallery = cloudinary.galleryWidget({
        container: '#my-gallery',
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        mediaAssets: await getMediaAssets(startingImagePublicId, tag),
        carouselStyle: 'thumbnails',
        carouselLocation: 'bottom',
        thumbnailProps: { width: 40, height: 40, spacing: 0 },
        aspectRatio: '3:2',
        initialIndex: 0,
      })

      myGallery.render()

      // Make sure to destroy the widget when the component is unmounted
      return () => myGallery.destroy()
    }

    initializeGallery()
  }, [startingImagePublicId])

  // Function to get filtered media assets based on startingImagePublicId and tag
  const getMediaAssets = async (startingImagePublicId, tag) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

    try {
      // Fetch data from the Cloudinary JSON API
      const response = await fetch(`https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`)

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`)
      }

      // Parse the JSON data from the response
      const data = await response.json()

      // Exclude the starting image
      const otherMediaAssets = data.resources
        .filter((asset) => asset.public_id !== startingImagePublicId)
        .map((asset) => ({ publicId: asset.public_id }))

      const startingImage = { publicId: startingImagePublicId }
      const mediaAssets = [startingImage, ...otherMediaAssets]

      return mediaAssets
    } catch (error) {
      console.error('Error fetching media assets:', error)
      return []
    }
  }

  return (
    <div className="gallery-container">
      <div id="my-gallery" className="z-50" style={{ backgroundColor: 'black' }}></div>
    </div>
  )
}

export default ProductGallery
