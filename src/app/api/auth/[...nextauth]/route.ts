import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "../../services/user/api";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        try {
          const response = await loginUser({ username, password });

          if (response && response.data && response.data.data) {
            const user = response.data.data;
            console.log("User data:", user);
            return user; // Mengembalikan user dari authorize callback
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error logging in:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials" && user) {
        token.id = user.id;
        token.username = user.username;
        token.full_name = user.full_name;
        token.role = user.role;
      }

      console.log("JWT user:", user);
      return token;
    },

    async session({ session, token }: any) {
      console.log("Session Callback - Token:", token);

      if ("id" in token) {
        session.user.id = token.id;
      }
      if ("username" in token) {
        session.user.username = token.username;
      }
      if ("full_name" in token) {
        session.user.full_name = token.full_name;
      }
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
