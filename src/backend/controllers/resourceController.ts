import { Request, Response } from 'express';
import { ResourceService } from '../services/resourceService';
import { CreateResourceSchema, UpdateResourceSchema } from '../models/Resource';

// Extend Express Request to include user
interface AuthRequest extends Request {
    user?: {
        id: string;
        role: string;
    };
}

const resourceService = new ResourceService();

export class ResourceController {
    // Create a new resource
    async createResource(req: AuthRequest, res: Response) {
        try {
            const validatedData = CreateResourceSchema.parse(req.body);
            const authorId = req.user?.id; // From auth middleware

            if (!authorId) {
                return res.status(401).json({
                    success: false,
                    error: 'Unauthorized',
                });
            }

            const resource = await resourceService.createResource(validatedData, authorId);
            res.status(201).json({
                success: true,
                data: resource,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error instanceof Error ? error.message : 'Invalid data',
            });
        }
    }

    // Get all resources
    async getAllResources(req: Request, res: Response) {
        try {
            const resources = await resourceService.getAllResources();
            res.json({
                success: true,
                data: resources,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Internal server error',
            });
        }
    }

    // Get resources by category
    async getResourcesByCategory(req: Request, res: Response) {
        try {
            const { category } = req.params;
            const resources = await resourceService.getResourcesByCategory(category);
            res.json({
                success: true,
                data: resources,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Internal server error',
            });
        }
    }

    // Get resource by ID
    async getResourceById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const resource = await resourceService.getResourceById(id);

            if (!resource) {
                return res.status(404).json({
                    success: false,
                    error: 'Resource not found',
                });
            }

            res.json({
                success: true,
                data: resource,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Internal server error',
            });
        }
    }

    // Update resource
    async updateResource(req: AuthRequest, res: Response) {
        try {
            const { id } = req.params;
            const validatedData = UpdateResourceSchema.parse(req.body);
            const authorId = req.user?.id;

            if (!authorId) {
                return res.status(401).json({
                    success: false,
                    error: 'Unauthorized',
                });
            }

            const resource = await resourceService.updateResource(id, validatedData, authorId);

            if (!resource) {
                return res.status(404).json({
                    success: false,
                    error: 'Resource not found or unauthorized',
                });
            }

            res.json({
                success: true,
                data: resource,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error instanceof Error ? error.message : 'Invalid data',
            });
        }
    }

    // Delete resource
    async deleteResource(req: AuthRequest, res: Response) {
        try {
            const { id } = req.params;
            const authorId = req.user?.id;

            if (!authorId) {
                return res.status(401).json({
                    success: false,
                    error: 'Unauthorized',
                });
            }

            const success = await resourceService.deleteResource(id, authorId);

            if (!success) {
                return res.status(404).json({
                    success: false,
                    error: 'Resource not found or unauthorized',
                });
            }

            res.json({
                success: true,
                message: 'Resource deleted successfully',
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Internal server error',
            });
        }
    }

    // Search resources
    async searchResources(req: Request, res: Response) {
        try {
            const { query } = req.query;

            if (!query || typeof query !== 'string') {
                return res.status(400).json({
                    success: false,
                    error: 'Search query is required',
                });
            }

            const resources = await resourceService.searchResources(query);
            res.json({
                success: true,
                data: resources,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Internal server error',
            });
        }
    }
} 