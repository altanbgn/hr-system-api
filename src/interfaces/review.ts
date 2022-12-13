import { Document } from 'mongoose';

export interface IReview {
  content: string;
  risk: string;
}

export interface IReviewDocument extends IReview, Document {
  _id: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}