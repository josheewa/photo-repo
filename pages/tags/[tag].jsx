// pages/[tag].jsx
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { fetchCloudinaryResources } from '../../utils/cloudinary'
import Image from 'next/image'
import Modal from '../../components/Modal'
import { useLastViewedPhoto } from '../../utils/useLastViewedPhoto'

const TagPage = () => {
  const router = useRouter()
  const { tag } = router.query
  const [images, setImages] = useState([])

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const results = await fetchCloudinaryResources(tag)
        let reducedResults = []

        let i = 0
        for (let result of results.resources) {
          reducedResults.push({
            id: i,
            height: result.height,
            width: result.width,
            public_id: result.public_id,
            format: result.format,
          })
          i++
        }
        setImages(reducedResults)
        console.log(reducedResults)
        // setImages(data.resources)
        // console.log(data.resources)
      } catch (error) {
        console.error('Error fetching images:', error.message)
      }
    }

    if (tag) {
      fetchImages()
    }
  }, [tag])

  const { photoId } = router.query
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto()

  const lastViewedPhotoRef = useRef(null)

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current.scrollIntoView({ block: 'center' })
      setLastViewedPhoto(null)
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto])

  return (
    <>
      <Head>
        <title>Photo Gallery</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        {photoId && (
          <Modal
            images={images}
            onClose={() => {
              setLastViewedPhoto(photoId)
            }}
          />
        )}
        <div className="img-container columns-2 gap-4 sm:columns-3 xl:columns-4 2xl:columns-5">
          {images.map(({ id, public_id, format }) => (
            <div key={id} className="relative mb-5 block w-full cursor-zoom-in">
              <Link
                key={id}
                href={`/[tag]/p/[photoId]`}
  as={`/${tag}/p/${id}`}
                ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
                shallow
                className="after:content after:shadow-highlight group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg">
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
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default TagPage
