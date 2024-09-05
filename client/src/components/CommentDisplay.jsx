import axios from "axios";

const CommentDisplay = (props) => {

    const {comments} = props;

    const deleteComment = (id) => {
        axios.delete(`http://localhost:8000/api/comments/${id}`)
        .then((res) => {
            console.log(res.data);
            location.reload();
        })
    }

    return (
        <div className="mt-3">
            <div className="bg-dark border border-dark p-2 rounded">
                <h2 className="container text-light">Comments</h2>
            </div>
            <div className="container px-3 mt-2">
                {comments.map((comment, index) => (
                    <div key={index} className="row my-2 d-flex align-items-center border-bottom">
                        <p className="col-10 d-flex justify-content-start">
                            <span><u>User Commented:</u></span>{comment.commentText}
                        </p>
                        <button onClick={() => deleteComment(comment._id)} className="h-50 col-1 btn btn-danger">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CommentDisplay;