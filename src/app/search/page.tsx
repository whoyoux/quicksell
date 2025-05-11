async function SearchPage({
	searchParams,
}: {
	searchParams: Promise<{ q: string }>;
}) {
	const { q } = await searchParams;
	return (
		<div>
			<h3 className="text-lg font-medium">Search results for {q}</h3>
		</div>
	);
}

export default SearchPage;
