"use client";

import { signInSchema } from "@/schemas/auth-schemas";
import type { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormRootError,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import LoginWithDiscordButton from "@/components/login-with-discord-button";
import { Checkbox } from "@/components/ui/checkbox";
import { signIn } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { PasswordInput } from "@/components/password-input";

function SignInForm({ className }: { className?: string }) {
	const [isPending, setIsPending] = useState(false);
	const router = useRouter();

	const form = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
	});

	async function onSubmit(values: z.infer<typeof signInSchema>) {
		await signIn.email(
			{
				email: values.email,
				password: values.password,
				rememberMe: values.rememberMe,
				callbackURL: "/",
			},
			{
				onRequest: (ctx) => {
					setIsPending(true);
				},
				onResponse: (ctx) => {
					setIsPending(false);
				},
				onSuccess: (ctx) => {
					toast.success("Signed in successfully");
					router.push("/");
				},
				onError: (ctx) => {
					console.log("[SIGN IN ERROR]: ", ctx);
					if (ctx.error?.code === "INVALID_EMAIL_OR_PASSWORD") {
						form.setError("root", {
							type: "manual",
							message:
								"Invalid email or password. Please check your credentials and try again.",
						});
					} else {
						toast.error("Failed to sign in. Please try again later.");
					}
				},
			},
		);
	}

	return (
		<div className={cn("flex flex-col gap-4", className)}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="example@email.com" {...field} />
								</FormControl>
								<FormDescription>Enter your email to sign in.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<PasswordInput {...field} />
								</FormControl>
								<FormDescription>
									Enter your password to sign in.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="rememberMe"
						render={({ field }) => (
							<FormItem className="flex flex-col space-y-2 rounded-md border p-4">
								<div className="flex flex-row items-start space-x-3">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<div className="space-y-1 leading-none">
										<FormLabel>Do not logout</FormLabel>
										<FormDescription>
											Remember me on this device.
										</FormDescription>
									</div>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormRootError />

					<Button type="submit" className="w-full" disabled={isPending}>
						{isPending ? "Signing in..." : "Sign in"}
					</Button>
				</form>
			</Form>
			<Separator />
			<LoginWithDiscordButton />
		</div>
	);
}

const Separator = () => {
	return (
		<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
			<span className="relative z-10 bg-background px-2 text-muted-foreground">
				Or continue with
			</span>
		</div>
	);
};

export default SignInForm;
