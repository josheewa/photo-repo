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
        <div className="home-container">
          <div className="banner">
            <div className="vertical-label">TEST</div>
            <div className="flex-basis-auto flex flex-shrink-0 flex-grow-0 flex-row overflow-x-auto">
              {images.length > 0 &&
                images.map(({ id, public_id, format }) => (
                  <div key={id} className="mr-4">
                    <div className="after:content after:shadow-highlight group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg">
                      <Image
                        alt=""
                        className="h-[25vh] w-auto transform rounded-lg object-contain brightness-90 transition will-change-auto group-hover:brightness-110"
                        style={{ transform: 'translate3d(0, 0, 0)' }}
                        src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,h_720/${public_id}.${format}`}
                        width={480}
                        height={480} // Height here should be consistent with the container height
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="banner hidden opacity-0">
            <div className="vertical-label">GGGGG</div>
            <div className="img-banner-container">
              {images.length > 0 &&
                images.map(({ id, public_id, format }) => (
                  <div
                    key={id}
                    onClick={() => handleImageClick(public_id, format)}
                    role="button"
                    tabIndex={0}
                    className="mr-4 inline-block">
                    <div className="after:content after:shadow-highlight group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg">
                      <Image
                        alt=""
                        className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                        style={{ transform: 'translate3d(0, 0, 0)' }}
                        src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                        width={360}
                        height={320}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* <div className="banner-content img-container flex overflow-x-auto">
              {images.length > 0 &&
                images.map(({ id, public_id, format }) => (
                  <div
                    key={id}
                    // onClick={() => handleImageClick(public_id, format)}
                    role="button"
                    tabIndex={0}
                    className="mr-4 inline-block">
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
            </div> */}

          <div className="banner">
            <div className="vertical-label">Label 1</div>
            <div className="banner-content">{/* Your banner content goes here */}</div>
          </div>

          <div className="banner">
            <div className="vertical-label">Label 2</div>
            <div className="banner-content">{/* Your banner content goes here */}</div>
          </div>
          <div className="banner">
            <div className="vertical-label">Label 2</div>
            <div className="banner-content">{/* Your banner content goes here */}</div>
          </div>
          <div className="banner">
            <div className="vertical-label">Label 2</div>
            <div className="banner-content">{/* Your banner content goes here */}</div>
          </div>
          <div className="banner">
            <div className="vertical-label">Label 2</div>
            <div className="banner-content">{/* Your banner content goes here */}</div>
          </div>
          <div className="banner">
            <div className="vertical-label">Label 2</div>
            <div className="banner-content">{/* Your banner content goes here */}</div>
          </div>
          {/* <div className="flex h-full w-screen justify-start pt-16">
            <div className="vertical-text text-xl font-bold text-white bg-blue-500 p-3">Vertical Text</div>
          </div> */}
        </div>

        {/* <div className="home-container">
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
          <Link id="brooklyn-banner" className="banner image-banner" href="/tags/brooklyn-botanic">
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
          <Link id="springlake-banner" className="banner image-banner" href="/tags/spring-lake">
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
          </Link> */}

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
        {/* <div className="tag-banner bg-gray-900">
            <h2 className="banner-title text-white">Explore Tags</h2>
            <div className="tag-list">
              {allTags.map(({ tag, name }) => (
                <Link className="tag-links" href={`/tags/${tag}`}>
                  <p>{name}</p>
                </Link>
              ))}
            </div>
          </div>
        </div> */}
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
