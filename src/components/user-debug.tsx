"use client";

import { useSession } from "@/lib/auth-client";

function UserDebug() {
	const { data: session } = useSession();
	return (
		<div>
			User data: <pre>{JSON.stringify(session, null, 2)}</pre>
		</div>
	);
}

export default UserDebug;
