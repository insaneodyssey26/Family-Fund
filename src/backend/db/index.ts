import { Pool } from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

// Create a connection pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
});

// Initialize database
async function initializeDatabase() {
    try {
        const client = await pool.connect();
        console.log('Connected to PostgreSQL database');

        // Read and execute initialization SQL
        const initSql = fs.readFileSync(
            path.join(__dirname, 'init.sql'),
            'utf-8'
        );

        await client.query(initSql);
        console.log('Database initialized successfully');
        client.release();
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
}

// Test database connection
pool.on('connect', () => {
    console.log('Database pool connected');
});

pool.on('error', (err) => {
    console.error('Unexpected database error:', err);
});

export { pool, initializeDatabase }; 