"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

function DisabledSearchInput() {
	return (
		<div className="flex w-full items-center space-x-2">
			<div className="relative flex-1">
				<Input
					type="search"
					placeholder="Search..."
					className="pr-10"
					disabled
				/>
				<Button
					type="submit"
					size="sm"
					variant="ghost"
					className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
					disabled
				>
					<Search className="h-4 w-4 text-muted-foreground" />
				</Button>
			</div>
		</div>
	);
}

export default DisabledSearchInput;
