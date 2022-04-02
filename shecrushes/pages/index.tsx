import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { Transition } from '@headlessui/react'

// Fetch videos function
import { getCategory } from '../lib/category'

// Functions
import { detectMobileDevice } from '../functions/detectMobileDevice'

// Components
import { 
  Navbar, 
  MobileFeedNavbar,
  CategoryFeed, 
  VideoContent,  
} from '../components'

// Types
import type { frontPageVideo as video } from '../common/types'

type Props = {
  homepageVideos: video[];
  isMobileDevice: boolean
}

const Home: NextPage<Props> = ({ homepageVideos, isMobileDevice }: Props) => {
  return (
    <div className="min-h-screen m-0 font-sans dark bg-trueGray-900">
      <Head>
        <title>SheCrushes: Free Porn Gifs - NSFW Gifs</title>
      </Head>

      {/* Navbar */}
      <Navbar />
      <MobileFeedNavbar />

      <main className="mx-auto lg:mx-8">
        {/* Categories bar*/}
        <div className="flex-wrap justify-center hidden my-8 md:flex">
          <CategoryFeed  />
        </div>

        {/* Videos */}
        <Transition
          appear={true}
          show={true}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <VideoContent 
            category="homepage" 
            data={homepageVideos}
            isMobileDevice={isMobileDevice}  
          />
        </Transition>
      </main>
    </div>
  )
}

// Fetch homepage data
export const getServerSideProps: GetServerSideProps = async (context) => {

  // Detect if request is from a mobile device
  const isMobileDevice = detectMobileDevice(context.req.headers['user-agent'] || '')
  
  // If its a mobile device, fetch 2 videos, else 8
  const itemsToFetch = isMobileDevice ? 2 : 8

  // Fetch inital page videos            
  const homepageVideos = await getCategory('homepage', 1, itemsToFetch)
  
  return {
    props: {
      homepageVideos,
      isMobileDevice
    }
  }
}

export default Home
