import { getToken } from "next-auth/jwt";

export default async (req, res) => {
	const token = await getToken({ req, secret: process.env.SECRET });
	try {
		return res.status(200).json({
			status: "Ok",
			data: { twitterHandle: token.token.profile.name },
		});
	} catch (e) {
		return res.status(400).json({
			status: e.message,
		});
	}
};
