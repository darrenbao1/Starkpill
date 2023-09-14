/** @type {import('next').NextConfig} */
module.exports = {
	env: {
		SECRET_KEY: process.env.SECRET_KEY,
		WEB_3_CONNECT_ID: process.env.WEB_3_CONNECT_ID,
	},
	async headers() {
		return [
			{
				source: "/_next/:path*",
				headers: [
					{
						key: "Access-Control-Allow-Origin",
						value: "https://api.mintsquare.io",
					},
				],
			},
		];
	},
	images: {
		domains: ["quicknode.mypinata.cloud"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "arweave.net",
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
			},
		],
	},
	reactStrictMode: true,
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"],
		});
		return config;
	},
};
