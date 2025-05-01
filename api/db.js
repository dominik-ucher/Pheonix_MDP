import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2';

export const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // socketPath: "/var/run/mysqld/mysqld.sock",
    connectionLimit: 20,     // Max 10 connections at a time
    queueLimit: 0,
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database successfully!');
    }
});