import sql from "mssql";
import dotenv from "dotenv";

dotenv.config({ path: "../../config/.env" });

const dbConfig = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true, // For Azure SQL
    trustServerCertificate: false, // Use this only if you're not using a trusted certificate
  },
};

const connectDB = async () => {
  try {
    const pool = await sql.connect(dbConfig); // Establish the connection
    console.log("✅ Connected to Azure SQL Database");
    return pool; // Return the connection pool
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    throw error;
  }
};

export { connectDB };
