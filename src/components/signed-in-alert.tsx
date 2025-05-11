"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSession } from "@/lib/auth-client";
import { AlertCircle } from "lucide-react";

function SignedInAlert() {
	const { data: session } = useSession();
	if (!session) return null;

	return (
		<Alert variant="destructive">
			<AlertCircle className="h-4 w-4" />
			<AlertTitle>Warning!</AlertTitle>
			<AlertDescription>
				You are already signed in. Please sign out to continue.
			</AlertDescription>
		</Alert>
	);
}

export default SignedInAlert;
