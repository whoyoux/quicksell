import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "quicksell",
	description: "quicksell - quick way to sell your products online",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`antialiased ${geistSans.variable}`}>
			<body>
				<div className="max-w-screen-xl mx-auto px-4 xl:px-0">
					<Header />
					{children}
				</div>
			</body>
		</html>
	);
}
