import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';
import { env } from '@/env.mjs';
import { pagesOptions } from './pages-options';
import {routes} from "@/config/routes";
import apiHelper from "@/utils/apiHelper";

export const authOptions: NextAuthOptions = {
  // debug: true,

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          first_name: token.first_name,
          last_name: token.last_name,
          email: token.email,
          role: token.role,
          avatar: token.avatar
        },
        accessToken: token.accessToken,
        refreshToken: token.refreshToken
      };
    },
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          ...user // bu sayede tüm user bilgileri token'a eklenmiş olacak
        };
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      const parsedUrl = new URL(url, baseUrl);
      if (parsedUrl.searchParams.has('callbackUrl')) {
        return `${baseUrl}${parsedUrl.searchParams.get('callbackUrl')}`;
      }
      if (parsedUrl.origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials: any) {
        try {
          const response = await apiHelper.post('/guvenlik/token', {
            email: credentials.email,
            password: credentials.password
          });

          if (response.data.access && response.data.refresh) {
            return {
              accessToken: response.data.access,
              refreshToken: response.data.refresh,
              id: response.data.user.id,
              first_name: response.data.user.first_name,
              last_name: response.data.user.last_name,
              email: response.data.user.email,
              role: response.data.user.role,
              avatar: response.data.user.avatar
            };
          } else {
            throw new Error(response.data.detail);
          }
        } catch (error: any) {
          if (error.response && error.response.data) {
            const errorCode = error.response.data.code;
            const errorMessage = error.response.data.detail;

            if (errorCode === "authentication_failed") {
              throw new Error(errorMessage); // "Girilen bilgilerle eşleşen aktif bir hesap bulunamadı."
            } else {
              throw new Error("Bilinmeyen bir hata oluştu.");
            }
          } else {
            throw new Error("Bilinmeyen bir hata oluştu.");
          }
        }
      }
    }),
  ],
  pages: {
    ...pagesOptions,
  },
};
