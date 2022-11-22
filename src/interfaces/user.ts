import { Document } from 'mongoose';

export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface IUserDocument extends IUser, Document {
  _id: string;
  generateAuthToken(): string;
  createdAt: Date;
  updatedAt: Date;
}