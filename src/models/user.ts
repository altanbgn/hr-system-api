import { Schema, Model, model } from 'mongoose';
import { IUserDocument } from '../interfaces';
import { sign } from 'jsonwebtoken';
import { getEnv } from '../utils';
import { USER_STATUS } from '../constants';

const userSchema = new Schema({
  firstname: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true,
  },
  lastname: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: USER_STATUS.ALL,
    default: USER_STATUS.UNVERIFIED,
    lowercase: true,
    required: true,
    trim: true,
  },
  position: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  dateJoined: {
    type: Date
  },
  phone: {
    type: Number,
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
  },
  reviews: {
    type: [Schema.Types.ObjectId],
    ref: 'Review',
    default: []
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 255,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true,
  }
});

userSchema.methods.generateAuthToken = function() {
  const user = {
    _id: this._id,
    firstname: this.firstname,
    lastname: this.lastname,
    username: this.username,
    email: this.email,
    isAdmin: this.isAdmin,
  }

  return sign(
    { user },
    getEnv({ name: 'JWT_TOKEN_SECRET' }),
    { expiresIn: '1d' }
  )
}

/**
 * Increases search speed, avoids in-memory sorting
 */
userSchema.index({
  firstname: 1,
  lastname: 1,
  email: 1,
  isAdmin: 1,
  createdAt: 1,
  updatedAt: 1
})

export const UserModel: Model<IUserDocument> = model<IUserDocument>('User', userSchema);