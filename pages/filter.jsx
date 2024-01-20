import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { allTags } from '../data/allTags'
import Head from 'next/head'
import { IoMdClose } from 'react-icons/io'
import ImageGallery from 'react-image-gallery'

const Filter = () => {
  const [checkedTags, setCheckedTags] = useState([])
  const [images, setImages] = useState([])

  // Fetch images based on checked tags
  const fetchImages = async () => {
    try {
      const imageSet = new Set() // Use a Set to store unique images
      for (const tag of checkedTags) {
        const response = await fetch(`https://res.cloudinary.com/ddaymbzcc/image/list/${tag}.json`)

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`)
        }

        const data = await response.json()
        const imagesInfo = data.resources.map((resource) => ({
          source: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${resource.public_id}.${resource.format}`,
          original: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_pad,w_1500,h_1000,b_auto/${resource.public_id}.${resource.format}`,
          thumbnail: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_pad,w_150,h_100,b_auto/${resource.public_id}.${resource.format}`,
          public_id: resource.public_id,
        }))

        // Check for duplicates before adding to the Set
        imagesInfo.forEach((image) => {
          const isDuplicate = Array.from(imageSet).some(
            (existingImage) => existingImage.public_id === image.public_id
          )
          if (!isDuplicate) {
            imageSet.add(image)
          }
        })
      }

      // Convert Set back to an array
      const uniqueImages = Array.from(imageSet)
      setImages(uniqueImages)
    } catch (error) {
      console.error('Error fetching images:', error)
    }
  }

  const [openImage, setOpenImage] = useState(null)
  const [galleryImages, setGalleryImages] = useState([])
  const carouselRef = useRef(null)
  const modalRef = useRef(null)

  const handleCheckboxChange = (tag) => {
    if (checkedTags.includes(tag)) {
      // If tag is already in the checked list, remove it
      setCheckedTags((prevTags) => prevTags.filter((checkedTag) => checkedTag !== tag))
    } else {
      // If tag is not in the checked list, add it
      setCheckedTags((prevTags) => [...prevTags, tag])
    }
  }
  // Fetch images whenever checked tags change
  useEffect(() => {
    fetchImages()
  }, [checkedTags])

  const sortedImages = images.slice().sort((a, b) => a.public_id.localeCompare(b.public_id))

  const handleImageClick = (public_id) => {
    setOpenImage(public_id)
    const startingImageIndex = sortedImages.findIndex((asset) => asset.public_id === public_id)
    setGalleryImages([
      ...sortedImages.slice(startingImageIndex),
      ...sortedImages.slice(0, startingImageIndex),
    ])
  }
  const closeModal = () => {
    setOpenImage(null)
  }

  const handleOutsideClick = (e) => {
    if (carouselRef.current && !carouselRef.current.contains(e.target)) {
      closeModal()
    }
  }

  const handleEscapeKey = (e) => {
    if (e.key === 'Escape') {
      closeModal()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEscapeKey)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [])
  return (
    <>
      <Head>
        <title>{`Photo Gallery - Filter`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        {/* Popup carousel display */}
        {openImage && (
          <>
            <div className="blur"></div>
            <div className="modal-container" ref={modalRef}>
              <div className="popup-carousel-container" ref={carouselRef}>
                <button className="close-btn" onClick={closeModal}>
                  <IoMdClose className="" />
                </button>
                <ImageGallery
                  items={galleryImages}
                  autoPlay={false}
                  showPlayButton={false}
                  slideDuration={250}
                />
              </div>
            </div>
          </>
        )}
        <div className="tag-selector">
          <h2 className="banner-title text-white">Select Tags To View</h2>
          <div className="tag-list">
            {allTags.map(({ tag, name }) => (
              <div key={tag} className="tag-checkbox">
                <input
                  type="checkbox"
                  id={tag}
                  checked={checkedTags.includes(tag)}
                  onChange={() => handleCheckboxChange(tag)}
                />
                <label htmlFor={tag}>{name}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="img-container columns-2 gap-4 sm:columns-3 xl:columns-4 2xl:columns-5">
          {sortedImages.length > 0 &&
            sortedImages.map(({ id, source, public_id }) => (
              <div key={id} onClick={() => handleImageClick(public_id)} role="button" tabIndex={0}>
                <div className="after:content after:shadow-highlight group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg">
                  <Image
                    alt=""
                    className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                    style={{ transform: 'translate3d(0, 0, 0)' }}
                    src={source}
                    width={720}
                    height={480}
                    sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
                  />
                </div>
              </div>
            ))}
        </div>
      </main>
    </>
  )
}
export default Filter
