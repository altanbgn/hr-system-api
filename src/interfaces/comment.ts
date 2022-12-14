import { Document } from 'mongoose';

export interface IComment {
  content: string;
  task: string;
}

export interface ICommentDocument extends IComment, Document {
  _id: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}