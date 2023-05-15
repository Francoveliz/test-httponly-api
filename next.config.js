module.exports = {
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: "https://cookie-test.estoes.dev/:path*",
			},
		];
	},
};
