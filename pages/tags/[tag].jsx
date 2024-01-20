import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import cloudinary from '../../utils/cloudinary'
import { IoMdClose } from 'react-icons/io'
import TagCarousel from '../../components/TagCarousel'
import { allTags } from '../../data/allTags'
import Link from 'next/link'

const Home = ({ images, tag }) => {
  const [openImage, setOpenImage] = useState(null)
  const [openImageFormat, setOpenImageFormat] = useState(null)
  const carouselRef = useRef(null)
  const modalRef = useRef(null)

  const handleImageClick = (public_id, format) => {
    setOpenImage(public_id)
    setOpenImageFormat(format)
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
        <title>{`Photo Gallery - ${tag}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        <div className="tag-banner bg-gray-600">
          <h2 className="banner-title text-white">Explore Other Tags</h2>
          <div className="tag-list">
            {allTags.map(({ tag, name }) => (
              <Link className="tag-links" href={`/tags/${tag}`}>
                <p>{name}</p>
              </Link>
            ))}
          </div>
        </div>
        {/* Popup carousel display */}
        {openImage && (
          <>
            <div className="blur"></div>
            <div className="modal-container" ref={modalRef}>
              <div className="popup-carousel-container" ref={carouselRef}>
                <button className="close-btn" onClick={closeModal}>
                  <IoMdClose className="" />
                </button>
                <TagCarousel startingImagePublicId={openImage} tag={tag} format={openImageFormat} />
              </div>
            </div>
          </>
        )}
        {images.length === 0 && (
          <>
            <div className="no-images-msg">
              <span>No images associated with tag: </span>
              <span className="tag">{`${tag}`}</span>
            </div>
          </>
        )}
        <div className="img-container columns-2 gap-4 sm:columns-3 xl:columns-4 2xl:columns-5">
          {images.length > 0 &&
            images.map(({ id, public_id, format }) => (
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

export default Home

export async function getServerSideProps({ query }) {
  try {
    const { tag } = query

    // Gets all images when "all" is specified
    const tags = `${tag === 'all' ? '' : ` AND tags=${tag}`}`
    const results = await cloudinary.v2.search
      .expression(`folder:${process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER}/*${tags}`)
      .sort_by('public_id', 'desc')
      .max_results(400)
      .execute()
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

    return {
      props: {
        images: reducedResults,
        tag,
      },
    }
  } catch (error) {
    console.error('Error in Cloudinary operations:', error)
    return {
      props: {
        error: 'Failed to fetch images',
      },
    }
  }
}
