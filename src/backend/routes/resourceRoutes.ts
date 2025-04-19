import { Router } from 'express';
import { ResourceController } from '../controllers/resourceController';
import { authenticate } from '../middleware/auth';

const router = Router();
const resourceController = new ResourceController();

// Public routes
router.get('/', resourceController.getAllResources.bind(resourceController));
router.get('/category/:category', resourceController.getResourcesByCategory.bind(resourceController));
router.get('/search', resourceController.searchResources.bind(resourceController));
router.get('/:id', resourceController.getResourceById.bind(resourceController));

// Protected routes (require authentication)
router.post('/', authenticate, resourceController.createResource.bind(resourceController));
router.put('/:id', authenticate, resourceController.updateResource.bind(resourceController));
router.delete('/:id', authenticate, resourceController.deleteResource.bind(resourceController));

export default router; 