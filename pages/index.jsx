import Head from 'next/head'
import React from 'react'
import Image from 'next/image'
import { allTags } from '../data/allTags.js'
import Link from 'next/link.js'
import cloudinary from '../utils/cloudinary.js'
import HomeCarousel from '../components/HomeCarousel.jsx'

const Home = ({ images }) => {
  const longwoodId = 'DSC_0152_zyedw1.jpg'
  const nemoursId = 'DSC_0851_xzbodl.jpg'
  const springlakeId = 'DSC_1238_xfnhei.jpg'
  const brooklynId = 'xsqfihksb9qpgr740f9s.jpg'

  // const longwoodImage =
  //   'https://res.cloudinary.com/ddaymbzcc/image/upload/v1705612684/photo-repo/DSC_0152_zyedw1.jpg'
  // const nemoursImage =
  //   'https://res.cloudinary.com/ddaymbzcc/image/upload/v1705612811/photo-repo/DSC_0851_xzbodl.jpg'
  // const springlakeImage =
  //   'https://res.cloudinary.com/ddaymbzcc/image/upload/v1705613275/photo-repo/DSC_1238_xfnhei.jpg'
  // const brooklynImage =
  //   'https://res.cloudinary.com/ddaymbzcc/image/upload/v1705611897/photo-repo/xsqfihksb9qpgr740f9s.jpg'

  const imgSrc = (id) => {
    return `https://res.cloudinary.com/ddaymbzcc/image/upload/c_auto,w_1000,h_400/photo-repo/${id}`
  }

  return (
    <>
      <Head>
        <title>PhotoRepo - Home</title>
      </Head>
      <main>
        <div className="home-container">
          <div className="flex h-fit justify-center">
            <div className="carousel-container">
              <HomeCarousel className="p-2" images={images} />
            </div>
          </div>
          <Link id="filter-banner" className="banner bg-gray-950 h-32" href="/filter">
            <div className="banner-container">
              <div className="banner-text">
                <h2 className="">Browse all images by tags</h2>
                <p className="banner-info">Select what tags to view in the dynamic tag selector</p>
              </div>
            </div>
          </Link>

          <Link id="longwood-banner" className="banner image-banner" href="/tags/longwood">
            <div className="banner-container">
              <Image
                src={`${imgSrc(longwoodId)}`}
                width={1000}
                height={400}
                className="banner-image"
              />
              <div className="banner-text bg-black">
                <h2 className="banner-title ">Longwood Gardens</h2>
              </div>
            </div>
          </Link>
          <Link id="nemours-banner" className="banner image-banner" href="/tags/nemours">
            <div className="banner-container">
              <Image
                src={`${imgSrc(nemoursId)}`}
                width={1000}
                height={400}
                className="banner-image"
              />
              <div className="banner-text bg-blue-900 ">
                <h2 className="banner-title">Nemours Estate</h2>
              </div>
            </div>
          </Link>
          <Link id="brooklyn-banner" className="banner image-banner" href="/tags/brooklyn">
            <div className="banner-container">
              <Image
                src={`${imgSrc(brooklynId)}`}
                width={1000}
                height={400}
                className="banner-image"
              />
              <div className="banner-text bg-purple-900">
                <h2 className="banner-title ">Brooklyn Botanic Garden</h2>
              </div>
            </div>
          </Link>
          <Link id="springlake-banner" className="banner image-banner" href="/tags/springlake">
            <div className="banner-container">
              <Image
                src={`${imgSrc(springlakeId)}`}
                width={1000}
                height={400}
                className="banner-image"
              />
              <div className="banner-text bg-orange-900">
                <h2 className="banner-title">Spring Lake Beach</h2>
              </div>
            </div>
          </Link>

          {/* <Link id="longwood-banner" className="banner bg-green-200" href="/tags/longwood">
            <div className="banner-half">
              <Image src={longwoodImage} width={1500} height={1000} className="banner-image" />
            </div>
            <div className="banner-half">
              <div className="banner-text text-black">
                <h2 className="banner-title">Longwood Gardens</h2>
                <p className="banner-info">
                  Stunning gardens with a vast assortment of floral displays and captivating
                  nighttime fountain light shows.
                </p>
              </div>
            </div>
          </Link>
          <Link id="nemours-banner" className="banner bg-blue-200" href="/tags/nemours">
            <div className="banner-half">
              <div className="banner-text text-black">
                <h2 className="banner-title">Nemours Estate</h2>
                <p className="banner-info">
                  A historic 77-room mansion with 200 acres of elegant formal gardens, grounds, and
                  woodlands.
                </p>
              </div>
            </div>
            <div className="banner-half">
              <Image src={nemoursImage} width={1500} height={1000} className="banner-image" />
            </div>
          </Link>
          <Link id="brooklyn-banner" className="banner bg-purple-200" href="/tags/brooklyn-botanic">
            <div className="banner-half">
              <Image src={brooklynImage} width={1500} height={1000} className="banner-image" />
            </div>
            <div className="banner-half">
              <div className="banner-text text-black">
                <h2 className="banner-title">Brooklyn Botanic Garden</h2>
                <p className="banner-info">
                  Botanic gardens tucked behind an urban cityscape, with countless flowers and
                  gardens.
                </p>
              </div>
            </div>
          </Link>
          <Link id="springlake-banner" className="banner bg-orange-200" href="/tags/spring-lake">
            <div className="banner-half">
              <div className="banner-text text-black">
                <h2 className="banner-title">Spring Lake Beach</h2>
                <p className="banner-info">
                  Beautiful beach town with wonderful coastal views and mesmerizing sunrises and
                  sunsets.
                </p>
              </div>
            </div>
            <div className="banner-half">
              <Image src={springlakeImage} width={1500} height={1000} className="banner-image" />
            </div>
          </Link> */}
          <div className="tag-banner bg-gray-900">
            <h2 className="banner-title text-white">Explore Tags</h2>
            <div className="tag-list">
              {allTags.map(({ tag, name }) => (
                <Link className="tag-links" href={`/tags/${tag}`}>
                  <p>{name}</p>
                </Link>
              ))}
            </div>
          </div>
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
