const {
  createPostController,
  createReplyController,
  addCommentController,
  updateCommentController,
  updateReplyController,
  markSolutionReplyController,
  deleteReplyController,
} = require("../controller/post.controller");
const authenticate = require("../middleware/authenticate");
import { Router } from "express";

const postRoutes = Router();

postRoutes.post("/new", authenticate, createPostController);
postRoutes.post("/reply/:postId", authenticate, createReplyController);
postRoutes.post("/comment/:postId", authenticate, addCommentController);

postRoutes.put("/reply/:replyId", authenticate, updateReplyController);
postRoutes.patch(
  "/reply/:replyId/mark-solution",
  authenticate,
  markSolutionReplyController
);
postRoutes.patch("/comment/:commentId", authenticate, updateCommentController);

postRoutes.delete("/reply/:replyId", authenticate, deleteReplyController);

module.exports = postRoutes;
