import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';

// Context
import { AuthProvider } from '../context/AuthProvider'

function SheCrushes({ Component, pageProps }: AppProps) {
  return ( 
    <>
      <Head>
        <html lang="en" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest"></link>
      </Head>

      <noscript>Please enable JavaScript to continue using this application.</noscript>

      <AuthProvider>
        <Component {...pageProps} />
        <Toaster containerClassName="mt-12" />
      </AuthProvider>
    </>
  )
}

export default SheCrushes
