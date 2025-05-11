import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		useCache: true,
		ppr: "incremental",
	},
};

export default nextConfig;
