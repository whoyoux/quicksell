import type { User, Session } from "better-auth";

function UserDebug({ session, user }: { session: Session; user: User }) {
	return (
		<div>
			User data: <pre>{JSON.stringify(session, null, 2)}</pre>
			<br />
			User data: <pre>{JSON.stringify(user, null, 2)}</pre>
		</div>
	);
}

export default UserDebug;
