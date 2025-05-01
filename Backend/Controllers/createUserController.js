import { connectDB, sql } from "../DatabaseConnection/databaseConnection.js";

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

  // Ensure ColourMode is one of the valid options
  const validColourModes = {
    'L': 'Light',
    'D': 'Dark',
    // Add any other mappings here if necessary
  };

  // Map ColourMode from 'L' or 'D' to 'Light' or 'Dark'
  const formattedColourMode = validColourModes[ColourMode] || ColourMode;

  // Ensure ColourMode does not exceed the max length (e.g., 50 characters)
  const maxColourModeLength = 50;
  const truncatedColourMode = formattedColourMode.substring(0, maxColourModeLength);

  console.log("ColourMode before insert:", ColourMode);
  console.log("Formatted ColourMode:", formattedColourMode);
  console.log("Truncated ColourMode:", truncatedColourMode);

  // Validate required fields
  if (!DisplayName || !Email || !Status || IsOSPAdmin === undefined) {
    return res.status(400).json({
      message: "Required fields are missing: DisplayName, Email, Status, IsOSPAdmin.",
    });
  }

  try {
    const pool = await connectDB();

    // Insert user data into the database
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
      .input("ColourMode", sql.NVarChar, truncatedColourMode)
      .query(`
        INSERT INTO Users 
        (DisplayName, Email, IsOSPAdmin, Status, FunctionalUser, AdminUser, BlockAccess, O365Email, MFA_Mobile, ColourMode)
        VALUES 
        (@DisplayName, @Email, @IsOSPAdmin, @Status, @FunctionalUser, @AdminUser, @BlockAccess, @O365Email, @MFA_Mobile, @ColourMode)
      `);

    console.log("User created successfully");
    res.status(200).json({
      message: "User created successfully and database updated",
    });
  } catch (error) {
    console.error("Error inserting into DB:", error);
    res.status(500).json({
      message: "Failed to create user",
      error: error.message,
    });
  }
};

export { createUser };
