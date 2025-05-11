import { z } from "zod";

export const signInSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
	password: z.string().min(8, "Password must be at least 8 characters long"),
	rememberMe: z.boolean().optional(),
});

export const signUpSchema = z
	.object({
		email: z.string().email("Please enter a valid email address"),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters long")
			.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
			.regex(/[a-z]/, "Password must contain at least one lowercase letter")
			.regex(/[0-9]/, "Password must contain at least one number")
			.regex(
				/[^A-Za-z0-9]/,
				"Password must contain at least one special character",
			),
		confirmPassword: z
			.string()
			.min(8, "Password must be at least 8 characters long"),
		terms: z.boolean().refine((data) => data, {
			message: "You must accept the terms and conditions to continue",
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match. Please make sure they are identical",
		path: ["confirmPassword"],
	});
