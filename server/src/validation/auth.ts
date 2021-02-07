import Joi from "joi";
import { BCRYPT_MAX_BYTES } from "../config";

const email = Joi.string()
  .email()
  .min(8)
  .max(254)
  .lowercase()
  .trim()
  .required();

const name = Joi.string().min(3).max(129).trim().required();

const password = Joi.string()
  .min(8)
  .max(BCRYPT_MAX_BYTES, "utf8") // bcrypt has a max of 72 bytes
  .regex(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u) //atleast one uppercase, one lowercase and one digit
  .message(
    "{#label} must contain one uppercase letter, one lowercase letter, and one digit"
  ) //to not expose the regex
  .required();

const passwordConfirmation = Joi.valid(Joi.ref("password")).required();

export const registerSchema = Joi.object({
  email,
  name,
  password,
  passwordConfirmation,
});

export const loginSchema = Joi.object({ email, password });
