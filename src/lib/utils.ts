import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const PriceFormatter = new Intl.NumberFormat("pl-PL", {
	style: "currency",
	currency: "EUR",
});

export function formatPrice(price: number) {
	return PriceFormatter.format(price);
}
