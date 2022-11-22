import { Schema, Model, model } from 'mongoose';
import { ICommentDocument } from '../interfaces'

const commentSchema = new Schema({
  content: {
    type: String,
    minlength: 3,
    maxlength: 1024,
    required: true,
  },
  task: {
    type: Schema.Types.ObjectId,
    ref: 'Task',
    required: true,
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
commentSchema.index({
  name: 1,
  createdAt: 1,
  updatedAt: 1,
})

export const CommentModel: Model<ICommentDocument> = model<ICommentDocument>('Comment', commentSchema);