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

    // Query to fetch all users from the Users table (replace 'Users' with your actual table name)
    // const result = await sql.query("SELECT * FROM Users");

    // console.log("Fetched Users from Users table:", result.recordset);

    // // Query to get SQL Server users
    // const sqlUsers = await sql.query("SELECT name FROM sys.database_principals WHERE type = 'S' AND name <> 'dbo'");

    // console.log("Fetched SQL Server Users:", sqlUsers.recordset);

    // return {
    //   appUsers: result.recordset, // application users
    //   sqlUsers: sqlUsers.recordset, // SQL Server users
    // };

  } catch (error) {
    console.error("Database connection failed ❌", error);
    throw error;
  }
};

export default connectDB;
