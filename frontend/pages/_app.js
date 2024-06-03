import { SessionProvider } from "next-auth/react"
import React from "react"
import '../public/css/core-style.css'
import '../public/css/UserProfile.css';
import '../public/css/ToggleBtn.css';
import '../public/css/owl.carousel.css'
import '../public/scss/style.scss'
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


export default function App({
  Component, pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps}/>
    </SessionProvider>
  )
}