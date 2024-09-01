import {Router} from "express";
import { createComment, getAllComments, getOneComment, updateOneComment, deleteOneComment, getCommentsForThisRecipe } from "../controllers/comment.controller.js";

const commentRouter = Router();
commentRouter.route("/comments")
    .get(getAllComments)
    .post(createComment)

commentRouter.route("/comments/:id")
    .get(getCommentsForThisRecipe)
    .put(updateOneComment)
    .delete(deleteOneComment)

export default commentRouter;