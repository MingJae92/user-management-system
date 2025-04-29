import sql from "mssql"
import { connectDB } from "../DatabaseConnection/databaseConnection.js"

const updateUser = async()=>{
    const { UserID, DisplayName, Email, IsOSPAdmin, Status, FunctionalUser, AdminUser, BlockAccess, O365Email, MFA_Mobile, ColourMode } = req.body;
    try {
        const pool = await connectDB()
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
        UPDATE Users
        SET 
          DisplayName = @DisplayName,
          Email = @Email,
          IsOSPAdmin = @IsOSPAdmin,
          Status = @Status,
          FunctionalUser = @FunctionalUser,
          AdminUser = @AdminUser,
          BlockAccess = @BlockAccess,
          O365Email = @O365Email,
          MFA_Mobile = @MFA_Mobile,
          ColourMode = @ColourMode
        WHERE UserID = @UserID
      `);
      res.status(200).json({message:"User update successfully"})
    } catch (error) {
        console.log("Error updating user:", error)
        res.status(500).json({message:"Failed to update user:", error:error.message})
    }
}

export{updateUser}