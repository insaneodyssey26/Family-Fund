import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { UserRegistrationSchema, UserLoginSchema, CreateUserDto, UserSchema } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

const authService = new AuthService();

// Types and Interfaces
interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    role: 'user' | 'admin';
    createdAt: Date;
}

// Extend Express Request to include cookies
interface AuthRequest extends Request {
    cookies: {
        token?: string;
    };
}

// Validation Schemas
const registerSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    name: z.string().min(2, 'Name must be at least 2 characters'),
});

const loginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string(),
});

// Temporary user storage (replace with database)
const users: User[] = [];

// Helper Functions
const generateToken = (userId: string): string => {
    return jwt.sign({ userId }, process.env.JWT_SECRET || 'your-secret-key', {
        expiresIn: '24h',
    });
};

const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

// Register new user
export const register = async (req: Request, res: Response) => {
    try {
        const validationResult = registerSchema.safeParse(req.body);

        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                errors: validationResult.error.errors,
            });
        }

        const { email, password, name } = validationResult.data;

        // Check if user already exists
        if (users.some(user => user.email === email)) {
            return res.status(409).json({
                success: false,
                message: 'User already exists',
            });
        }

        const hashedPassword = await hashPassword(password);

        const newUser: User = {
            id: uuidv4(),
            email,
            password: hashedPassword,
            name,
            role: 'user',
            createdAt: new Date(),
        };

        users.push(newUser);

        const token = generateToken(newUser.id);

        res.status(201).json({
            success: true,
            token,
            user: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                role: newUser.role,
            },
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// Login user
export const login = async (req: Request, res: Response) => {
    try {
        const validationResult = loginSchema.safeParse(req.body);

        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                errors: validationResult.error.errors,
            });
        }

        const { email, password } = validationResult.data;

        const user = users.find(u => u.email === email);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        const token = generateToken(user.id);

        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// Get current user
export const getCurrentUser = async (req: AuthRequest, res: Response) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'Not authenticated',
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { userId: string };
        const user = users.find(u => u.id === decoded.userId);

        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Invalid token',
            });
        }

        res.status(200).json({
            success: true,
            data: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        });
    }
}; 