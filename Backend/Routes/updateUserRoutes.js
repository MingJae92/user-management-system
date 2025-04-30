import { updateUser } from "../Controllers/updateUserController.js";
import express from "express";

const router = express.Router();

router.put("/:userID", updateUser)

export default router
