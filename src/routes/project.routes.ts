import express from 'express';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/project.controller';
import { protect, adminOnly } from '../middleware/auth';
import { check } from 'express-validator';

const router = express.Router();

// Project validation
const projectValidation = [
  check('title', 'Title is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('technologies', 'At least one technology is required').isArray({ min: 1 }),
  check('category', 'Category is required').not().isEmpty(),
];

// Public routes
router.get('/', getProjects);
router.get('/:id', getProject);

// Protected routes (admin only)
router.post('/', [protect, adminOnly, ...projectValidation], createProject);
router.put('/:id', [protect, adminOnly], updateProject);
router.delete('/:id', [protect, adminOnly], deleteProject);

export default router; 