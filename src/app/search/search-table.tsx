async function SearchTable({
	searchParams,
}: {
	searchParams: Promise<{ q: string }>;
}) {
	const { q } = await searchParams;
	return <h3 className="text-lg font-medium">Search results for {q}</h3>;
}

export default SearchTable;
