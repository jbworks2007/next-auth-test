import type { NextAuthOptions } from "next-auth";
import GitHubPrvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const options: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        console.log(
          "credentisla :",
          "username",
          username,
          "password",
          password
        );

        //This is where you need to retrieve the userdata from database
        // to verify its crendentials

        const res = await axios
          .post(
            "http://localhost:5000/api/auth/login",
            {
              email: username,
              password: password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            // console.log("response from api", response.data);
            return response.data;
          })
          .catch((error) => {
            // console.log("error from api", error.response.data);
            return error.response.data;
          });

        const user = res.user;
        console.log("user from API response :", user);

        if (user) {
          return user;
        } else {
          throw new Error(
            res.message ? res.message : "Invalid Credentials from frontend"
          );
          // return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // console.log("inside JWT ");
      // console.log("token => ", token);
      // console.log("user => ", user);
      return { ...token, ...user };
    },
    session({ session, token, user }) {
      // console.log("inside session => ", session);
      if (session.user) {
        // (session.user as { id: string }).id = token.id as string;
        (session.user as { email: string }).email = token.email as string;
        (session.user as { role: string }).role = token.role as string;
        (session.user as { phone: string }).phone = token.phone as string;
        (session.user as { jwt: string }).jwt = token.jwt as string;
      }
      // session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/", //Need to define custom login page (if using)
    signOut: "/",
  },
};
