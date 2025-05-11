import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "sqlite",
	}),
	emailAndPassword: {
		enabled: true,
	},
	socialProviders: {
		discord: {
			clientId: process.env.DISCORD_CLIENT_ID as string,
			clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
		},
	},
	emailVerification: {
		// sendOnSignUp: true,
		sendVerificationEmail: async ({ user, url, token }, request) => {
			// TODO: Sending email!!!!
			// await sendEmail({
			//     to: user.email,
			//     subject: 'Verify your email address',
			//     text: `Click the link to verify your email: ${url}`
			// })
		},
	},
	plugins: [nextCookies()],
});
