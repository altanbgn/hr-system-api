import { Document } from 'mongoose';

export interface IRisk {
  name: string;
  key: string;
}

export interface IRiskDocument extends IRisk, Document {
  _id: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}