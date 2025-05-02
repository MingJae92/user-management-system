import slq from "mssql";
import { connectDB } from "../DatabaseConnection/databaseConnection.js";

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await connectDB();
    const result = await pool
      .request()
      .input("UserID", slq.Int, id)
      .query("DELETE FROM Users WHERE UserID = @UserID");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(`User with ID ${id} deleted successfully`);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ message: "Failed to delete user", error: error.message });
  }
};

export { deleteUser };
