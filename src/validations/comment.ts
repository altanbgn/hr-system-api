import Joi from 'joi';

export async function commentCreationValidators(data: any) {
  try {
    const schema = Joi.object({
      content: Joi
        .string()
        .min(3)
        .max(1024)
        .required(),
      
      task: Joi
        .string()
        .required(),
    })

    return await schema.validateAsync(data);
  } catch (error: any) {
    throw new Error(`${error.name}: ${error.message}`);
  }
}

export async function commentUpdateValidators(data: any) {
  try {
    const schema = Joi.object({
      content: Joi
        .string()
        .min(3)
        .max(1024),
    })

    return await schema.validateAsync(data);
  } catch (error: any) {
    throw new Error(`${error.name}: ${error.message}`);
  }
}