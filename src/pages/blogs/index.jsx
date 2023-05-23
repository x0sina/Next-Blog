import CategoryDesktop from '@/components/Posts/CategoryDesktop';
import CategoryMobile from '@/components/Posts/CategoryMobile';
import PostList from '@/components/Posts/PostList';
import SortBar from '@/components/Posts/SortBar';
import { useState } from 'react';
import queryString from 'querystring'
import http from '@/services/httpService';
import Paginate from '@/common/Pagination';


const Blogs = ({ postsData, postCategories }) => {
    const [isOpen, setIsOpen] = useState(true)

    return (
        <div className="container mx-auto md:max-w-screen-xl">
            <div className="grid gap-4 min-h-screen md:grid-cols-12 md:grid-rows-[80px_minmax(300px,_1fr)] pt-8">
                <div className="hidden md:block md:row-span-2 md:col-span-3 px-6">
                    <CategoryDesktop isOpen={isOpen} setIsOpen={setIsOpen} postCategories={postCategories} />
                </div>
                <div className="hidden md:block md:col-span-9 pl-4 xl:pl-0">
                    <SortBar />
                </div>
                <div className="flex md:hidden gap-x-4 overflow-x-auto pb-8">
                    <CategoryMobile postCategories={postCategories} />
                </div>
                <div className="md:col-span-9 grid h-max grid-cols-6 gap-8 px-6 md:pr-0 md:pl-4 xl:pl-0 pb-8">
                    <PostList postsData={postsData.docs} />
                    <Paginate count={postsData.totalPages} page={postsData.page}/>
                </div>
            </div>
        </div>
    );
}

export default Blogs;

export const getServerSideProps = async ({ query, req }) => {
    query.sort = query.sort || 'most'
    const { data } = await http.get(`/posts?${queryString.stringify(query)}`, {
        withCredentials: true,
        headers: {
            Cookie: req.headers.cookie || ''
        }
    })
    const { data: postCategories } = await http.get('/post-category')

    return {
        props: {
            postsData: data.data,
            postCategories: postCategories.data,
        }
    }
}