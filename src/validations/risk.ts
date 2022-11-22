import Joi from 'joi';

export async function riskCreationValidators(data: any) {
  try {
    const schema = Joi.object({
      name: Joi
        .string()
        .min(3)
        .max(255)
        .required(),

      key: Joi
        .string()
        .min(3)
        .max(255)
        .required(),
    })

    return await schema.validateAsync(data);
  } catch (error: any) {
    throw new Error(`${error.name}: ${error.message}`);
  }
}

export async function riskUpdateValidators(data: any) {
  try {
    const schema = Joi.object({
      name: Joi
        .string()
        .min(3)
        .max(255),

      key: Joi
        .string()
        .min(3)
        .max(255),
    })

    return await schema.validateAsync(data);
  } catch (error: any) {
    throw new Error(`${error.name}: ${error.message}`);
  }
}

