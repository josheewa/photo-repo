import Head from 'next/head'
import React from 'react'
import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { allTags } from '../data/allTags.js'
import Link from 'next/link.js'
import HomeCarousel from '../components/HomeCarousel.jsx'

const Home = () => {
  const longwoodImage =
    'https://res.cloudinary.com/ddaymbzcc/image/upload/v1705612684/photo-repo/DSC_0152_zyedw1.jpg'
  const springlakeImage =
    'https://res.cloudinary.com/ddaymbzcc/image/upload/v1705613237/photo-repo/DSC_1175_cofogc.jpg'

  const [images, setImages] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://res.cloudinary.com/ddaymbzcc/image/list/favorites.json'
        )

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const result = await response.json()
        const { resources } = result
        console.log(resources)
        setImages(resources)
      } catch (err) {
        console.error('Failed to fetch images')
      }
    }

    fetchData()
  }, [])
  return (
    <>
      <Head>
        <title>PhotoRepo - Home</title>
      </Head>
      <main>
        <div className="relative justify-center">
          <HomeCarousel className="w-1/2 p-2" images={images} />
        </div>
        <div className="tag-banner">
          <div className="banner-full">
            <h2 className="banner-title text-blue-200">Tags</h2>
            <div className="tag-list">
              {allTags.map(({ tag, name }) => (
                <Link className="tag-links" href={`/tags/${tag}`}>
                  {name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Link id="longwood-banner" className="banner bg-green-200" href="/tags/longwood">
          <div className="banner-half">
            <Image src={longwoodImage} width={1500} height={1000} className="banner-image" />
          </div>
          <div className="banner-half">
            <div className="banner-text text-black">
              <h2 className="banner-title">Longwood Gardens</h2>
              <p className="banner-info">
                Stunning botanical gardens with a multitude of flowers and captivating night
                illuminated fountain shows
              </p>
            </div>
          </div>
        </Link>
        <Link id="springlake-banner" className="banner bg-blue-300" href="/tags/spring-lake">
          <div className="banner-half">
            <div className="banner-text text-black">
              <h2 className="banner-title">Spring Lake Beach</h2>
              <p className="banner-info">
                Beautiful beach town with wonderful coastal views and mesmerizing sunrises and
                sunsets
              </p>
            </div>
          </div>
          <div className="banner-half">
            <Image src={springlakeImage} width={1500} height={1000} className="banner-image" />
          </div>
        </Link>
      </main>
    </>
  )
}
export default Home
