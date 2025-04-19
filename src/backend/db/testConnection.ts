import { pool } from '../config/database';

async function testConnection() {
    try {
        const client = await pool.connect();
        console.log('Successfully connected to the database');

        // Test query to list all tables
        const result = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);

        console.log('\nAvailable tables:');
        result.rows.forEach(row => {
            console.log(`- ${row.table_name}`);
        });

        client.release();
    } catch (err) {
        console.error('Error connecting to the database:', err);
    } finally {
        // Close the pool
        await pool.end();
    }
}

testConnection(); 