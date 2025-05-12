import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Mail, MapPin, Phone } from "lucide-react";

export default async function OfferPage({
	params,
}: { params: Promise<{ id: string }> }) {
	"use cache";

	const { id } = await params;
	const offer = await prisma.offer.findUnique({
		where: { id },
		include: {
			user: {
				select: {
					id: true,
					name: true,
					email: true,
					image: true,
				},
			},
		},
		cacheStrategy: {
			ttl: 600, // 5 minutes
		},
	});

	if (!offer) {
		notFound();
	}

	return (
		<div className="container py-6">
			<div className="grid gap-6 lg:grid-cols-3">
				{/* Lewa kolumna - zdjęcia i opis */}
				<div className="lg:col-span-2 space-y-6">
					{/* Galeria zdjęć */}
					<div className="grid gap-4">
						{offer.images[0] && (
							<div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
								<Image
									src={offer.images[0]}
									alt={offer.title}
									fill
									className="object-cover"
									priority
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
								/>
							</div>
						)}
						{offer.images.length > 1 && (
							<div className="grid grid-cols-4 gap-4">
								{offer.images.slice(1).map((image, index) => (
									<div
										key={image}
										className="relative aspect-square overflow-hidden rounded-lg"
									>
										<Image
											src={image}
											alt={`${offer.title} - zdjęcie ${index + 2}`}
											fill
											className="object-cover"
											sizes="(max-width: 768px) 25vw, 15vw"
										/>
									</div>
								))}
							</div>
						)}
					</div>

					{/* Opis */}
					<Card>
						<CardHeader>
							<CardTitle>Description</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="whitespace-pre-wrap text-muted-foreground">
								{offer.description}
							</p>
						</CardContent>
					</Card>
				</div>

				{/* Prawa kolumna - informacje o sprzedawcy i cena */}
				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">
								{formatPrice(offer.price)}
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center gap-4">
								<Avatar className="h-12 w-12">
									<AvatarImage src={offer.user.image || undefined} />
									<AvatarFallback>
										{offer.user.name
											.split(" ")
											.map((n) => n[0])
											.join("")}
									</AvatarFallback>
								</Avatar>
								<div>
									<p className="font-medium">{offer.user.name}</p>
									<p className="text-sm text-muted-foreground">
										Member since{" "}
										{new Date(offer.createdAt).toLocaleDateString("pl-PL", {
											year: "numeric",
											month: "long",
										})}
									</p>
								</div>
							</div>

							<div className="space-y-2">
								<Button className="w-full" size="lg">
									<Phone className="mr-2 h-4 w-4" />
									Contact seller
								</Button>
								<Button variant="outline" className="w-full">
									<Mail className="mr-2 h-4 w-4" />
									Send message
								</Button>
							</div>

							<div className="space-y-2 text-sm text-muted-foreground">
								<div className="flex items-center gap-2">
									<CalendarDays className="h-4 w-4" />
									<p>
										Posted{" "}
										{new Date(offer.createdAt).toLocaleDateString("pl-PL")}
									</p>
								</div>
								<div className="flex items-center gap-2">
									<MapPin className="h-4 w-4" />
									<p>Location: Warsaw, Poland</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
