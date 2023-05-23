import Link from "next/link";
import { useRouter } from "next/router";

const CategoryMobile = ({ postCategories }) => {
    const { query } = useRouter()

    return (
        <div className='py-2'>
            <ul className='flex items-center gap-x-2 px-6'>
                <li>
                    <Link href={'/blogs'} className={`${!query.categorySlug ? '!bg-blue-500 text-white ring-2 ring-blue-300' : ''} py-2 border-2 border-gray-300 rounded-3xl font-semibold inline-block hover:bg-blue-100 transition-all duration-200 px-4 text-right whitespace-nowrap`}>
                        همه مقالات
                    </Link>
                </li>
                {postCategories.map(p => (
                    <li key={p._id}>
                        <Link href={`/blogs/${p.englishTitle}`} className={`${query.categorySlug === p.englishTitle ? '!bg-blue-500 text-white ring-2 ring-blue-300' : ''} py-2 border-2 border-gray-300 rounded-3xl font-semibold inline-block hover:bg-blue-100 transition-all duration-200 px-4 text-right whitespace-nowrap`}>
                            {p.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoryMobile;