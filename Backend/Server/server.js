import express from "express";
import cors from "cors"; // 👈 import CORS
import dotenv from "dotenv";
import { connectDB } from "../DatabaseConnection/databaseConnection.js";
import sql from "mssql";

import userRoutes from "../Routes/userRoutes.js";
import createUserRoutes from "../Routes/createUserRoutes.js";
import updateUserRoutes from "../Routes/updateUserRoutes.js";
import deleteUserRoutes from "../Routes/deleteUserRoutes.js";

dotenv.config({ path: "../../config/.env" });

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.SERVER_PORT || 7000;

app.use("/api/users", userRoutes);
app.use("/api/users/createuser", createUserRoutes);
// app.use("/api/users/updateuser", updateUserRoutes);
// app.use("/api/users/deleteuser", deleteUserRoutes);

// ... rest of your code

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server listening on: ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();
