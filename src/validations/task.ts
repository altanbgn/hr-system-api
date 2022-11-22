import Joi from 'joi';

export async function taskCreationValidators(data: any) {
  try {
    const schema = Joi.object({
      name: Joi
        .string()
        .min(3)
        .max(255)
        .required(),

      content: Joi
        .string()
        .min(3)
        .max(1024)
        .required(),

      type: Joi
        .string(),

      status: Joi
        .string(),

      assignees: Joi
        .array()
        .items(Joi.string())
    })

    return await schema.validateAsync(data);
  } catch (error: any) {
    throw new Error(`${error.name}: ${error.message}`);
  }
}

export async function taskUpdateValidators(data: any) {
  try {
    const schema = Joi.object({
      name: Joi
        .string()
        .min(3)
        .max(255),

      content: Joi
        .string()
        .min(3)
        .max(1024),

      type: Joi
        .string(),

      status: Joi
        .string(),

      assignees: Joi
        .array()
        .items(Joi.string())
    })

    return await schema.validateAsync(data);
  } catch (error: any) {
    throw new Error(`${error.name}: ${error.message}`);
  }
}