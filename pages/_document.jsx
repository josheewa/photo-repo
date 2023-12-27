import Document, { Head, Html, Main, NextScript } from 'next/document'
// import Navbar from '../components/Navigation/navbar'
import Navigation from '../components/Navigation'
// import About from "./about"

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="" />
          <meta property="og:site_name" content="photo-repo.vercel.app" />
          <meta property="og:description" content="" />
          <meta property="og:title" content="Photo Gallery" />
        </Head>
        <body className="bg-black antialiased">
          {/* <Navigation /> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
