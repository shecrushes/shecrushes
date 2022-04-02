import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

// Components
import { Navbar, MobileNavbar, Footer } from '../components'

const Custom404: NextPage = () => {
  return (
      <div className="min-h-screen font-sans dark bg-trueGray-900">
      <Head>
        <title>SheCrushes - 404</title>
      </Head>

      {/* Navbar */}
      <Navbar />
      <MobileNavbar />

      <main className="min-h-screen px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex-1 block my-8 space-y-4 text-trueGray-100">
            <h3 className="text-6xl font-semibold text-center sm:text-7xl sm:text-left"> 
              404 - Page not found :(
            </h3>

            <div className="mt-3 text-lg text-center text-trueGray-400 sm:text-base sm:text-left">
                <p>Sorry, we {"couldn't"} find that page. <Link href="/" passHref><p className="inline-block text-pink-500 underline cursor-pointer hover:text-pink-600">Return home</p></Link></p>
            </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Custom404
