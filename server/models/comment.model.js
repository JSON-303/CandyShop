import {model, Schema} from 'mongoose';

const CommentSchema = new Schema(
    {
        recipeName: {
            type: String,
            required: [true, "Recipe Name is required"]
        },
        commentText: {
            type: String,
            required: [true, "Comment is required!"],
            minlength: [3, "Comment must be at least 3 characters!"]
        }
    },
    { timestamps: true }
);
const Comment = model("Comment", CommentSchema);
export default Comment;