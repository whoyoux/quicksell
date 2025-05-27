import { getSession } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

async function UserOffers() {
	const session = await getSession();
	if (!session) return null;

	const myOffers = await prisma.offer.findMany({
		where: {
			userId: session.user.id,
		},
		orderBy: {
			createdAt: "desc",
		},
		// cacheStrategy: {
		// 	ttl: 600, // 5 minutes
		// },
	});

	if (myOffers.length === 0) {
		return (
			<div className="rounded-lg border p-4 text-center text-muted-foreground">
				You haven&apos;t added any offers yet.
			</div>
		);
	}

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{myOffers.map((offer) => (
				<Link href={`/offer/${offer.id}`} key={offer.id}>
					<Card className="h-full transition-colors hover:bg-muted/50">
						<CardHeader>
							<CardTitle className="line-clamp-1">{offer.title}</CardTitle>
							<CardDescription>{formatPrice(offer.price)}</CardDescription>
						</CardHeader>
						<CardContent>
							{offer.images[0] && (
								<div className="relative aspect-square w-full overflow-hidden rounded-lg">
									<Image
										src={offer.images[0]}
										alt={offer.title}
										fill
										className="object-cover"
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									/>
								</div>
							)}
							<p className="mt-4 line-clamp-2 text-sm text-muted-foreground">
								{offer.description}
							</p>
						</CardContent>
					</Card>
				</Link>
			))}
		</div>
	);
}
export default UserOffers;
