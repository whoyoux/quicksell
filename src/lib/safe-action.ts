import { createSafeActionClient } from "next-safe-action";
import { getSession } from "./auth-server";

export const actionClient = createSafeActionClient();

export const authActionClient = actionClient.use(async ({ next }) => {
	const session = await getSession();

	if (!session) {
		throw new Error("Unauthorized");
	}

	return next({ ctx: { session } });
});
