"use server";
import { signIn } from "@uninus/web/services";

export const AuthLogin = async ({ email, password }: { email: string; password: string }) => {
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    return JSON.stringify(error);
  }
};
