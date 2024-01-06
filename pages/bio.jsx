
import React from 'react'
import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <title>About</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        <h1>About me</h1>
        <div>

        <p>
          I'm an amateur photographer that enjoys capturing the beauty of the moment. As a new university student, taking pictures around campus is a favorite pastime. 
        </p>
        </div>
      </main>
    </>
  )
}

export default Home;
