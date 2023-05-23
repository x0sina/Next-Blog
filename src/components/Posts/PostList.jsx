import { ClockIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Interactions from "./Interactions";

const PostList = ({ postsData }) => {

    return postsData.map((post) => (
        <div key={post._id} className='col-span-6 transition-all duration-200 md:hover:scale-105 group md:col-span-3 lg:col-span-2 row-span-1 bg-white rounded-3xl flex flex-col overflow-hidden p-3'>
            <div className="aspect-w-16 aspect-h-9 mb-6">
                <Link className="group-hover:text-blue-500" href={`/posts/${post.hashId}/${post.slug}`}>
                    <img src={post.coverImage} className='w-full rounded-3xl h-full object-center object-cover' alt="" />
                </Link>
            </div>
            <div className='bg-gray-50 rounded-3xl p-2 flex flex-col flex-1'>
                <Link href={`/posts/${post.hashId}/${post.slug}`} className='mb-4 transition-all duration-300 group-hover:text-blue-600 font-semibold text-lg'>{post.title}</Link>
                <div className='flex-1 flex flex-col justify-end'>
                    <div className='flex items-center justify-between mb-4'>
                        <div className='flex items-center'>
                            <img src="/images/nextjs.png" alt="" className='h-6 w-6 ml-2 peer rounded-full ring-blue-200 ring-2' />
                            <span>{post.author.name}</span>
                        </div>
                        <Link href={`/blogs/${post.category.englishTitle}`} className='bg-blue-100 text-blue-600 hover:text-blue-100 text-center hover:bg-blue-600 transition-all duration-300 cursor-pointer px-2 py-1 rounded-full'>{post.category.title}</Link>
                    </div>
                    <div className="flex items-center justify-between gap-x-1">
                        <div className="flex items-center gap-x-2">
                            <Interactions post={post} isSmall={true} />
                        </div>
                        <div className='flex items-center'>
                            <ClockIcon className='h-3 w-3 ml-1 stroke-gray-600' />
                            <span className='text-xs text-gray-600'>زمان مطالعه: {post.readingTime} دقیقه</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ))
}

export default PostList;