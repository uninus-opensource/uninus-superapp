import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginRequest, refreshRequest } from "./api";
import { TLoginResponse, TMetaErrorResponse, TUser } from "@uninus/entities";
import { JWT } from "next-auth/jwt";

const refreshAccessToken = async (token: JWT) => {
  try {
    const refreshedToken = await refreshRequest({
      refreshToken: token?.refreshToken as string,
    });

    return {
      ...token,
      accessToken: refreshedToken?.accessToken,
      refreshToken: token?.refreshToken,
      exp: refreshedToken?.exp.toString(),
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "login",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<TLoginResponse> {
        try {
          const data = await loginRequest({
            email: credentials?.email as string,
            password: credentials?.password as string,
          });
          return data;
        } catch (err) {
          const error = err as TMetaErrorResponse;
          if (error?.response?.status === 422) {
            throw new Error(error.response.data.message);
          }

          throw new Error(
            typeof error?.response?.data === "string"
              ? error.response.data
              : error?.response?.data?.message,
          );
        }
      },
    }),
  ],
  pages: {
    signIn: process.env.NEXT_PUBLIC_WORKSPACE === "admin" ? "/" : "/auth/login",
    signOut: "/auth/logout",
  },
  session: {
    maxAge: 2 * 60 * 60,
  },
  callbacks: {
    async signIn({ user }) {
      if (user) return true;
      return false;
    },

    async jwt({ token, user, account }) {
      const currentUser = user as unknown as TLoginResponse;
      if (account?.provider === "login" && currentUser) {
        token.accessToken = currentUser?.token?.accessToken;
        token.refreshToken = currentUser?.token?.refreshToken;
        token.exp = currentUser?.token?.exp.toString();
        return { ...token, ...currentUser };
      }

      if (Date.now() < currentUser?.token?.exp) {
        return { ...token, ...currentUser };
      }

      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      session = {
        expires: token?.exp as string,
        user: {
          ...(token.user as TUser),
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        },
      };
      return session;
    },
  },
};

export default NextAuth(authOptions);
