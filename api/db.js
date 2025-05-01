import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2';

export const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    socketPath: "/var/run/mysqld/mysqld.sock",
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0,
});
