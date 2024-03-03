import Head from 'next/head'
import React from 'react'
import Image from 'next/image'
import { allTags } from '../data/allTags.js'
import Link from 'next/link.js'
import cloudinary from '../utils/cloudinary.js'
import HomeCarousel from '../components/HomeCarousel.jsx'

const Home = ({ images }) => {
  const imgSrc = (id) => {
    return `https://res.cloudinary.com/ddaymbzcc/image/upload/c_auto,w_1000,h_400/photo-repo/${id}`
  }

  return (
    <>
      <Head>
        <title>PhotoRepo - Home</title>
      </Head>
      <main>
      {/* <div className="flex h-fit justify-center">
            <div className="carousel-container">
              <HomeCarousel className="p-2" images={images} />
            </div>
          </div> */}
        <div className="flex relative h-[50vh] bg-blue-100">
          
          <h1 className="absolute bottom-0 right-0 text-6xl text-black">LOGO</h1>
        </div>
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

export async function getServerSideProps() {
  try {
    const results = await cloudinary.v2.search
      .expression(`folder:${process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER}/* AND tags=favorites`)
      .sort_by('public_id', 'desc')
      .max_results(400)
      .execute()

    let reducedResults = []

    let i = 0
    for (let result of results.resources) {
      reducedResults.push({
        id: i,
        public_id: result.public_id,
        format: result.format,
      })
      i++
    }

    return {
      props: {
        images: reducedResults,
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

export default Home
