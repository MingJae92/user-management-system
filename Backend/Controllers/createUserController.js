import { connectDB,sql } from "../DatabaseConnection/databaseConnection.js";
const createUser = async (req, res) => {
  const {
    DisplayName,
    Email,
    Status,
    IsOSPAdmin,
    FunctionalUser,
    AdminUser,
    BlockAccess,
    O365Email,
    MFA_Mobile,
    ColourMode,
  } = req.body;

  console.log("Received POST data:", req.body);

  // Validate only required fields
  const requiredFields = {
    DisplayName,
    Email,
    Status,
    IsOSPAdmin,
  };

  try {
    const pool = await connectDB();

    await pool
      .request()
      .input("DisplayName", sql.NVarChar, DisplayName)
      .input("Email", sql.NVarChar, Email)
      .input("IsOSPAdmin", sql.Bit, IsOSPAdmin)
      .input("Status", sql.NVarChar, Status)
      .input("FunctionalUser", sql.Int, FunctionalUser ?? null)
      .input("AdminUser", sql.Int, AdminUser ?? null)
      .input("BlockAccess", sql.Int, BlockAccess ?? null)
      .input("O365Email", sql.NVarChar, O365Email ?? null)
      .input("MFA_Mobile", sql.NVarChar, MFA_Mobile ?? null)
      .input("ColourMode", sql.NVarChar, ColourMode ?? null).query(`
        INSERT INTO Users 
        (DisplayName, Email, IsOSPAdmin, Status, FunctionalUser, AdminUser, BlockAccess, O365Email, MFA_Mobile, ColourMode)
        VALUES 
        (@DisplayName, @Email, @IsOSPAdmin, @Status, @FunctionalUser, @AdminUser, @BlockAccess, @O365Email, @MFA_Mobile, @ColourMode)
      `);

    console.log("User created successfully");
    res
      .status(200)
      .json({ message: "User created successfully and database updated" });
  } catch (error) {
    console.error("Error inserting into DB:", error);
    res
      .status(500)
      .json({ message: "Failed to create user", error: error.message });
  }
};

export { createUser, sql };
