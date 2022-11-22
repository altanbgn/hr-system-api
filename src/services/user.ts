
import { compare, genSalt, hash } from 'bcryptjs';
import { decode } from 'jsonwebtoken';
import { UserModel } from '../models';
import { userUpdateValidators } from '../validations';
import { paginate, escapeRegExp } from '../utils';

export default class UserServices {
  /**
   * Get current user information
   * @param token
   * @returns Found user
   */
  public static async me(token: any) {
    const tokenData: any = decode(token);

    const result: any = await UserModel
      .findById(tokenData.user._id)
      .select('-password -__v')
      .populate('department')

    if (!result)
      throw new Error('User does not exist!');

    return result;
  }

  /**
   * Update user information
   * @param token
   * @param data New user information to update
   * @returns Updated user information
   */
  public static async updateMe(token: any, data: any) {
    const tokenData: any = decode(token);

    const currentUser: any = await UserModel
      .findById(tokenData.user._id)
    
    if (!currentUser)
      throw new Error('User does not exist!');

    await userUpdateValidators(data);

    return await UserModel
      .findByIdAndUpdate(tokenData.user._id, { $set: { ...data } })
      .select('-password -__v -_id');
  }

  /**
   * Change users password
   * @param token
   * @param oldPassword
   * @param newPassword
   * @returns response message
   */
  public static async changePassword(token: any, oldPassword: string, newPassword: string) {
    const tokenData: any = decode(token);

    const currentUser: any = await UserModel.findById(tokenData.user._id);

    if (!currentUser)
      throw new Error('User does not exist!');

    const validPassword = await compare(oldPassword, currentUser.password);

    if (!validPassword)
      throw new Error('Current password does not match!');

    const salt = await genSalt(10);
    const newHashedPassword = await hash(newPassword, salt);

    const result: any = await UserModel
      .findByIdAndUpdate(tokenData.user._id, { $set: { password: newHashedPassword } })
      .select('-password -__v -_id')

    return result;
  }

  /**
   * Get single user by user id
   * @param id
   * @returns found user object
   */
  public static async getOne(id: string) {
    return await UserModel.findById(id).populate('department').select('-password -__v');
  }

  /**
   * Get all users
   * @param query 
   * @returns found users
   */
  public static async getAll(query: any) {
    const { page, perPage, search } = query;

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
      UserModel
        .find(filter)
        .sort({ updatedAt: -1 })
        .populate('department')
        .select('-password -__v'),
      query
    );

    const resultCount = await UserModel.count();

    return {
      users: result,
      total: resultCount,
      size: result.length
    }
  }

  public static async update(id: string, userId: string, data: any) {
    await userUpdateValidators(data);

    await UserModel
      .findByIdAndUpdate(id, { $set: { ...data, updatedBy: userId } })
      .select('-password -__v -_id')

    return await UserModel.findById(id);
  }

  /**
   * Delete user
   * @param id
   * @returns whatever deleteone returns
   */
  public static async delete(id: string) {
    return await UserModel.findByIdAndDelete(id);
  }
}