import dotenv from 'dotenv';
import mysql2 from 'mysql2';
dotenv.config();
const mysql = mysql2

const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "tareasproyectov1",
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Promisificar el pool para usar async/await
const promisePool = pool.promise();

(async () => {
    try {
        const connection = await promisePool.getConnection();
        console.log("✅ Conectado correctamente a MySQL");
        connection.release();
    } catch (err) {
        console.error("❌ Error conectando manualmente:", err);
    }
})();


export default promisePool;
