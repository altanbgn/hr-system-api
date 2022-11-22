import { CommentModel } from '../models';
import {
  commentCreationValidators,
  commentUpdateValidators
} from '../validations';
import { paginate } from '../utils';

export default class CommentServices {
  /**
   * Search and get comment
   * @param id
   * @returns Found comment object
   */
  public static async getOne(id: string) {
    return await CommentModel.findById(id).populate('task');
  }

  /**
   * Get all comments filtered by query object
   * @param query 
   * @returns Found comments
   */
  public static async getAll(query: any) {
    const { taskId } = query;

    let filter: any = {}

    if (!taskId) throw new Error('Task ID required!');
    
    filter.task = taskId;

    const result: any = await paginate(
      CommentModel
        .find(filter)
        .sort({ updatedAt: -1 }),
      query
    );

    const resultCount: number = await CommentModel.count();

    return {
      comments: result,
      total: resultCount,
      size: result.length
    }
  }

  /**
   * Create new comment
   * @param userId 
   * @param data 
   * @returns Created comment data in object
   */
  public static async create(userId: string, data: any) {
    await commentCreationValidators(data);

    return await CommentModel.create({
      ...data,
      createdBy: userId,
      updatedBy: userId
    })
  }

  /**
   * Update comment
   * @param id 
   * @param userId 
   * @param data 
   * @returns updated comment in object
   */
  public static async update(id: string, userId: string, data: any) {
    await commentUpdateValidators(data);

    await CommentModel.findByIdAndUpdate(
      id,
      { $set: {
        ...data,
        updatedBy: userId
      }}
    )

    return await CommentModel.findById(id);
  }

  /**
   * Delete comment
   * @param id
   * @returns whatever deleteOne returns
   */
  public static async delete(id: string) {
    // Deletes comment
    return await CommentModel.findByIdAndDelete(id);
  }
}