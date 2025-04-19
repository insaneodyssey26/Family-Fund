import { z } from 'zod';

export const CategorySchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(2),
    description: z.string().optional(),
    image_url: z.string().url().optional(),
    created_at: z.date(),
    updated_at: z.date()
});

export const CreateCategorySchema = CategorySchema.omit({
    id: true,
    created_at: true,
    updated_at: true
});

export const UpdateCategorySchema = CreateCategorySchema.partial();

export type Category = z.infer<typeof CategorySchema>;
export type CreateCategoryDto = z.infer<typeof CreateCategorySchema>;
export type UpdateCategoryDto = z.infer<typeof UpdateCategorySchema>; 