import mongoose, { Schema, Document } from 'mongoose';

export interface IHackathon extends Document {
  title: string;
  description: string;
  date: Date;
  location: string;
  role: string;
  team?: string[];
  technologies: string[];
  outcome: string;
  imageUrl?: string;
  projectUrl?: string;
  createdAt: Date;
}

const HackathonSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Hackathon title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Hackathon description is required'],
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
  },
  role: {
    type: String,
    required: [true, 'Your role is required'],
  },
  team: {
    type: [String],
  },
  technologies: {
    type: [String],
    required: [true, 'At least one technology is required'],
  },
  outcome: {
    type: String,
    required: [true, 'Outcome is required'],
  },
  imageUrl: {
    type: String,
  },
  projectUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IHackathon>('Hackathon', HackathonSchema); 