import { Document } from 'mongoose';

export interface IDepartment {
  title: string;
  description: string;
  status: string;
}

export interface IDepartmentDocument extends IDepartment, Document {
  _id: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}