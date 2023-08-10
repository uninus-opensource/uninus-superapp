import * as argon2 from "argon2";

export const encryptPassword = async (password: string): Promise<string> => {
  return await argon2.hash(password);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await argon2.verify(hash, password);
};
