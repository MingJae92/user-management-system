import { connectDB } from "../DatabaseConnection/databaseConnection.js";

const getUsersFromDatabase = async () => {
  try {
    const pool = await connectDB(); // Ensure this returns the connection pool

    const result = await pool.request().query("SELECT * FROM Users");
    return result.recordset; // Return the fetched users
  } catch (error) {
    console.error("❌ Error fetching users from database:", error);
    throw error;
  }
};

export default getUsersFromDatabase;
