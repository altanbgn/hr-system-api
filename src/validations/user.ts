import Joi from 'joi';

const userSchema = {
  firstname: Joi
    .string()
    .min(3)
    .max(255),

  lastname: Joi
    .string()
    .min(3)
    .max(255),

  username: Joi
    .string(),

  email: Joi
    .string(),

  status: Joi
    .string(),

  position: Joi
    .string(),

  birthday: Joi
    .date(),
  
  dateJoined: Joi
    .date(),
  
  phone: Joi
    .number(),

  department: Joi
    .string(),

  reviews: Joi
    .array()
    .items(Joi.string()),
};

export async function userUpdateValidators(data: any) {
  try {
    const userUpdateSchema = { ...userSchema };
    const schema = Joi.object(userUpdateSchema);
  
    return await schema.validateAsync(data);
  } catch (error: any) {
    throw new Error(`${error.name}: ${error.message}`)
  } 
}