import type { NextPage } from 'next'
import Head from 'next/head'

// Components
import { 
  Navbar, 
  MobileNavbar, 
  CategoryCategories,
  Footer 
} from '../components'


// Context
const Categories: NextPage = () => {
  return (
    <div className="min-h-screen font-sans dark bg-trueGray-900">
      <Head>
        <title>SheCrushes Categories: Browse Your Favorite Hardcore Porn Gifs ...</title>
      </Head>

      {/* Navbar */}
      <Navbar />
      <MobileNavbar />

      <main className="min-h-screen px-2 mx-auto max-w-7xl sm:px-6 lg:px-8 ">  
        {/* Page Header */}
        <div className="flex justify-center mt-8 mb-4">
          <h1 className="text-3xl font-semibold text-trueGray-200"> 
            All Categories
          </h1>
        </div>   
          
        {/* Categories bar*/}
        <div className="flex flex-wrap justify-center my-4 mb-8">
          <CategoryCategories  />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Categories
