import { createUser } from "../Controllers/createUserController.js";
import express from "express";

const router = express.Router();
router.post("/", createUser);

export default router;
