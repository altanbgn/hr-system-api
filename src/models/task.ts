import { Schema, Model, model } from 'mongoose';
import { ITaskDocument } from '../interfaces';
import { DEPARTMENT_STATUS, TASK_TYPES } from '../constants';

const taskSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true,
  },
  content: {
    type: String,
    minlength: 3,
    maxlength: 1024,
    required: true,
  },
  status: {
    type: String,
    enum: DEPARTMENT_STATUS.ALL,
    default: DEPARTMENT_STATUS.ACTIVE,
    lowercase: true,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: TASK_TYPES.ALL,
    default: TASK_TYPES.TODO,
    lowercase: true,
    required: true,
    trim: true,
  },
  assignees: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    unique: true
  }],

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
taskSchema.index({
  name: 1,
  status: 1,
  type: 1,
  createdAt: 1,
  updatedAt: 1,
})

export const TaskModel: Model<ITaskDocument> = model<ITaskDocument>('Task', taskSchema);