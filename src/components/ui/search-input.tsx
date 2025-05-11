"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function SearchInput() {
	const [searchValue, setSearchValue] = useState("");
	const searchParams = useSearchParams();
	const router = useRouter();

	useEffect(() => {
		const query = searchParams.get("q");
		setSearchValue(query || "");
	}, [searchParams]);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const trimmedSearchValue = searchValue.trim();
		if (trimmedSearchValue !== "") {
			router.push(`/search?q=${encodeURIComponent(trimmedSearchValue)}`);
		} else {
			router.push("/search");
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex w-full items-center space-x-2"
		>
			<div className="relative flex-1">
				<Input
					type="search"
					placeholder="Search..."
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					className="pr-10"
				/>
				<Button
					type="submit"
					size="sm"
					variant="ghost"
					className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
				>
					<Search className="h-4 w-4 text-muted-foreground" />
				</Button>
			</div>
		</form>
	);
}

export default SearchInput;
