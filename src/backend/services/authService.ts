import { User, UserRegistration, UserLogin, UserResponse } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../config/database';

// In a real application, this would be in a secure environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export class AuthService {
    // Register a new user
    async register(userData: UserRegistration): Promise<UserResponse> {
        const client = await pool.connect();
        try {
            // Check if user already exists
            const existingUser = await client.query(
                'SELECT id FROM users WHERE email = $1',
                [userData.email]
            );

            if (existingUser.rows.length > 0) {
                throw new Error('User already exists');
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(userData.password, salt);

            // Create new user
            const result = await client.query(
                `INSERT INTO users (email, password, name, role)
                 VALUES ($1, $2, $3, $4)
                 RETURNING id, email, name, role, created_at`,
                [userData.email, hashedPassword, userData.name, 'user']
            );

            return result.rows[0];
        } finally {
            client.release();
        }
    }

    // Login user
    async login(credentials: UserLogin): Promise<{ token: string; user: UserResponse }> {
        const client = await pool.connect();
        try {
            // Find user
            const result = await client.query(
                'SELECT id, email, password, name, role FROM users WHERE email = $1',
                [credentials.email]
            );

            if (result.rows.length === 0) {
                throw new Error('Invalid credentials');
            }

            const user = result.rows[0];

            // Verify password
            const isValidPassword = await bcrypt.compare(credentials.password, user.password);
            if (!isValidPassword) {
                throw new Error('Invalid credentials');
            }

            // Generate JWT token
            const token = this.generateToken(user);

            // Return token and user without password
            const { password, ...userWithoutPassword } = user;
            return { token, user: userWithoutPassword };
        } finally {
            client.release();
        }
    }

    // Generate JWT token
    private generateToken(user: User): string {
        return jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role,
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );
    }

    // Verify JWT token
    async verifyToken(token: string): Promise<UserResponse | null> {
        try {
            const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
            const client = await pool.connect();
            try {
                const result = await client.query(
                    'SELECT id, email, name, role FROM users WHERE id = $1',
                    [decoded.id]
                );

                if (result.rows.length === 0) {
                    return null;
                }

                return result.rows[0];
            } finally {
                client.release();
            }
        } catch (error) {
            return null;
        }
    }
} 