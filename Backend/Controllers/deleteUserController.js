import slq from "mssql"
import { connectDB } from "../DatabaseConnection/databaseConnection.js"

const deleteUser = async(req, res)=>{
const{userID} = req.params

try {
    const pool = await connectDB()
    const result = await pool .request()
    .input("UserID", slq.Int, userID )  
    .query("DELETE FROM Users WHERE UserID=@UserID")

    if(result.rowsAffected[0]===0){
        return res.status(404).json({message:"User not found"})
    }
    res.status(200).json({message:"User deleted succcessfully"})
} catch (error) {
    console.log("Error deleting data:", error)
    res.status(500).json({message:"Failed to delete user", error:error.message})
}
}

export{deleteUser}