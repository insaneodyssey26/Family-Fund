import { z } from 'zod';

// User schema validation using Zod
export const UserSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(2),
    role: z.enum(['user', 'admin']).default('user'),
    created_at: z.date(),
    updated_at: z.date(),
});

// TypeScript type generated from the schema
export type User = z.infer<typeof UserSchema>;

// Schema for user registration
export const UserRegistrationSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(2),
});

export type UserRegistration = z.infer<typeof UserRegistrationSchema>;

// Schema for user login
export const UserLoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export type UserLogin = z.infer<typeof UserLoginSchema>;

// Schema for user response (without sensitive data)
export const UserResponseSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    name: z.string(),
    role: z.enum(['user', 'admin']),
    created_at: z.date(),
    updated_at: z.date(),
});

export type UserResponse = z.infer<typeof UserResponseSchema>;

export const CreateUserSchema = UserSchema.omit({
    id: true,
    created_at: true,
    updated_at: true
});

export const UpdateUserSchema = CreateUserSchema.partial();

export const LoginUserSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
export type LoginUserDto = z.infer<typeof LoginUserSchema>; 