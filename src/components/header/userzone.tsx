"use client";

import { signOut } from "@/lib/auth-client";

import { signInWithDiscord } from "@/lib/auth-client";

import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

function UserZone() {
	const { data: session, isPending } = useSession();

	// session pending
	if (isPending) {
		return (
			<Button variant="outline" disabled>
				Login
			</Button>
		);
	}

	// session not found
	if (!session?.user.id) {
		return (
			<Button variant="outline" onClick={async () => await signInWithDiscord()}>
				Login
			</Button>
		);
	}

	// session found
	return (
		<Button variant="outline" onClick={() => signOut()}>
			Logout
		</Button>
	);
}

export default UserZone;
