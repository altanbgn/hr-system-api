import { Document } from 'mongoose';

export interface Risk {
  risk: string;
  value: number;
}

export interface IUser {
  firstname: string;
  lastname: string;
  username: string;
  status: string;
  department: string;
  risks: Risk[];
  email: string;
  position: string;
  birthday: Date;
  dateJoined: Date;
  phone: number;
  password: string;
  isAdmin: boolean;
}

export interface IUserDocument extends IUser, Document {
  _id: string;
  generateAuthToken(): string;
  createdAt: Date;
  updatedAt: Date;
}