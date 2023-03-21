import { compare, genSalt, hash } from 'bcryptjs';

const SALT_RANDOM = 8;

const hashPassword = async (password: string): Promise<string> => {
  const saltGerenated = await genSalt(SALT_RANDOM);
  const hashPass = hash(password, saltGerenated);
  return hashPass;
};

const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return compare(password, hashedPassword);
};

export const PasswordCryto = {
  hashPassword,
  verifyPassword,
};
