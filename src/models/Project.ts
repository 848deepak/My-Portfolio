import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  category: string;
  featured: boolean;
  createdAt: Date;
}

const ProjectSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
  },
  technologies: {
    type: [String],
    required: [true, 'At least one technology is required'],
  },
  imageUrl: {
    type: String,
  },
  githubUrl: {
    type: String,
  },
  liveUrl: {
    type: String,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['web', 'mobile', 'hardware', 'ai', 'other'],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IProject>('Project', ProjectSchema); 