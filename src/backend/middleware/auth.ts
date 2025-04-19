import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';

const authService = new AuthService();

export interface AuthRequest extends Request {
    user?: any;
}

export const authenticate = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'Access denied. No token provided.',
            });
        }

        const user = await authService.verifyToken(token);
        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Invalid token.',
            });
        }

        // Add user to request object
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            error: 'Invalid token.',
        });
    }
}; 