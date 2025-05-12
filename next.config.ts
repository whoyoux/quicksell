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
				hostname: "ndwaze4rw6.ufs.sh",
			},
		],
	},
};

export default nextConfig;
