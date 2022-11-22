import { Schema, Model, model } from 'mongoose';
import { IDepartmentDocument } from '../interfaces';
import { DEPARTMENT_STATUS } from '../constants';

const departmentSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true,
  },
  description: {
    type: String,
    minlength: 3,
    maxlength: 255,
  },
  status: {
    type: String,
    enum: DEPARTMENT_STATUS.ALL,
    default: DEPARTMENT_STATUS.ACTIVE,
    lowercase: true,
    required: true,
    trim: true,
  },

  /**
   * Interacted user
   */
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true,
  }
});

/**
 * Increases search speed, avoids in-memory sorting
 */
departmentSchema.index({
  name: 1,
  status: 1,
  createdAt: 1,
  updatedAt: 1,
})

export const DepartmentModel: Model<IDepartmentDocument> = model<IDepartmentDocument>('Department', departmentSchema);