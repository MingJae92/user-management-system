import express from "express";
import getAllUsers from "../Controllers/userControllers.js"
// import { createUser } from "../Controllers/createUserController.js";
// import { updateUser } from "../Controllers/updateUserController.js";
// import { deleteUser } from "../Controllers/deleteUserController.js";

const router = express.Router();

router.get("/", getAllUsers);
// router.post("/", createUser);
// router.put("/:userID", updateUser)
// router.delete("/:userID", deleteUser)



export default router;
