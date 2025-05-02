import express from "express"
import { deleteUser } from "../Controllers/deleteUserController.js";

const router = express.Router();

router.delete("/:id", deleteUser)

export default router