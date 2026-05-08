import { Router } from "express";
import * as postServices from './posts.services.js'

export const router = Router();

router.post("/", postServices.createNewPost);

router.delete("/:postId", postServices.deletePost);

router.get("/details", postServices.getPostsDetails);

router.get("/comment-count", postServices.commentsPostCount);



