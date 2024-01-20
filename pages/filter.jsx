import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { allTags } from '../data/allTags'
import Head from 'next/head'

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
          public_id: resource.public_id,
          width: resource.width,
          height: resource.height,
          format: resource.format,
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
  return (
    <>
      <Head>
        <title>{`Photo Gallery - Filter`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
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
            sortedImages.map(({ id, public_id, format }) => (
              <div
                key={id}
                onClick={() => handleImageClick(public_id, format)}
                role="button"
                tabIndex={0}>
                <div className="after:content after:shadow-highlight group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg">
                  <Image
                    alt=""
                    className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                    style={{ transform: 'translate3d(0, 0, 0)' }}
                    src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
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
