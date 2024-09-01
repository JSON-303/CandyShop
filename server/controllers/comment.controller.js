import Comment from "../models/comment.model.js";

//Create new
async function createComment(req, res) {
    try {
        const newComment = await Comment.create(req.body);
        res.json(newComment);
    } catch(error) {
        console.log(error);
        res.status(400).json(error);
    }
}

//Get all matching the recipe
async function getCommentsForThisRecipe(req, res) {
    try {
        const foundComments = await Comment.find({recipeName:req.params.id})
        res.json(foundComments);
    } catch(error) {
        console.log(error);
        res.status(400).json(error);
    }
}

//Get all 
async function getAllComments(req, res) {
    try {
        const allComments = await Comment.find();
        res.json(allComments);
    } catch(error) {
        console.log(error);
        res.statuss(400).json(error)
    }
}

//Get by ID
async function getOneComment(req, res) {
    try {
        const foundComment = await Comment.findById(req.params.id);
        res.json(foundComment);
    } catch(error) {
        console.log(error);
        res.status(400).json(error);
    }
}

//Update
async function updateOneComment(req, res) {
    const options = {
        new: true,
        runValidators: true,
    };
    try {
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, options);
        res.json(updatedComment);
    } catch(error) {
        console.log(error);
        res.status(400).json(error);
    }}

//Delete
async function deleteOneComment(req, res) {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        res.json(deletedComment);
    } catch(error) {
        console.log(error);
        res.status(400).json(error);
    }
}

export{
    createComment,
    getAllComments,
    getOneComment,
    updateOneComment,
    deleteOneComment,
    getCommentsForThisRecipe
};