import CredentialsProvider from "next-auth/providers/credentials";
import { VSLogin } from "@uninus/entities";
import { postUserLogin } from "./api";

export const credentialProvider = CredentialsProvider({
  async authorize(credentials) {
    const validatedFields = VSLogin.safeParse(credentials);

    if (validatedFields.success) {
      const { email, password } = validatedFields.data;

      const data = await postUserLogin({
        email,
        password,
      });

      return data;
    }

    return null;
  },
});
