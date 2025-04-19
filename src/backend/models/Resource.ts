import { z } from 'zod';

// Resource schema validation using Zod
export const ResourceSchema = z.object({
    id: z.string().uuid(),
    title: z.string().min(3),
    description: z.string().optional(),
    category: z.string(),
    image_url: z.string().url().optional(),
    author_id: z.string().uuid(),
    content: z.string().optional(),
    duration: z.number().int().positive().optional(),
    difficulty_level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    created_at: z.date(),
    updated_at: z.date()
});

// TypeScript type generated from the schema
export type Resource = z.infer<typeof ResourceSchema>;

// Schema for creating a new resource
export const CreateResourceSchema = ResourceSchema.omit({
    id: true,
    created_at: true,
    updated_at: true
});

export type CreateResourceDto = z.infer<typeof CreateResourceSchema>;

// Schema for updating a resource
export const UpdateResourceSchema = CreateResourceSchema.partial();

export type UpdateResourceDto = z.infer<typeof UpdateResourceSchema>;

// Schema for resource response (without sensitive data)
export const ResourceResponseSchema = ResourceSchema.omit({
    author_id: true,
});

export type ResourceResponse = z.infer<typeof ResourceResponseSchema>; 