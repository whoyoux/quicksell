import { formatPrice } from "@/lib/utils";
import Image from "next/image";

import placeholderImage from "@/assets/placeholder.webp";
import Link from "next/link";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function Home() {
	return (
		<>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
				<MyCard number={1} price={100} />
				<MyCard number={2} price={200} />
				<MyCard number={3} price={300} />
				<MyCard number={4} price={400} />
				<MyCard number={5} price={500} />
			</div>
		</>
	);
}

type MyCardProps = {
	number: number;
	price: number;
};

const MyCard = ({ number, price }: MyCardProps) => {
	return (
		<Card>
			<CardContent>
				<div className="aspect-video w-full rounded-md relative">
					<Image
						src={placeholderImage}
						alt="placeholder"
						fill
						className="rounded-md object-cover"
						quality={70}
						sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
						placeholder="blur"
					/>
				</div>
			</CardContent>
			<CardHeader>
				<Link href="#">
					<CardTitle className="hover:underline">offer name {number}</CardTitle>
				</Link>
				<CardDescription>{formatPrice(price)}</CardDescription>
			</CardHeader>
			{/* <CardFooter>
				<p className="text-sm text-muted-foreground">998 views</p>
			</CardFooter> */}
		</Card>
	);
};
