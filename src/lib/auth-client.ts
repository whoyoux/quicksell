import { createAuthClient } from "better-auth/react";

const { signIn, signUp, signOut, useSession } = createAuthClient();

const signInWithDiscord = async () => {
	const { error } = await signIn.social({
		provider: "discord",
		callbackURL: "/",
	});

	if (error) {
		console.error(error);
	}
};

export { signUp, signIn, signInWithDiscord, signOut, useSession };
