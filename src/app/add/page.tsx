"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import AddOfferForm from "./add-offer-form";
import { Spinner } from "@/components/ui/spinner";

export default function AddPage() {
	const { data: session, isPending } = useSession();
	const router = useRouter();

	if (isPending) {
		return (
			<div className="flex items-center justify-center min-h-[50vh]">
				<Spinner className="h-12 w-12" />
			</div>
		);
	}

	if (!session?.user) {
		router.push("/sign-in");
	}

	return (
		<div>
			<div className="flex flex-col gap-4 max-w-2xl mx-auto md:pt-8">
				<h2 className="text-2xl font-bold">Add a new offer</h2>
				<AddOfferForm />
			</div>
		</div>
	);
}
