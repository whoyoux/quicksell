import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { sendEmail } from "./resend";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "sqlite",
	}),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
	},
	socialProviders: {
		discord: {
			clientId: process.env.DISCORD_CLIENT_ID as string,
			clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
		},
	},
	emailVerification: {
		autoSignInAfterVerification: true,
		sendOnSignUp: true,
		sendVerificationEmail: async ({ user, url, token }, request) => {
			const result = await sendEmail(
				user.email,
				"Verify your email address",
				`Click the link to verify your email: ${url}`,
			);
			if (!result.success) {
				console.error("[SEND VERIFICATION EMAIL ERROR]: ", result.error);
			}
		},
	},
	plugins: [nextCookies()],
});
