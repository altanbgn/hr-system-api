import {
  RiskModel
} from '../models';
import {
  riskCreationValidators,
  riskUpdateValidators
} from '../validations';
import { paginate, escapeRegExp } from '../utils';

export default class RiskServices {
  /**
   * Search and get risk
   * @param id 
   * @returns Found risk object
   */
  public static async getOne(id: string) {
    return await RiskModel.findById(id);
  }

  /**
   * Get all risks filtered by query object
   * @param query 
   * @returns Found risks
   */
  public static async getAll(query: any) {
    const { search } = query;

    let filter: any = {}

    if (search)
      filter['$or'] = [
        {
          name: { $in: [new RegExp(`.*${escapeRegExp(search)}.*`, 'i')] }
        },
      ]

    const result: any = await paginate(
      RiskModel
        .find(filter)
        .sort({ updatedAt: -1 }),
      query
    );

    const resultCount: number = await RiskModel.count();

    return {
      risks: result,
      total: resultCount,
      size: result.length
    }
  }

  /**
   * Create new risk
   * @param userId 
   * @param data 
   * @returns Created risk data in object
   */
  public static async create(userId: string, data: any) {
    await riskCreationValidators(data);

    return await RiskModel.create({
      ...data,
      createdBy: userId,
      updatedBy: userId
    })
  }

  /**
   * Update risk
   * @param id 
   * @param userId 
   * @param data 
   * @returns updated product data in object
   */
  public static async update(id: string, userId: string, data: any) {
    await riskUpdateValidators(data);

    await RiskModel.findByIdAndUpdate(
      id,
      { $set: {
        ...data,
        updatedBy: userId
      }}
    )

    return await RiskModel.findById(id);
  }

  /**
   * Delete risk
   * @param id
   * @returns whatever deleteOne returns
   */
  public static async delete(id: string) {
    return await RiskModel.findByIdAndDelete(id);
  }
}