import { AppProps } from 'next/app'
import '../styles/index.css'
import Navigation from '../components/Navigation'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navigation />
      <Component {...pageProps} />
      <footer className="text-xxs text-gray-800">
        <a href="https://www.flaticon.com/free-icons/gmail" title="gmail icons">
          Gmail icons created by Pixel perfect - Flaticon
        </a>
        <br />
        <a href="https://www.flaticon.com/free-icons/instagram" title="instagram icons">
          Instagram icons created by Freepik - Flaticon
        </a>
        <br />
        <a href="https://www.flaticon.com/free-icons/github" title="github icons">
          Github icons created by Dave Gandy - Flaticon
        </a>
      </footer>
    </>
  )
}
