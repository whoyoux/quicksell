import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import UserOffers from "@/components/user-offers";
import { Suspense } from "react";

async function ProfilePage() {
	const session = await getSession();

	if (!session) {
		return redirect("/sign-in");
	}

	return (
		<div className="container py-6">
			<div className="flex flex-col gap-6">
				<div>
					<h1 className="text-3xl font-bold">My Profile</h1>
					<p className="text-muted-foreground">
						Manage your offers and account settings
					</p>
				</div>

				<div className="space-y-6">
					<div>
						<h2 className="text-2xl font-semibold mb-4">My Offers</h2>
						<Suspense fallback={<div>Loading...</div>}>
							<UserOffers />
						</Suspense>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfilePage;
