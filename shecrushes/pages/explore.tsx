import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import Head from 'next/head';

// Fetch videos function
import { getExplore } from '../lib/explore'

// Components
import { 
  Navbar, 
  MobileNavbar,
  CategoryExplore, 
  ExploreCategoryPreview,
  Footer,
} from '../components'

// Types
type video = {
  id: string;
  thumbnail: string;
  creator: string;
  views: number;
}

type category = {
  name: string;
  videos: [video]
}

type Props = {
  exploreVideos: category[];
}

const Explore: NextPage<Props> = ({ exploreVideos }: Props) => {
  return (
    <div className="min-h-screen m-0 font-sans dark bg-trueGray-900">
      <Head>
        <title>Explore - SheCrushes</title>
      </Head>

      {/* Navbar */}
      <Navbar />
      <MobileNavbar />

      <main className="px-2 mx-auto max-w-max lg:px-8">
        {/* Categories bar*/}
        <div className="flex flex-wrap justify-center my-8">
          <CategoryExplore />
        </div>

        {/* Category Columns */}
        <div id="exploreCategories">
          <ExploreCategoryPreview 
            sections={exploreVideos}
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}

// Fetch homepage data
export const getServerSideProps: GetServerSideProps = async (context) => {

  // Fetch inital page categories
  const exploreVideos = await getExplore(1, 6)

  return {
    props: {
      exploreVideos,
    }
  }
}

export default Explore
