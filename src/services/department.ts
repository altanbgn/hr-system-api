import {
  DepartmentModel
} from '../models';
import {
  departmentCreationValidators,
  departmentUpdateValidators
} from '../validations';
import { paginate, escapeRegExp } from '../utils';

export default class DepartmentServices {
  /**
   * Search and get department
   * @param id 
   * @returns Found department object
   */
  public static async getOne(id: string) {
    return await DepartmentModel.findById(id);
  }

  /**
   * Get all departments filtered by query object
   * @param query 
   * @returns Found departments
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

    const result: any = await paginate(
      DepartmentModel
        .find(filter)
        .sort({ updatedAt: -1 }),
      query
    );

    const resultCount: number = await DepartmentModel.count();

    return {
      departments: result,
      total: resultCount,
      size: result.length
    }
  }

  /**
   * Create new department
   * @param userId 
   * @param data 
   * @returns Created department data in object
   */
  public static async create(userId: string, data: any) {
    await departmentCreationValidators(data);

    return await DepartmentModel.create({
      ...data,
      createdBy: userId,
      updatedBy: userId
    })
  }

  /**
   * Update department
   * @param id 
   * @param userId 
   * @param data 
   * @returns updated product data in object
   */
  public static async update(id: string, userId: string, data: any) {
    await departmentUpdateValidators(data);

    await DepartmentModel.findByIdAndUpdate(
      id,
      { $set: {
        ...data,
        updatedBy: userId
      }}
    )

    return await DepartmentModel.findById(id);
  }

  /**
   * Delete department
   * @param id
   * @returns whatever deleteOne returns
   */
  public static async delete(id: string) {
    return await DepartmentModel.findByIdAndDelete(id);
  }
}