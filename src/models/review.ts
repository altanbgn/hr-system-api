import { Schema, Model, model } from 'mongoose';
import { IReviewDocument } from '../interfaces'

const reviewSchema = new Schema({
  content: {
    type: String,
    minlength: 3,
    maxlength: 1024,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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
reviewSchema.index({
  name: 1,
  createdAt: 1,
  updatedAt: 1,
})

export const ReviewModel: Model<IReviewDocument> = model<IReviewDocument>('Review', reviewSchema);