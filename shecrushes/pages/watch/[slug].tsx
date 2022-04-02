import type { NextPage } from 'next'
import { NextApiRequest } from 'next'
import Head from 'next/head'
import Script from 'next/script';

// Fetch videos function
import { getVideo } from '../../lib/video'
import { getRelatedVideos } from '../../lib/relatedVideos'

// Functions
import { detectMobileDevice } from '../../functions/detectMobileDevice'

// Components
import { 
  Navbar, 
  MobileNavbar,
  MainVideo,
  MainVideoInfo,
  RelatedVideos,
  Footer
} from '../../components'

// Types
import type { watchVideo as video, relatedVideos } from '../../common/types'

type advertisment = {
  title: string;
  device: string;
  zoneId: string;
}

interface QueryParams {
	query: {
		slug: string
	},
  req: NextApiRequest;
}

interface Props {
  video: video;
  relatedVideos: relatedVideos[]
  pageTitle: string;
  pageDescription: string;
  slug: string;
  isMobileDevice:boolean;
}

const WatchPage: NextPage<Props> = (props: Props) => {
  const env = process.env.NEXT_PUBLIC_ENV;

  return (
     <div className="min-h-screen font-sans dark bg-trueGray-900">
      <Head>
        <title>{props.pageTitle}</title>
      </Head>

      {/* Navbar */}
      <Navbar />
      <MobileNavbar />

      <main className="px-4 mx-auto mb-8 max-w-7xl sm:px-6 lg:px-8">
        <div className='grid grid-cols-3 gap-4'>
          {/* Col 1 */}
          <div className='col-span-3 lg:col-span-2'>
            {/* Main Video content */}
            <div className='mt-8'>      
              <MainVideo video={props.video} isMobileDevice={props.isMobileDevice} />
            </div>

            {/* Video video info */}
            <div>
              <MainVideoInfo video={props.video} />
            </div>
          </div>

          {/* Col 2 */}
          <div className='col-span-3 lg:col-span-1 lg:mt-8 lg:ml-3'>
            {/* Related videos */}
            <RelatedVideos relatedVideos={props.relatedVideos} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

// Fetch video
export const getServerSideProps = async (context: QueryParams) => {
  // Fetch video
  const { slug } = context.query
  const video = await getVideo(slug)

  //
  // Page title & description
  //

  // Format Page Title
  let tags = JSON.parse(video.tags)
  let star = video.pornstar
  const tagsParsed = tags.join(" ") + ' by ' + star
  const pageTitle = tagsParsed + ' | Porn Gifs SheCrushes'

  // Format Page description
  const pageDescription = `Watch the hottest porn gifs by ${star} for free on SheCrushes. Stream new XXX tube gifs and browse different sex gif categories.`
  
  // Fetch related videos
  let tagsSliced = tags.slice(1, 2)
  const relatedVideos = await getRelatedVideos(tagsSliced[0])

  // Detect if request is from a mobile device
  const isMobileDevice = detectMobileDevice(context.req.headers['user-agent'] || '')

  return {
    props: {
      video,
      relatedVideos,
      pageTitle,
      pageDescription,
      slug,
      isMobileDevice
    }
  }
}

export default WatchPage
