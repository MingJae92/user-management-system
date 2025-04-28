import express from "express";
import dotenv from "dotenv"
dotenv.config({ path: "../../config/.env" });


const app = express();
const PORT = process.env.SERVER_PORT

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server listening on: ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
