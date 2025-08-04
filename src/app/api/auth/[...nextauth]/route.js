import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Hardcoded admin credentials
        if (
          credentials?.email === "admin@gmail.com" && 
          credentials?.password === "Admin123"
        ) {
          return {
            id: "1",
            email: "admin@gmail.com",
            name: "Minjo",
            isAdmin: true
          };
        }
        return null;
      }
    }),
  ],
  callbacks: {
    // Pass isAdmin property from the user to the session
    async session({ session, token }) {
      if (session?.user) {
        session.user.isAdmin = token.isAdmin;
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = user.isAdmin;
      }
      return token;
    }
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: "jwt",
  },
};

// Auth handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
