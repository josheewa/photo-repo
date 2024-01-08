import React, { useState, useEffect } from 'react';
import { Image } from 'cloudinary-react';


const Carousel = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {

        const response = await fetch(
          `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/list?tag=city,astro`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch images: ${response.statusText}`);
        }
        console.log('here')
        const data = await response.json();
    
        // Extract image URLs from the Cloudinary API response
        const imageArray = data.resources.map((image) => ({
          public_id: image.public_id,
          url: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${image.public_id}`,
        }));
    
        setImages(imageArray);
      } catch (error) {
        console.error('Error fetching images:', error.message);
      } finally {
        setLoading(false); // Set loading to false whether fetching was successful or not
      }
    };
    

    fetchImages();
  }, []); // Run this effect only once when the component mounts

  if (loading) {
    return <p>Loading...</p>; // Show a loading indicator or message while fetching images
  }

  return (
    <div className="container">
      {images.map((image) => (
        <Image
          key={image.public_id}
          cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
          publicId={image.public_id}
          width="300"
          height="200"
          crop="fill"
        />
      ))}
    </div>
  );
};

export default Carousel;
