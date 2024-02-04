import { NextAuthConfig } from "next-auth";
import { credentialProvider } from "./credentials";

export const authOptions = {
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [credentialProvider],
} satisfies NextAuthConfig;
