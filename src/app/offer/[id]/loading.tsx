import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const skeletonThumbnails = [
	"thumbnail-1",
	"thumbnail-2",
	"thumbnail-3",
	"thumbnail-4",
] as const;

export default function OfferLoading() {
	return (
		<div className="container py-6">
			<div className="grid gap-6 lg:grid-cols-3">
				{/* Lewa kolumna - zdjęcia i opis */}
				<div className="lg:col-span-2 space-y-6">
					{/* Galeria zdjęć */}
					<div className="grid gap-4">
						<Skeleton className="aspect-[4/3] w-full rounded-lg" />
						<div className="grid grid-cols-4 gap-4">
							{skeletonThumbnails.map((id) => (
								<Skeleton
									key={id}
									className="aspect-square w-full rounded-lg"
								/>
							))}
						</div>
					</div>

					{/* Opis */}
					<Card>
						<CardHeader>
							<Skeleton className="h-6 w-32" />
						</CardHeader>
						<CardContent className="space-y-2">
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-3/4" />
							<Skeleton className="h-4 w-1/2" />
						</CardContent>
					</Card>
				</div>

				{/* Prawa kolumna - informacje o sprzedawcy i cena */}
				<div className="space-y-6">
					<Card>
						<CardHeader>
							<Skeleton className="h-8 w-32" />
						</CardHeader>
						<CardContent className="space-y-4">
							{/* Informacje o sprzedawcy */}
							<div className="flex items-center gap-4">
								<Skeleton className="h-12 w-12 rounded-full" />
								<div className="space-y-2">
									<Skeleton className="h-4 w-32" />
									<Skeleton className="h-3 w-24" />
								</div>
							</div>

							{/* Przyciski */}
							<div className="space-y-2">
								<Skeleton className="h-10 w-full" />
								<Skeleton className="h-10 w-full" />
							</div>

							{/* Dodatkowe informacje */}
							<div className="space-y-2">
								<div className="flex items-center gap-2">
									<Skeleton className="h-4 w-4" />
									<Skeleton className="h-4 w-32" />
								</div>
								<div className="flex items-center gap-2">
									<Skeleton className="h-4 w-4" />
									<Skeleton className="h-4 w-40" />
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
