import { Document } from 'mongoose';

export interface IComment {
  content: string;
  taskId: string;
}

export interface ICommentDocument extends IComment, Document {
  _id: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}