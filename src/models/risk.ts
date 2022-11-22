import { Schema, Model, model } from 'mongoose';
import { IRiskDocument } from '../interfaces';

const riskSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true,
  },
  key: {
    type: String,
    minlength: 3,
    maxlength: 255,
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
riskSchema.index({
  name: 1,
  createdAt: 1,
  updatedAt: 1,
})

export const RiskModel: Model<IRiskDocument> = model<IRiskDocument>('Risk', riskSchema);