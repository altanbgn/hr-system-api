import { compare, genSalt, hash } from 'bcryptjs';
import { UserModel } from '../models';
import {
  loginValidators,
  registerValidators
} from '../validations';

export default class AuthServices {
  /**
   * User login
   * @param data should include username or email with password
   * @returns newly generated token
   */
  public static async login(data: any) {
    await loginValidators(data);

    const currentUser = await UserModel.findOne({ email: data.email });

    if (!currentUser)
      throw new Error('Invalid email or password!');
    
    const validPassword = await compare(data.password, currentUser.password);

    if (!validPassword)
      throw new Error('Invalid email or password!');

    return currentUser.generateAuthToken();
  }

  /**
   * Creates new user
   * @param data
   * @returns literally nothing
   */
  public static async register(data: any) {
    await registerValidators(data);

    let user = await UserModel.findOne({ email: data.email });

    if (user)
      throw new Error('User already exists!');

    const salt = await genSalt(10);
    data.password = await hash(data.password, salt);
      
    await UserModel.create(data);
  }
}