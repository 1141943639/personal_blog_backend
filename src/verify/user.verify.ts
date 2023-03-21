import { object, string } from 'yup';

export const USERNAME_MAX = 20;
export const PASSWORD_MAX = 20;

const usernameSchema = string().required().max(USERNAME_MAX);
const passwordSchema = string().required().max(PASSWORD_MAX);

export const registerSchema = object({
  username: usernameSchema,
  password: passwordSchema,
});

export const loginSchema = object({
  username: usernameSchema,
  password: passwordSchema,
});

export const changePwdSchema = object({
  newPassword: passwordSchema,
});
