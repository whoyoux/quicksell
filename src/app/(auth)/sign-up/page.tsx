import SignedInAlert from "@/components/signed-in-alert";
import SignUpForm from "./form";
import Link from "next/link";

function SignUpPage() {
	return (
		<div>
			<div className="flex flex-col gap-4 max-w-md mx-auto md:pt-8">
				<SignedInAlert />
				<h2 className="text-2xl font-bold">Create an account</h2>
				<SignUpForm />
				<Link
					href="/sign-in"
					className="text-sm text-muted-foreground hover:underline text-center"
				>
					Already have an account? Sign in
				</Link>
			</div>
		</div>
	);
}

export default SignUpPage;
