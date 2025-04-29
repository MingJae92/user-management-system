import sql from "mssql";
import { connectDB } from "../DatabaseConnection/databaseConnection.js";

const createUser = async (req, res) => {
  const {
    UserID,
    DisplayName,
    Email,
    IsOSPAdmin,
    Status,
    FunctionalUser,
    AdminUser,
    BlockAccess,
    O365Email,
    MFA_Mobile,
    ColourMode
  } = req.body;

  try {
    const pool = await connectDB();
    await pool.request()
      .input("UserID", sql.Int, UserID)
      .input("DisplayName", sql.NVarChar, DisplayName)
      .input("Email", sql.NVarChar, Email)
      .input("IsOSPAdmin", sql.Bit, IsOSPAdmin)
      .input("Status", sql.NVarChar, Status)
      .input("FunctionalUser", sql.Int, FunctionalUser)
      .input("AdminUser", sql.Int, AdminUser)
      .input("BlockAccess", sql.Int, BlockAccess)
      .input("O365Email", sql.NVarChar, O365Email)
      .input("MFA_Mobile", sql.NVarChar, MFA_Mobile)
      .input("ColourMode", sql.NVarChar, ColourMode)
      .query(`
        INSERT INTO Users (UserID, DisplayName, Email, IsOSPAdmin, Status, FunctionalUser, AdminUser, BlockAccess, O365Email, MFA_Mobile, ColourMode)
        VALUES (@UserID, @DisplayName, @Email, @IsOSPAdmin, @Status, @FunctionalUser, @AdminUser, @BlockAccess, @O365Email, @MFA_Mobile, @ColourMode)
      `);

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Failed to create user", error: error.message });
  }
};

export { createUser };
