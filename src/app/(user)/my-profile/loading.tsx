import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
	const skeletonCards = [
		{ id: "skeleton-1" },
		{ id: "skeleton-2" },
		{ id: "skeleton-3" },
	];

	return (
		<div className="container py-6">
			<div className="flex flex-col gap-6">
				<div>
					<Skeleton className="h-9 w-48" />
					<Skeleton className="mt-2 h-5 w-72" />
				</div>

				<div className="space-y-6">
					<div>
						<Skeleton className="mb-4 h-8 w-32" />
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
							{skeletonCards.map((card) => (
								<Card key={card.id}>
									<CardHeader>
										<Skeleton className="h-6 w-3/4" />
										<Skeleton className="h-4 w-1/2" />
									</CardHeader>
									<CardContent>
										<Skeleton className="aspect-square w-full rounded-lg" />
										<div className="mt-4 space-y-2">
											<Skeleton className="h-4 w-full" />
											<Skeleton className="h-4 w-2/3" />
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
