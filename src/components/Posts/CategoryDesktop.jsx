import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";

const CategoryDesktop = ({ isOpen, setIsOpen, postCategories }) => {
    const { query } = useRouter()

    return (
        <div
            className="bg-white overflow-hidden rounded-3xl sticky top-28 z-10">
            <div className="bg-white">
                <h2 className="accordion-header mb-0" id="headingOne5">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`
                    relative
                    flex
                    items-center
                    justify-between
                    w-full
                    py-6
                    px-5
                    text-base text-gray-800
                    bg-white
                    rounded-none
                    transition
                    focus:outline-none
                    ${isOpen && 'border-b'}
                `} type="button">
                        <span className='font-semibold'>
                            دسته بندی مقالات
                        </span>
                        <ChevronDownIcon className={`transition-all duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'} h-6 w-6`} />
                    </button>
                </h2>
                <div className={`transition-all duration-200 ${isOpen ? 'visible' : 'invisible h-0'}`}>
                    <div className='py-2'>
                        <ul>
                            <li>
                                <Link href={'/blogs'} className={`${!query.categorySlug && 'bg-blue-200'} py-2 font-semibold px-6 inline-block hover:bg-blue-100 transition-all duration-200 w-full text-right`}>
                                    همه مقالات
                                </Link>
                            </li>
                            {postCategories.map(p => (
                                <li key={p._id}>
                                    <Link href={`/blogs/${p.englishTitle}`} className={`${query?.categorySlug === p.englishTitle && 'bg-blue-200'} py-2 font-semibold px-6 inline-block hover:bg-blue-100 transition-all duration-200 w-full text-right`}>
                                        {p.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryDesktop;