import TwitterProvider from "next-auth/providers/twitter";
import NextAuth from "next-auth";

export default async function auth(req, res) {
	return await NextAuth(req, res, {
		providers: [
			TwitterProvider({
				clientId: process.env.TWITTER_CLIENT_ID,
				clientSecret: process.env.TWITTER_CLIENT_SECRET,
			}),
		],
		callbacks: {
			async jwt(token, user, account = {}, profile, isNewUser) {
				return token;
			},
			async signIn({ user, account, profile }) {
				let bearerToken = JSON.parse(
					req.cookies.additionalAuthParams
				).appPublicKey;
				const response = await fetch(
					`https://orca-app-c3df4.ondigitalocean.app/starkpill-api2/account/updateInfo`,
					{
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
							Authorization: "bearer " + bearerToken,
						},
						body: JSON.stringify({ twitterHandle: "@" + profile.screen_name }),
					}
				);
				return true;
			},
		},
	});
}
