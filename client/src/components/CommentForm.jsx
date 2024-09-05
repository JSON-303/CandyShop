import axios from "axios";
import { useState } from "react";

const CommentForm = (props) => {
    const {recipeName} = props;

    const [getter, setter] = useState({
        recipeName: recipeName,
        commentText: "", 
        errors: {}
    })

    const changeHandler = (e) => {
        setter((prevValue) => ({
            ...prevValue,
            [e.target.name]: e.target.value
        }))
    }

    //Handles submit functionality for comment forms
    const submitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/comments", getter)
        .then(res => {
            console.log(res);
            console.log(res.data);
            location.reload();
        })
        .catch(error => {
            console.log(error.response.data.errors);
            setter((prevValue) => ({
                ...prevValue,
                errors: error.response.data.errors
            }))
            console.log(getter.errors)
        })
    }

    return (
        <div className="container">
            <form onSubmit={submitHandler} className="row d-flex align-items-center container mb-5">
                <input type="hidden" name="recipeName" value={recipeName} />
                <textarea rows="3" type="string" name="commentText" placeholder="Add a commment!" className={getter.errors?.commentText? "border-danger border col-4" : "col-4"} onChange={(e)=>changeHandler(e)} value={getter.commentText} />
                {
                    getter.errors?.commentText?
                    <p className="text-danger"> {getter.errors.commentText.message} </p>:
                    ""
                }
                <button className="btn mx-2 btn-success mt-2 h-50 col-1">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default CommentForm;