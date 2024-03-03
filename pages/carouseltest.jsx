import React from 'react'
import Head from 'next/head'
import OwnCarousel from '../components/OwnCarousel';

const Home = () => {
  return (
    <>
      <Head>
        <title>About</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        <OwnCarousel></OwnCarousel>
      </main>
    </>
  )
}

export default Home
