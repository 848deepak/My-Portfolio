import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  content: string;
  summary: string;
  tags: string[];
  imageUrl?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Blog title is required'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Blog content is required'],
  },
  summary: {
    type: String,
    required: [true, 'Blog summary is required'],
  },
  tags: {
    type: [String],
    required: [true, 'At least one tag is required'],
  },
  imageUrl: {
    type: String,
  },
  published: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before save
BlogSchema.pre<IBlog>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model<IBlog>('Blog', BlogSchema); 