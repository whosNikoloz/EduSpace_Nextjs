import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import Github from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      profileUrl: 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json' ?? "",
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
  ],
  secret: "YOUR_SECRET_KEY_HERE",
});

export { handler as GET, handler as POST };
