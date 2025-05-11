"use client";

import { signUpSchema } from "@/schemas/auth-schemas";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import LoginWithDiscordButton from "@/components/login-with-discord-button";
import { signUp } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PasswordInput } from "@/components/password-input";

function SignUpForm({ className }: { className?: string }) {
	const router = useRouter();
	const [isPending, setIsPending] = useState(false);

	const form = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
			terms: false,
		},
	});

	async function onSubmit(values: z.infer<typeof signUpSchema>) {
		await signUp.email(
			{
				email: values.email,
				password: values.password,
				name: "",
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
					toast.success(
						"Account created successfully. Check your email for a verification link.",
					);
					router.push("/");
				},
				onError: (ctx) => {
					console.log("[SIGN UP ERROR]: ", ctx);

					// Handle specific error cases
					if (ctx.error?.code === "USER_ALREADY_EXISTS") {
						form.setError("email", {
							type: "manual",
							message:
								"This email is already registered. Please use a different email or sign in.",
						});
					} else {
						toast.error("Failed to create account. Please try again later.");
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
								<FormDescription>
									Enter your email to create an account.
								</FormDescription>
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
									Enter your password to create an account.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm Password</FormLabel>
								<FormControl>
									<PasswordInput {...field} />
								</FormControl>
								<FormDescription>
									Confirm your password to create an account.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="terms"
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
										<FormLabel>Accept terms and conditions</FormLabel>
										<FormDescription>
											You must accept the terms and conditions to create an
											account.
										</FormDescription>
									</div>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" className="w-full" disabled={isPending}>
						{isPending ? "Creating an account..." : "Create an account"}
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

export default SignUpForm;
