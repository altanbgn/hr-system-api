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

  status: Joi
    .string(),

  position: Joi
    .string(),

  department: Joi
    .string(),

  risks: Joi
    .array()
    .items({
      risk: Joi.string(),
      value: Joi.number().min(0).max(100)
    }),

  email: Joi
    .string(),

  birthday: Joi
    .date(),

  dateJoined: Joi
    .date(),

  phone: Joi
    .number(),
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