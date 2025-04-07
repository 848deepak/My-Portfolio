import express from 'express';
import {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blog.controller';
import { protect, adminOnly } from '../middleware/auth';
import { check } from 'express-validator';

const router = express.Router();

// Blog validation
const blogValidation = [
  check('title', 'Title is required').not().isEmpty(),
  check('content', 'Content is required').not().isEmpty(),
  check('summary', 'Summary is required').not().isEmpty(),
  check('tags', 'At least one tag is required').isArray({ min: 1 }),
];

// Public routes
router.get('/', getBlogs);
router.get('/:id', getBlog);

// Protected routes (admin only)
router.post('/', [protect, adminOnly, ...blogValidation], createBlog);
router.put('/:id', [protect, adminOnly], updateBlog);
router.delete('/:id', [protect, adminOnly], deleteBlog);

export default router; 