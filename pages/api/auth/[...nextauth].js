import TwitterProvider from "next-auth/providers/twitter";
import NextAuth from "next-auth";
export default NextAuth({
	secret: process.env.SECRET,
	providers: [
		TwitterProvider({
			clientId: process.env.TWITTER_CLIENT_ID,
			clientSecret: process.env.TWITTER_CLIENT_SECRET,
		}),
	],
});
