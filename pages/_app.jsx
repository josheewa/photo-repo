import { AppProps } from 'next/app'
import '../styles/index.css'
import Navigation from '../components/Navigation'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navigation />
      <Component {...pageProps} />
      <ToastContainer />
    </>
  )
}
