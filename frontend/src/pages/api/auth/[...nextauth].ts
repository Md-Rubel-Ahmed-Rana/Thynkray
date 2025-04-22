/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/zustand/api";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXT_PUBLIC_NEXT_AUTH_SECRET,
  callbacks: {
    async signIn({ user }: any) {
      const data = {
        name: user?.name,
        email: user?.email,
        profile_image: user?.image,
        role: "author",
        password: "123456",
      };
      const res = await fetch(`${baseApi}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      await res.json();

      return true;
    },
  },
};

export default NextAuth(authOptions);
