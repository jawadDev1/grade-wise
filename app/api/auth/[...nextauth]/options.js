import { encode, decode } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { SERVICES } from "@/services";
import { comparePassword, hashPassword } from "@/lib/utils";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

export const authOptions = {
  secret: NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: { encode, decode },

  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        const googleProfile = {
          ...profile,
          profile: profile.picture,
          name: profile.name,
        };
        const user = await SERVICES.AuthService.getUser({
          email: profile.email,
        });

        if (!user?.email) {
          const user = await SERVICES.AuthService.registerUser({
            name: profile.name,
            username: profile.name.toLowerCase(),
            email: profile.email,
            profile: profile.picture,
            verification_type: "google",
          });
          return { ...googleProfile, id: user._id };
        }

        const updatedUser = await SERVICES.AuthService.updateUser(
          { email: profile.email },
          {
            name: profile.name,
            email: profile.email,
            profile: profile.picture,
          }
        );

        return {
          ...googleProfile,
          profile: googleProfile.picture,
          id: updatedUser._id,
          role: updatedUser.role,
          joined_at: updatedUser.created_at,
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        //   Input fields for form as signin page

        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your Email",
        },
        password: {
          label: "Passord",
          type: "password",
          placeholder: "Enter your password",
        },
      },

      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const user = await SERVICES.AuthService.getUser({
          email: credentials.email,
        });

        if (!user) {
          throw new Error("Could not find your account, Please create one");
        }

        const passwordValidity = await comparePassword(
          credentials.password,
          user.password
        );

        if (!user || !passwordValidity) {
          // Assuming password check happens securely
          throw new Error("Invalid credentials");
          // return null;
        }

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.profile,
          role: user.role,
          joined_at: user.created_at,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ account, profile, user }) {
      if (user) {
        return true;
      }
      return false;
    },
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (token.role) {
        session.user.role = token.role;
        session.user.id = token.id;
      } else {
        session = { ...session, expires: "" };
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      // If the URL starts with the base URL, then it's safe to return
      if (url.startsWith(baseUrl)) return url;
      // Otherwise, return to the baseUrl
      return baseUrl;
    },
  },

  pages: {
    signIn: "/login",
  },
};
