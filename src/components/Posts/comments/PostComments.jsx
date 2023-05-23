import { Fragment, useState } from "react";
import CommentForm from "./CommentForm";
import ReplyComment from "./ReplyComment";
import SingleComment from "./SingleComment";

const PostComments = ({ postId, comments }) => {

    return (
        <div>
            <h2 className="font-extrabold text-3xl mb-8">نظرات</h2>
            <div className="flex flex-col mb-16">
                {comments.map(comment => (
                    !comment.responseTo && comment.status === 2 && (
                        <Fragment key={comment._id}>
                            <SingleComment postId={postId} comment={comment} />
                            <ReplyComment postId={postId} comments={comments} parentId={comment._id} />
                        </Fragment>
                    )
                ))}
            </div>
            <span className="font-bold md:text-lg">ارسال دیدگاه جدید</span>
            <CommentForm postId={postId} responseTo={null} />
        </div>
    );
}

export default PostComments;