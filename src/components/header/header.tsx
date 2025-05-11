import Link from "next/link";
import { Button } from "@/components/ui/button";
import UserZone from "./userzone";
import SearchInput from "../ui/search-input";

function Header() {
	return (
		<header className="flex items-center justify-between py-4 border-b mb-4">
			<Link href="/">
				<h1 className="font-medium">quicksell</h1>
			</Link>
			<SearchInput />
			<div className="flex items-center gap-2">
				<Button>Sell now</Button>
				<UserZone />
			</div>
		</header>
	);
}

export default Header;
