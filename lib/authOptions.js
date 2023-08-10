import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { verifyPassword } from '@/utils/auth'


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const user = await verifyPassword(credentials)
          if (user) {
            return user
          } else {
            throw new Error('Incorrect username or password')
          }
        } catch (error) {
          console.log(error)
          throw new Error('Incorrect username or password')
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
        session.user.username = token.username;
      }
      if (token.email && !session.user.registered) {
        session.user.username = token.email;
        
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/googleLogin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: token.email
          })
        });
        if (!res.ok) {
          console.log('Error during registration');
        } else {
          session.user.registered = true;
        }
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
        token.username = user.username;
        token.email = user.email;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
};