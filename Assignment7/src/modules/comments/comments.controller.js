import { Router } from "express";
import * as commentsServices from "./comments.services.js"

export const router = Router();

router.post("/", commentsServices.createBulkComments);

router.patch("/:commentId", commentsServices.updateComment);

router.post("/find-or-create", commentsServices.createOrFind);