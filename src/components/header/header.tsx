import Link from "next/link";
import { Button } from "../ui/button";

function Header() {
	return (
		<header className="flex items-center justify-between py-4 border-b mb-4">
			<Link href="/"><h1 className="font-medium">quicksell</h1></Link>
			<div className="flex items-center gap-2">
				<Button>Sell now</Button>
				<Button variant="outline">Login</Button>
			</div>
		</header>
	);
}

export default Header;