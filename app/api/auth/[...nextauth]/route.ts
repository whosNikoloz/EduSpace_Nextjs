import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook"; // Import FacebookProvider
import LinkedInProvider from "next-auth/providers/linkedin";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? "",
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID ?? "",
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET ?? "",
    }),
  ],
  secret: "YOUR_SECRET_KEY_HERE",
  callbacks: {
    async jwt({
      token,
      user,
      account,
    }: {
      token: any;
      user: any;
      account: any;
    }) {
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.provider = token.provider;
      session.providerId = token.sub; // JWT's "sub" field: User's unique ID from the authentication provider, ensuring consistent identification.
      return session;
    },
  },
});

export { handler as GET, handler as POST };
