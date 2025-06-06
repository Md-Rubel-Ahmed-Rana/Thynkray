import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { OAuth2Client } from "google-auth-library";

const gsiClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      id: "googleonetap",
      name: "Google One Tap",
      credentials: {
        credential: { label: "Google ID Token", type: "text" },
      },
      async authorize(credentials) {
        const token = credentials?.credential;
        if (!token) return null;

        const ticket = await gsiClient.verifyIdToken({
          idToken: token,
          audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        if (!payload) return null;

        return {
          id: payload.sub,
          name: payload.name,
          email: payload.email,
          image: payload.picture,
        };
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) Object.assign(token, user);
      return token;
    },
    session({ session, token }) {
      session.user = {
        name: token?.name as string,
        email: token?.email as string,
        image: token?.image as string,
      };
      return session;
    },
  },
});
