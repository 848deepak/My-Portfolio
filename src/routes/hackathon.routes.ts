import express from 'express';
import {
  getHackathons,
  getHackathon,
  createHackathon,
  updateHackathon,
  deleteHackathon,
} from '../controllers/hackathon.controller';
import { protect, adminOnly } from '../middleware/auth';
import { check } from 'express-validator';

const router = express.Router();

// Hackathon validation
const hackathonValidation = [
  check('title', 'Title is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('date', 'Date is required').not().isEmpty(),
  check('location', 'Location is required').not().isEmpty(),
  check('role', 'Your role is required').not().isEmpty(),
  check('technologies', 'At least one technology is required').isArray({ min: 1 }),
  check('outcome', 'Outcome is required').not().isEmpty(),
];

// Public routes
router.get('/', getHackathons);
router.get('/:id', getHackathon);

// Protected routes (admin only)
router.post('/', [protect, adminOnly, ...hackathonValidation], createHackathon);
router.put('/:id', [protect, adminOnly], updateHackathon);
router.delete('/:id', [protect, adminOnly], deleteHackathon);

export default router; 