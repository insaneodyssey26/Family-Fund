import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
});

async function testConnection() {
    try {
        const client = await pool.connect();
        console.log('Successfully connected to PostgreSQL database!');
        client.release();
    } catch (error) {
        console.error('Error connecting to the database:', error);
    } finally {
        await pool.end();
    }
}

testConnection(); 