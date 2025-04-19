import { pool } from '../db';
import { User, CreateUserDto, UpdateUserDto } from '../models/User';
import bcrypt from 'bcryptjs';

export class UserService {
    async createUser(userData: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const result = await pool.query(
            `INSERT INTO users (email, password, name, role)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [userData.email, hashedPassword, userData.name, userData.role || 'user']
        );

        return result.rows[0];
    }

    async getUserById(id: string): Promise<User | null> {
        const result = await pool.query(
            'SELECT * FROM users WHERE id = $1',
            [id]
        );

        return result.rows[0] || null;
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        return result.rows[0] || null;
    }

    async updateUser(id: string, userData: UpdateUserDto): Promise<User | null> {
        const fields: string[] = [];
        const values: any[] = [];
        let paramCount = 1;

        Object.entries(userData).forEach(([key, value]) => {
            if (value !== undefined) {
                fields.push(`${key} = $${paramCount}`);
                values.push(value);
                paramCount++;
            }
        });

        if (fields.length === 0) return null;

        values.push(id);
        const query = `
            UPDATE users
            SET ${fields.join(', ')}
            WHERE id = $${paramCount}
            RETURNING *
        `;

        const result = await pool.query(query, values);
        return result.rows[0] || null;
    }

    async deleteUser(id: string): Promise<boolean> {
        const result = await pool.query(
            'DELETE FROM users WHERE id = $1 RETURNING id',
            [id]
        );

        return result.rowCount ? result.rowCount > 0 : false;
    }

    async validatePassword(user: User, password: string): Promise<boolean> {
        return bcrypt.compare(password, user.password);
    }
} 