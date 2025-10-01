import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { findUserByCredentials } from "./lib/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt", // ✅ usa JWT para persistir session
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null;
        return await findUserByCredentials(
          credentials.email,
          credentials.password
        );
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = (user as any).id; // pega o id do usuário quando faz login
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as number; // garante que session.user.id existe
      }
      return session;
    },
  },
});
