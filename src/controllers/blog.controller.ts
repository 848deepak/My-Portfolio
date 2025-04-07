import { Request, Response } from 'express';
import Blog, { IBlog } from '../models/Blog';
import { validationResult } from 'express-validator';

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
export const getBlogs = async (req: Request, res: Response) => {
  try {
    const { tag, published } = req.query;
    
    // Build query
    let query: any = {};
    
    if (tag) {
      query.tags = { $in: [tag] };
    }
    
    if (published === 'true') {
      query.published = true;
    } else if (published === 'false') {
      query.published = false;
    }
    
    const blogs = await Blog.find(query).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public
export const getBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        error: 'Blog not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @desc    Create new blog
// @route   POST /api/blogs
// @access  Private (Admin only)
export const createBlog = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  
  try {
    const blog = await Blog.create(req.body);
    
    res.status(201).json({
      success: true,
      data: blog,
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

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private (Admin only)
export const updateBlog = async (req: Request, res: Response) => {
  try {
    let blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        error: 'Blog not found',
      });
    }
    
    blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    
    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private (Admin only)
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        error: 'Blog not found',
      });
    }
    
    await blog.deleteOne();
    
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