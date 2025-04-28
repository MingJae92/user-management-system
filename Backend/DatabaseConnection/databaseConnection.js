import sql from "mssql";
import dotenv from "dotenv";

dotenv.config({ path: "../../config/.env" });

const dbConfig = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
};

const connectDB = async () => {
  try {
    await sql.connect(dbConfig);
    console.log("Connected to Azure SQL Database ✅");

    // Simple test query after connection
    const result = await sql.query("SELECT 1+1 AS solution");
    console.log("Test Query Result:", result.recordset[0].solution);

  } catch (error) {
    console.error("Database connection failed ❌", error);
    throw error;
  }
};

export default connectDB;
