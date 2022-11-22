import Joi from 'joi';

const passwordRegex = new RegExp('^[a-zA-Z0-9!@#$%^&*()]{8,255}$')

export async function loginValidators(data: any) {
  try {
    const schema = Joi.object({
      email: Joi
        .string()
        .min(5)
        .max(255)
        .email()
        .required(),
  
      password: Joi
        .string()
        .min(8)
        .max(255)
        .pattern(passwordRegex)
        .required(),
    });
    
    return await schema.validateAsync(data);
  } catch (error: any) {
    throw new Error(`${error.name}: ${error.message}`)
  }
}

export async function registerValidators(data: any) {
  try {
    const schema = Joi.object({
      firstname: Joi
        .string()
        .min(3)
        .max(255)
        .required(),
  
      lastname: Joi
        .string()
        .min(3)
        .max(255)
        .required(),

      username: Joi
        .string()
        .min(3)
        .max(255)
        .required(),
  
      email: Joi
        .string()
        .min(5)
        .max(255)
        .email()
        .required(),

      password: Joi
        .string()
        .min(8)
        .max(255)
        .pattern(passwordRegex)
        .required(),
    })
  
    return await schema.validateAsync(data);
  } catch (error: any) {
    throw new Error(`${error.name}: ${error.message}`)
  }
}