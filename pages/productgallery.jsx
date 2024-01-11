import React from 'react'
import Head from 'next/head'

import ProductGallery from '../components/ProductGallery'

const Home = () => {
  return (
    <>
      <Head>
        <title>About</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        <div className="bg-black">
          <ProductGallery startingImagePublicId="photo-repo/DSC_1406_malfbo" tag="city" />
        </div>
      </main>
    </>
  )
}

export default Home
