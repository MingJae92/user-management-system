import sql from "mssql"; // Corrected import statement
import { connectDB } from "../DatabaseConnection/databaseConnection.js";

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Connect to the database
    const pool = await connectDB();

    // Execute the delete query
    const result = await pool
      .request()
      .input("UserID", sql.Int, id)  // Corrected 'slq' to 'sql'
      .query("DELETE FROM Users WHERE UserID = @UserID");

    // Check if any rows were affected
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Success message
    console.log(`User with ID ${id} deleted successfully`);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ message: "Failed to delete user", error: error.message });
  }
};

export { deleteUser };
