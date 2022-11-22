import { TaskModel, CommentModel } from '../models';
import {
  taskCreationValidators,
  taskUpdateValidators
} from '../validations';
import { paginate, escapeRegExp } from '../utils';

export default class TaskServices {
  /**
   * Search and get task
   * @param id
   * @returns Found task object
   */
  public static async getOne(id: string) {
    return await TaskModel.findById(id).populate('assignees');
  }

  /**
   * Get all tasks filtered by query object
   * @param query 
   * @returns Found tasks
   */
  public static async getAll(query: any) {
    const { search } = query;

    let filter: any = {}

    if (search)
      filter['$or'] = [
        {
          firstname: { $in: [new RegExp(`.*${escapeRegExp(search)}.*`, 'i')] }
        },
        {
          lastname: { $in: [new RegExp(`.*${escapeRegExp(search)}.*`, 'i')] }
        },
        {
          username: { $in: [new RegExp(`.*${escapeRegExp(search)}.*`, 'i')] }
        },
      ]

    const result: any = await 
      TaskModel
        .find(filter)
        .sort({ updatedAt: -1 })

    const resultCount: number = await TaskModel.count();

    return {
      tasks: result,
      total: resultCount,
      size: result.length
    }
  }

  /**
   * Create new task
   * @param userId 
   * @param data 
   * @returns Created task data in object
   */
  public static async create(userId: string, data: any) {
    await taskCreationValidators(data);

    return await TaskModel.create({
      ...data,
      createdBy: userId,
      updatedBy: userId
    })
  }

  /**
   * Update task
   * @param id 
   * @param userId 
   * @param data 
   * @returns updated task in object
   */
  public static async update(id: string, userId: string, data: any) {
    await taskUpdateValidators(data);

    await TaskModel.findByIdAndUpdate(
      id,
      { $set: {
        ...data,
        updatedBy: userId
      }}
    )

    return await TaskModel.findById(id);
  }

  /**
   * Delete task
   * @param id
   * @returns whatever deleteOne returns
   */
  public static async delete(id: string) {
    await CommentModel.deleteMany({ task: id });

    return await TaskModel.findByIdAndDelete(id);
  }
}