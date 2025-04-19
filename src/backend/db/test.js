const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'family_fund',
    password: 'XbrCwk8RwRZUutbDSEN7',
    port: 5432
});

async function testConnection() {
    try {
        const client = await pool.connect();
        console.log('Successfully connected to the database');

        const result = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
            ORDER BY table_name;
        `);

        console.log('\nAvailable tables:');
        result.rows.forEach(row => {
            console.log(`- ${row.table_name}`);
        });

        client.release();
        await pool.end();
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
}

testConnection(); 