import type { NextPage } from 'next'
import Head from 'next/head'

// Components
import { 
  Navbar, 
  MobileNavbar,
  Footer
} from '../components'


const Info: NextPage = () => {
  return (
    <div className="min-h-screen font-sans dark bg-trueGray-900">
      <Head>
        <title>SheCrushes - Info</title>
        <meta name="description" content="All about SheCrushes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navbar */}
      <Navbar />
      <MobileNavbar />

      <main className="min-h-screen px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* App Info */}
          <div className="flex-1 block my-8 text-trueGray-200">
            <h3 className="mb-3 text-3xl font-semibold"> 
                App Info
            </h3>

            <div className="text-base text-trueGray-400">
                <p>Version: 1.1.0</p>
            </div>

            <div className='text-base text-pink-400'>
                Made by Cats on Keyboards
            </div>
          </div>

          {/* Questions */}
          <div className="flex-1 block my-8 text-trueGray-200">
            <h3 className="mb-3 text-3xl font-semibold"> 
                Questions?
            </h3>

            <div className="text-base text-trueGray-400">
                <p>If you would like to submit a feature request, question or concern please send me a dm on twitter: <a href="https://twitter.com/SheCrushes_" rel="noreferrer nofollow" target="_blank"className="text-pink-400 underline cursor-pointer underline-offset-2 hover:text-pink-500 decoration-pink-400">@SheCrushes_</a></p>
            </div>
          </div>
      </main>

      <Footer />
    </div>
  )
}

export default Info