import { BookmarkIcon, ChatBubbleBottomCenterTextIcon, HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid, BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid'
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import http from "@/services/httpService";
import routerPush from "@/utils/routerPush";

const Interactions = ({ post, isSmall }) => {
    const router = useRouter()
    const iconClasses = isSmall ? 'h-4 w-4' : 'h-6 w-6'
    const fontSize = isSmall ? 'text-xs' : 'text-sm'

    const actionHandler = async (post, action) => {
        try {
            const { data } = await http.put(`/posts/${action}/${post._id}`, {}, { withCredentials: true })
            routerPush(router)
            toast.success(data.message)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
    return (
        <>
            <button className="stroke-gray-800 fill-gray-800 text-gray-800 hover:text-white bg-gray-200 hover:stroke-white transition-all duration-100 hover:bg-gray-600 rounded-lg px-1 flex items-center gap-x-0.5 py-1">
                <ChatBubbleBottomCenterTextIcon className={`${iconClasses} stroke-inherit`} />
                <span className={fontSize}>{post.commentsCount}</span>
            </button>
            <button
                onClick={() => actionHandler(post, 'like')}
                className="stroke-red-600 fill-red-600 text-red-600 hover:text-white bg-red-200 hover:stroke-white transition-all duration-100 hover:bg-red-600 rounded-lg px-1 flex items-center gap-x-0.5 py-1">
                {!post.isLiked ? <HeartIcon className={`${iconClasses} stroke-inherit`} /> : <HeartIconSolid className={`${iconClasses} fill-inherit`} />}
                <span className={fontSize}>{post.likesCount}</span>
            </button>
            <button
                onClick={() => actionHandler(post, 'bookmark')}
                className="stroke-blue-600 fill-blue-600 bg-blue-200 hover:stroke-white transition-all duration-100 hover:bg-blue-600 rounded-lg px-1 py-1">
                {!post.isBookmarked ? <BookmarkIcon className={`${iconClasses} stroke-inherit`} /> : <BookmarkIconSolid className={`${iconClasses} fill-inherit`} />}
            </button>
        </>
    );
}

export default Interactions;