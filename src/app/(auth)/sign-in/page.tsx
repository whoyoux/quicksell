import SignInForm from "./form";
import Link from "next/link";

function SignInPage() {
	return (
		<div>
			<div className="flex flex-col gap-4 max-w-md mx-auto md:pt-8">
				<h2 className="text-2xl font-bold">Sign in to your account</h2>
				<SignInForm />
				<Link
					href="/sign-up"
					className="text-sm text-muted-foreground hover:underline text-center"
				>
					Don't have an account? Sign up
				</Link>
			</div>
		</div>
	);
}

export default SignInPage;
