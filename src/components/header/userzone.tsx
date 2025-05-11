"use client";

import { signOut } from "@/lib/auth-client";

import { signInWithDiscord } from "@/lib/auth-client";

import { useSession } from "@/lib/auth-client";
import { Button, buttonVariants } from "@/components/ui/button";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";

function UserZone() {
	const { data: session, isPending } = useSession();

	// session pending
	if (isPending) {
		return (
			<Button variant="outline" disabled>
				Sign in
			</Button>
		);
	}

	// session not found
	if (!session?.user.id) {
		return (
			<Link
				href="/sign-in"
				className={cn(buttonVariants({ variant: "outline" }))}
			>
				Sign in
			</Link>
		);
	}

	// session found
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">My account</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-48">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Profile</DropdownMenuItem>
				<DropdownMenuItem>Settings</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={async () => await signOut()}>
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default UserZone;
