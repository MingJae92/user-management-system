import sql from "mssql";

const getUsersFromDatabase = async () => {
  try {
    const pool = await sql.connect({
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      server: process.env.DB_SERVER,
      database: process.env.DB_DATABASE,
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    });

    const result = await pool.request().query("SELECT * FROM Users");
    return result.recordset;
  } catch (error) {
    console.error("Error fetching users from database:", error);
    throw error;
  }
};

export default getUsersFromDatabase;
