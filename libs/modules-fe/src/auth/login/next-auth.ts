import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { loginRequest } from './api';
import { TLoginResponse, TMetaErrorResponse } from '@uninus/entities';
import axios from 'axios';
import { JWT } from 'next-auth/jwt';

const refreshAccessToken = async (token: JWT) => {
  try {
    const URL = process.env.NEXT_PUBLIC_API_URL;
    const { data } = await axios.post(
      `${URL}auth/refresh`,
      {},
      { headers: { Authorization: `Bearer ${token.refresh_token}` } }
    );

    const newToken = await data;

    return {
      ...token,
      access_token: newToken.access_token,
      exp: newToken.exp,
      refresh_token: token.refresh_token,
    };
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'login',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<TLoginResponse> {
        try {
          const data = await loginRequest({
            email: credentials?.email,
            password: credentials?.password,
          });
          return data;
        } catch (err) {
          const error = err as TMetaErrorResponse;
          if (error?.response?.status === 422) {
            throw new Error(error.response.data.message);
          }

          throw new Error(
            typeof error?.response?.data === 'string'
              ? error.response.data
              : error?.response?.data?.message
          );
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
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
      if (account?.provider === 'google' && account) {
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token;
        token.exp = account.expires_at;
      } else if (account?.provider === 'login' && currentUser) {
        token.access_token = currentUser.token.access_token;
        token.refresh_token = currentUser.token.refresh_token;
        token.exp = currentUser.token.exp;
        token.name = currentUser.user.fullname;
        token.email = currentUser.user.email;
        token.id = currentUser.user.id;
        currentUser.user.fullname = user.name as string;
        currentUser.user.email = user.email as string;
        currentUser.user.id = user.id;
        return { ...token, ...currentUser };
      }
      if (Date.now() < currentUser?.token?.exp) {
        return { ...token, ...currentUser };
      }

      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      const jwt_token: {
        access_token: string;
        exp: number;
        refresh_token: string;
      } = {
        access_token: token?.access_token as string,
        exp: token?.exp as number,
        refresh_token: token?.refresh_token as string,
      };
      session = {
        expires: token?.exp as string,
        user: {
          id: token.id as string,
          name: token.name,
          email: token.email,
          token: jwt_token,
        },
      };
      return session;
    },
  },
};

export default NextAuth(authOptions);
