import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import CommentForm from "./CommentForm";

const SingleComment = ({ comment, postId }) => {
    const [formOpened, setFormOpened] = useState(false)

    return (
        <div className="border border-gray-300 bg-gray-50 rounded-2xl p-3 md:p-5 mb-6 shadow">
            <div className="flex items-center gap-x-2 mb-4">
                <UserCircleIcon className="h-10 w-10 stroke-gray-500" />
                <div className="flex flex-col gap-y-1.5">
                    <span className="text-gray-500 text-sm font-semibold">{comment.writer.name}</span>
                    <span className="text-gray-500 text-sm">{new Date(comment.createdAt).toLocaleDateString('fa-IR')}</span>
                </div>
            </div>
            <p className="mb-4 text-black font-medium">
                {comment.content}
            </p>
            <div>
                <button onClick={() => setFormOpened(!formOpened)} className="text-blue-500 block my-6 w-full text-right px-4 font-semibold">{formOpened ? 'بیخیال' : 'پاسخ به'}</button>
                {formOpened && (
                    <>
                        <span className="mt-6">در حال پاسخ به {comment.writer.name}</span>
                        <CommentForm setOpened={setFormOpened} postId={postId} responseTo={comment._id} />
                    </>
                )}
            </div>
        </div>
    );
}

export default SingleComment;