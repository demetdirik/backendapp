import express from "express";
const router = express.Router();
import {
  createPost,
  getPost,
  getAllPosts,
  updatePost,
  deletePost,
} from "../controllers/postControllers.js";
import { authGuard } from "../middleware/authMiddleware.js";

router.route("/").post(createPost).get(getAllPosts);

router.route("/:slug").put(updatePost).delete(deletePost).get(getPost);

export default router;
