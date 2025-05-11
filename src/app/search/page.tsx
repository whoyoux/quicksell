import { Suspense } from "react";
import SearchTable from "./search-table";
export const experimental_ppr = true;

async function SearchPage({
	searchParams,
}: {
	searchParams: Promise<{ q: string }>;
}) {
	return (
		<div>
			<h2>Search page</h2>
			<Suspense fallback={<div>Loading...</div>}>
				<SearchTable searchParams={searchParams} />
			</Suspense>
		</div>
	);
}

export default SearchPage;
