import express from "express";
import dotenv from "dotenv";
import connectDB from "../DatabaseConnection/databaseConnection.js";
import sql from "mssql";

import userRoutes from "../Routes/userRoutes.js";
dotenv.config({ path: "../../config/.env" });

const app = express();
app.use(express.json());
const PORT = process.env.SERVER_PORT || 7000;

app.use("/api/users", userRoutes);

// API route to fetch users from Azure SQL
// app.get("/users", async (req, res) => {
//   try {
//     const pool = sql.connect({
//       user: process.env.DB_USERNAME,
//       password: process.env.DB_PASSWORD,
//       server: process.env.DB_SERVER,
//       database: process.env.DB_DATABASE,
//       options: {
//         encrypt: true, // for Azure
//         trustServerCertificate: true,
//       },
//     });

//     const result = await pool.request().query("SELECT * FROM * Users");

//     // Console log when users are fetched successfully
//     console.log("Fetched Users: ", result.recordset);

//     res.json(result.recordset); // Send the user data as a response
//   } catch (error) {
//     console.error("Failed to fetch user data ❌", error);
//     res.status(500).send("Server Error");
//   }
// });

// Start the server
const startServer = async () => {
  try {
    await connectDB(); // Ensure DB is connected
    app.listen(PORT, () => {
      console.log(`Server listening on: ${PORT} 🚀`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1); // Exit the process if the server fails to start
  }
};

startServer();
