import { createAuthClient } from "better-auth/react";

const { signIn: signInClient, signOut, useSession } = createAuthClient();

const signInWithDiscord = async () => {
	const { error } = await signInClient.social({
		provider: "discord",
		callbackURL: "/",
	});

	if (error) {
		console.error(error);
	}
};

export { signInWithDiscord, signOut, useSession };
