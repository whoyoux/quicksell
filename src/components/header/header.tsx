import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import UserZone from "./userzone";
import SearchInput from "@/components/ui/search-input";
import { Suspense } from "react";
import DisabledSearchInput from "@/components/ui/disabled-search-input";
import { cn } from "@/lib/utils";

function Header() {
	return (
		<header className="flex items-center justify-between py-4 border-b mb-4 gap-2">
			<Link href="/">
				<h1 className="font-medium">quicksell</h1>
			</Link>

			<div className="flex items-center gap-2">
				<Suspense fallback={<DisabledSearchInput />}>
					<SearchInput />
				</Suspense>
				<Link
					href="/add"
					className={cn(
						buttonVariants({ variant: "default" }),
						"hidden md:block",
					)}
				>
					Sell now
				</Link>
				<UserZone />
			</div>
		</header>
	);
}

export default Header;
