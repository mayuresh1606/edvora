import '../styles/globals.css'
import Navbar from '../components/Navbar'
import "../styles/navbar.css"
import "../styles/card.css"
import { AppProvider } from '../context'
import {React} from "react"

function MyApp({ Component, pageProps }) {
  return <>
    <AppProvider>
      <Navbar />
      <Component {...pageProps} />
    </AppProvider>
  </>
}

export default MyApp
