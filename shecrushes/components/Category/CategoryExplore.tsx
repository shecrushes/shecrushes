import { NextPage } from "next";
import Link from 'next/link'

// Categories
import categoriesExplore from './lists/categoriesExplore';

type Category = {
  title: string;
  link: string;
}


const CategoryExplore: NextPage = () => {
    return (
        <>
        {categoriesExplore.map((data: Category, index:number) => {
            return (
                <div key={index}>
                    <a href={data.link} data-cy={data.title} className="no-underline"> 
                        <Link href={data.link} passHref>
                            <>
                                <div 
                                    className={`
                                        bg-trueGray-700 
                                        hover:bg-pink-500 
                                        mx-1 
                                        my-1 
                                        text-center 
                                        text-white 
                                        no-underline 
                                        py-[6px] px-[12px]
                                        rounded
                                        cursor-pointer
                                    `} 
                                >
                                    <div className="items-center text-sm font-medium">
                                        #{data.title.toLowerCase()}
                                    </div>
                                </div>
                            </>
                        </Link>
                    </a>
                </div>
            )
        })}
    </>
    )
}

export default CategoryExplore