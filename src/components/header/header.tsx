"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signInWithDiscord, signOut, useSession } from "@/lib/auth-client";

function Header() {
	return (
		<header className="flex items-center justify-between py-4 border-b mb-4">
			<Link href="/">
				<h1 className="font-medium">quicksell</h1>
			</Link>
			<div className="flex items-center gap-2">
				<Button>Sell now</Button>
				<UserZone />
			</div>
		</header>
	);
}

const UserZone = () => {
	const { data: session, isPending } = useSession();

	if (isPending) {
		return (
			<Button variant="outline" disabled>
				Login
			</Button>
		);
	}

	if (!session?.user.id) {
		return (
			<Button variant="outline" onClick={async () => await signInWithDiscord()}>
				Login
			</Button>
		);
	}

	return (
		<Button variant="outline" onClick={() => signOut()}>
			Logout
		</Button>
	);
};

export default Header;
