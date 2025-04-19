import { pool } from '../db';
import { Resource, CreateResourceDto, UpdateResourceDto } from '../models/Resource';

export class ResourceService {
    async createResource(resourceData: CreateResourceDto, authorId: string): Promise<Resource> {
        const result = await pool.query(
            `INSERT INTO resources (
                title, description, category, image_url, 
                author_id, content, duration, difficulty_level
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *`,
            [
                resourceData.title,
                resourceData.description,
                resourceData.category,
                resourceData.image_url,
                authorId,
                resourceData.content,
                resourceData.duration,
                resourceData.difficulty_level
            ]
        );

        return result.rows[0];
    }

    async getResourceById(id: string): Promise<Resource | null> {
        const result = await pool.query(
            'SELECT * FROM resources WHERE id = $1',
            [id]
        );

        return result.rows[0] || null;
    }

    async getAllResources(): Promise<Resource[]> {
        const result = await pool.query('SELECT * FROM resources ORDER BY created_at DESC');
        return result.rows;
    }

    async getResourcesByCategory(category: string): Promise<Resource[]> {
        const result = await pool.query(
            'SELECT * FROM resources WHERE category = $1 ORDER BY created_at DESC',
            [category]
        );
        return result.rows;
    }

    async getResourcesByAuthor(authorId: string): Promise<Resource[]> {
        const result = await pool.query(
            'SELECT * FROM resources WHERE author_id = $1 ORDER BY created_at DESC',
            [authorId]
        );
        return result.rows;
    }

    async updateResource(id: string, resourceData: UpdateResourceDto, authorId: string): Promise<Resource | null> {
        const fields: string[] = [];
        const values: any[] = [];
        let paramCount = 1;

        Object.entries(resourceData).forEach(([key, value]) => {
            if (value !== undefined) {
                fields.push(`${key} = $${paramCount}`);
                values.push(value);
                paramCount++;
            }
        });

        if (fields.length === 0) return null;

        values.push(id);
        values.push(authorId);
        const query = `
            UPDATE resources
            SET ${fields.join(', ')}
            WHERE id = $${paramCount} AND author_id = $${paramCount + 1}
            RETURNING *
        `;

        const result = await pool.query(query, values);
        return result.rows[0] || null;
    }

    async deleteResource(id: string, authorId: string): Promise<boolean> {
        const result = await pool.query(
            'DELETE FROM resources WHERE id = $1 AND author_id = $2 RETURNING id',
            [id, authorId]
        );

        return result.rowCount ? result.rowCount > 0 : false;
    }

    async searchResources(searchTerm: string): Promise<Resource[]> {
        const result = await pool.query(
            `SELECT * FROM resources 
             WHERE title ILIKE $1 
             OR description ILIKE $1 
             OR content ILIKE $1
             ORDER BY created_at DESC`,
            [`%${searchTerm}%`]
        );
        return result.rows;
    }
}