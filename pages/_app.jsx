import '../styles/index.css'
import '../styles/home.css'
import '../styles/email.css'
import '../styles/filter.css'

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
