"use client";

import { signOut } from "@/lib/auth-client";

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
import { useRouter } from "next/navigation";
import { User } from "lucide-react";

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
		<>
			<DesktopUser />
			{/* <MobileUser /> */}
		</>
	);
}

const DesktopUser = () => {
	const router = useRouter();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<User />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-48">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Create a listing</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href="/my-profile">My profile</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>Settings</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={async () =>
						await signOut({
							fetchOptions: {
								onSuccess: () => {
									router.push("/");
								},
							},
						})
					}
				>
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

// import {
// 	Sheet,
// 	SheetContent,
// 	SheetDescription,
// 	SheetHeader,
// 	SheetTitle,
// 	SheetTrigger,
// } from "@/components/ui/sheet";
// import { useState } from "react";

// const MobileUser = () => {
// 	const [open, setOpen] = useState(false);

// 	return (
// 		<Sheet open={open} onOpenChange={setOpen}>
// 			<SheetTrigger asChild>
// 				<Button size="icon" variant="outline">
// 					<User />
// 				</Button>
// 			</SheetTrigger>
// 			<SheetContent>
// 				<SheetHeader>
// 					<SheetTitle>Are you absolutely sure?</SheetTitle>
// 					<SheetDescription>
// 						This action cannot be undone. This will permanently delete your
// 						account and remove your data from our servers.
// 					</SheetDescription>
// 				</SheetHeader>
// 			</SheetContent>
// 		</Sheet>
// 	);
// };

export default UserZone;
