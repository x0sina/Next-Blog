import SingleComment from "./SingleComment";

const ReplyComment = ({ comments, parentId, postId }) => {
    return comments.map(comment => (
        parentId === comment.responseTo && (
            <div className="mr-3 md:mr-5" key={comment._id}>
                <SingleComment postId={postId} comment={comment} />
                <ReplyComment postId={postId} comments={comments} parentId={comment._id} />
            </div>
        )
    ))

}

export default ReplyComment;