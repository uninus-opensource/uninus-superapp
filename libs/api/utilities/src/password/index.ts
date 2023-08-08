import * as argon from "argon2";

export const encryptPassword = async (password: string): Promise<string> => {
  return await argon.hash(password);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await argon.verify(password, hash);
};
