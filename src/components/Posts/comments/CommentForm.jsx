import http from "@/services/httpService";
import routerPush from "@/utils/routerPush";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";

const CommentForm = ({ postId, responseTo, setOpened }) => {
    const router = useRouter()
    const [comment, setComment] = useState('')

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const { data } = await http.post('/post-comment/save-comment', {
                postId: postId,
                content: comment,
                responseTo
            })
            routerPush(router)
            toast.success(data.message)
            setComment('')
            setOpened && setOpened(false)
        } catch (error) {
            console.error(error)
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <form onSubmit={(e) => submitHandler(e)} className="mb-8">
            <textarea
                className="focus:ring-blue-400 p-4 rounded my-4 w-full border-none
                    ring-2 ring-slate-300 shadow-sm focus:outline-none focus:ring-2"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder='نظرت رو برام بنویس'
                name=""
                id="" ></textarea>
            <button className="mt-4 mx-auto font-bold py-3 w-full sm:w-56 bg-blue-600 rounded-xl text-white px-3 md:text-lg">
                ارسال نظر
            </button>
        </form>
    );
}

export default CommentForm;