import { ObjectSchema } from "joi";

export const validate = async (schema: ObjectSchema, payload: any) => {
  try {
    await schema.validateAsync(payload, { abortEarly: false });
  } catch (error) {
    throw new Error(error);
  }
};
