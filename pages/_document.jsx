import Document, { Head, Html, Main, NextScript } from 'next/document'

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
          <Main />
          <NextScript />
<<<<<<< Updated upstream
          <footer>
=======
          <Analytics />
          <script
            src="https://product-gallery.cloudinary.com/all.js"
            type="text/javascript"></script>
          {/* <footer>
>>>>>>> Stashed changes
            <p>&copy; 2023-2024 Joshua Chen. All rights reserved.</p>
            <a href="https://www.flaticon.com/free-icons/picture" title="picture icons">
              Picture icons created by Freepik - Flaticon
            </a>
            <a href="https://www.flaticon.com/free-icons/gmail" title="gmail icons">
              Gmail icons created by Pixel perfect - Flaticon
            </a>
            <a href="https://www.flaticon.com/free-icons/instagram" title="instagram icons">
              Instagram icons created by Freepik - Flaticon
            </a>
<<<<<<< Updated upstream
            <a href="https://www.flaticon.com/free-icons/github" title="github icons">
              Github icons created by Dave Gandy - Flaticon
            </a>
          </footer>
=======
          </footer> */}
>>>>>>> Stashed changes
        </body>
      </Html>
    )
  }
}

export default MyDocument
