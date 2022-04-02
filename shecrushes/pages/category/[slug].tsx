import type { NextPage } from 'next'
import { NextApiRequest } from 'next'
import Head from 'next/head';
import Script from 'next/script';
import { Transition } from '@headlessui/react'

// Fetch videos function
import { getCategory } from '../../lib/category'

// Functions
import { detectMobileDevice } from '../../functions/detectMobileDevice'

// Components
import { 
  Navbar, 
  MobileFeedNavbar, 
  VideoContent, 
  CurrentCategory,
} from '../../components'

// Types
import type { frontPageVideo as video } from '../../common/types'


type QueryParams = {
	query: {
		slug: string
	},
  req: NextApiRequest;
}

interface Props {
  categoryVideos: video[];
  pageTitle: string;
  pageDescription: string;
  slug: string;
  isMobileDevice: boolean
}

const CategoryPage: NextPage<Props> = (props: Props) => {
  const env = process.env.NEXT_PUBLIC_ENV;
  
  return (
     <div className="min-h-screen font-sans dark bg-trueGray-900">
      <Head>
        <title>{props.pageTitle} Porn Gifs: SheCrushes.com</title>
      </Head>

      {/* Navbar */}
      <Navbar />
      <MobileFeedNavbar category={props.slug}  />

      <main className="mx-auto lg:mx-8">      
        {/* Current Category (Desktop) */}
        <div className='hidden max-w-screen-xl mx-auto md:flex'>
          <CurrentCategory
            category={props.slug}
          />
        </div>  
        
        {/* Videos */}
        <Transition
          appear={true}
          show={true}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <VideoContent 
            category={props.pageTitle} 
            data={props.categoryVideos} 
            isMobileDevice={props.isMobileDevice}  
          />
        </Transition>
      </main>
    </div>
  )
}

// Fetch category data
export const getServerSideProps = async (context: QueryParams) => {
  //
  // Determine if device is a mobile device
  //

  const isMobileDevice = detectMobileDevice(context.req.headers['user-agent'] || '')
  
  // If its a mobile device, fetch 2 items, else 8
  const itemsToFetch = isMobileDevice ? 3 : 8
  
  //
  // Fetch Inital Category Items
  //

  // Fetch category videos
  const { slug } = context.query
  const categoryVideos = await getCategory(slug, 1, itemsToFetch)

  //
  // SEO - Format page title & description
  //

  // Format page title
  let val = slug
  let uppercasedSlug = slug.charAt(0).toUpperCase() + val.slice(1)
  const pageTitle = uppercasedSlug
  
  // Format page description
  const pageDescription = `Watch the hottest ${pageTitle} porn gifs in the world for free on SheCrushes. The hottest ${pageTitle} pornstars get naked and have hardcore sex.`


  return {
    props: {
      categoryVideos,
      pageTitle,
      pageDescription,
      slug,
      isMobileDevice
    }
  }
}

export default CategoryPage
