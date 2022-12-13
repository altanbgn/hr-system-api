import { Document } from 'mongoose';

export interface IUser {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  status: string;
  position: string;
  birthday: Date;
  dateJoined: Date;
  phone: number;
  password: string;
  department: string;
  reviews: string[];
  isAdmin: boolean;
}

export interface IUserDocument extends IUser, Document {
  _id: string;
  generateAuthToken(): string;
  createdAt: Date;
  updatedAt: Date;
}