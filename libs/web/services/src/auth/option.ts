import NextAuth, { NextAuthConfig } from "next-auth";
import { authOptions } from "./config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authOptions,

  callbacks: {
    async jwt({ token, user }) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      token = user;
      return token;
    },
  },
} satisfies NextAuthConfig);
