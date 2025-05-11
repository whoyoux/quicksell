import { formatPrice } from "@/lib/utils";
import Image from "next/image";

export default function Home() {
	return (
		<>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
				<Card number={1} price={100} />
				<Card number={2} price={200} />
				<Card number={3} price={300} />
				<Card number={4} price={400} />
				<Card number={5} price={500} />
			</div>
		</>
	);
}

type CardProps = {
	number: number;
	price: number;
};

import placeholderImage from "@/assets/placeholder.webp";
import Link from "next/link";

const Card = ({ number, price }: CardProps) => {
	return (
		<div className="bg-muted/70 rounded-md p-4 flex flex-col gap-2">
			<div className="aspect-video w-full bg-red-400 rounded-md relative">
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
			<div>
				<Link href="#">
					<h2 className="font-medium hover:underline">offer name {number}</h2>
				</Link>
				<h3 className="text-sm text-muted-foreground">{formatPrice(price)}</h3>
			</div>
		</div>
	);
};
