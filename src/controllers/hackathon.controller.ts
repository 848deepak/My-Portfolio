import { Request, Response } from 'express';
import Hackathon, { IHackathon } from '../models/Hackathon';
import { validationResult } from 'express-validator';

// @desc    Get all hackathons
// @route   GET /api/hackathons
// @access  Public
export const getHackathons = async (req: Request, res: Response) => {
  try {
    const hackathons = await Hackathon.find().sort({ date: -1 });
    
    res.status(200).json({
      success: true,
      count: hackathons.length,
      data: hackathons,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @desc    Get single hackathon
// @route   GET /api/hackathons/:id
// @access  Public
export const getHackathon = async (req: Request, res: Response) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id);
    
    if (!hackathon) {
      return res.status(404).json({
        success: false,
        error: 'Hackathon not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: hackathon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @desc    Create new hackathon
// @route   POST /api/hackathons
// @access  Private (Admin only)
export const createHackathon = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  
  try {
    const hackathon = await Hackathon.create(req.body);
    
    res.status(201).json({
      success: true,
      data: hackathon,
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      const messages = Object.values(error as any).map((val: any) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @desc    Update hackathon
// @route   PUT /api/hackathons/:id
// @access  Private (Admin only)
export const updateHackathon = async (req: Request, res: Response) => {
  try {
    let hackathon = await Hackathon.findById(req.params.id);
    
    if (!hackathon) {
      return res.status(404).json({
        success: false,
        error: 'Hackathon not found',
      });
    }
    
    hackathon = await Hackathon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    
    res.status(200).json({
      success: true,
      data: hackathon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @desc    Delete hackathon
// @route   DELETE /api/hackathons/:id
// @access  Private (Admin only)
export const deleteHackathon = async (req: Request, res: Response) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id);
    
    if (!hackathon) {
      return res.status(404).json({
        success: false,
        error: 'Hackathon not found',
      });
    }
    
    await hackathon.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
}; 