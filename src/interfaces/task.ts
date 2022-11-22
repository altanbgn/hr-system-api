import { Document } from 'mongoose';

export interface ITask {
  name: string;
  content: string;
  status: string;
  comments: string[];
}

export interface ITaskDocument extends ITask, Document {
  _id: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}