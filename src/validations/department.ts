import Joi from 'joi';

export async function departmentCreationValidators(data: any) {
  try {
    const schema = Joi.object({
      name: Joi
        .string()
        .min(3)
        .max(255)
        .required(),

      description: Joi
        .string()
        .min(3)
        .max(255)
        .required(),

      status: Joi
        .string()
    })

    return await schema.validateAsync(data);
  } catch (error: any) {
    throw new Error(`${error.name}: ${error.message}`);
  }
}

export async function departmentUpdateValidators(data: any) {
  try {
    const schema = Joi.object({
      name: Joi
        .string()
        .min(3)
        .max(255),

      description: Joi
        .string()
        .min(3)
        .max(255),

      status: Joi
        .string()
        .min(3)
        .max(255),
    })

    return await schema.validateAsync(data);
  } catch (error: any) {
    throw new Error(`${error.name}: ${error.message}`);
  }
}

