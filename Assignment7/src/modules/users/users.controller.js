import { Router } from "express";
import * as userServices from "./users.services.js";
import { checkUserAuthorize } from "../../middleware/auth.middleware.js";

export const router = Router();

router.post("/signup", userServices.createNewUser);

router.put("/:id", userServices.updateUser);

router.get("/by-email", userServices.getUserByEmail);

router.get("/:id", userServices.getUserById);

// router.get("/all", getAllUsers);

// router.delete("/:id", deleteUser);

