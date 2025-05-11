import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		useCache: true,
		ppr: "incremental",
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "utfs.io",
			},
		],
	},
};

export default nextConfig;
