import { ReviewModel } from '../models';
import {
  reviewCreationValidators,
  reviewUpdateValidators
} from '../validations';
import { paginate } from '../utils';

export default class ReviewServices {
  /**
   * Search and get review
   * @param id
   * @returns Found review object
   */
  public static async getOne(id: string) {
    return await ReviewModel.findById(id).populate('task');
  }

  /**
   * Get all reviews filtered by query object
   * @param query 
   * @returns Found reviews
   */
  public static async getAll(query: any) {
    const { userId } = query;

    let filter: any = {}

    if (!userId) throw new Error('User ID required!');
    
    filter.user = userId;

    const result: any = await paginate(
      ReviewModel
        .find(filter)
        .sort({ updatedAt: -1 }),
      query
    );

    const resultCount: number = await ReviewModel.count();

    return {
      reviews: result,
      total: resultCount,
      size: result.length
    }
  }

  /**
   * Create new review
   * @param userId 
   * @param data 
   * @returns Created review data in object
   */
  public static async create(userId: string, data: any) {
    await reviewCreationValidators(data);

    return await ReviewModel.create({
      ...data,
      createdBy: userId,
      updatedBy: userId
    })
  }

  /**
   * Update review
   * @param id 
   * @param userId 
   * @param data 
   * @returns updated review in object
   */
  public static async update(id: string, userId: string, data: any) {
    await reviewUpdateValidators(data);

    await ReviewModel.findByIdAndUpdate(
      id,
      { $set: {
        ...data,
        updatedBy: userId
      }}
    )

    return await ReviewModel.findById(id);
  }

  /**
   * Delete review
   * @param id
   * @returns whatever deleteOne returns
   */
  public static async delete(id: string) {
    // Deletes review
    return await ReviewModel.findByIdAndDelete(id);
  }
}