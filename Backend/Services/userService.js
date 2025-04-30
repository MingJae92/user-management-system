import { connectDB } from "../DatabaseConnection/databaseConnection.js";

const getUsersFromDatabase = async () => {
  try {
    const pool = await connectDB(); 

    const result = await pool.request().query("SELECT * FROM Users");
    return result.recordset; 
  } catch (error) {
    console.error(" Error fetching users from database:", error);
    throw error;
  }
};

export default getUsersFromDatabase;
