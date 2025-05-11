import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import AddOfferForm from "./add-offer-form";

async function AddPage() {
	const session = await getSession();

	if (!session?.user) {
		return redirect("/sign-in");
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

export default AddPage;
