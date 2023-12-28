import { AppProps } from 'next/app'
import '../styles/index.css'
import Navigation from '../components/Navigation'


export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navigation />
      <Component {...pageProps} />
    </>
  )
}
