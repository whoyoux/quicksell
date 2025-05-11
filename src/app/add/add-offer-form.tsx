"use client";

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

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { addOfferSchema } from "@/schemas/offer-schemas";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/image-uploader";

function AddOfferForm({ className }: { className?: string }) {
	const [isPending, setIsPending] = useState(false);
	const router = useRouter();

	const form = useForm<z.infer<typeof addOfferSchema>>({
		resolver: zodResolver(addOfferSchema),
		defaultValues: {
			title: "",
			description: "",
			price: 0,
			images: [],
		},
	});

	async function onSubmit(values: z.infer<typeof addOfferSchema>) {
		try {
			setIsPending(true);
			console.log("Form values:", values);
			toast.success("Offer added successfully");
			// router.push("/");
		} catch (error) {
			console.error("Error submitting form:", error);
			toast.error("An error occurred while adding the offer");
		} finally {
			setIsPending(false);
		}
	}

	return (
		<div className={cn("flex flex-col gap-4", className)}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input placeholder="iPhone 16 Pro 128GB" {...field} />
								</FormControl>
								<FormDescription>Enter name of the product</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder="I want to sell my iPhone 16 Pro 128GB"
										rows={4}
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Enter description of the product
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="price"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Price</FormLabel>
								<FormControl>
									<Input
										type="number"
										onKeyDown={(evt) =>
											["e", "E", "+", "-"].includes(evt.key) &&
											evt.preventDefault()
										}
										{...field}
									/>
								</FormControl>
								<FormDescription>Enter price of the product</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="images"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Images</FormLabel>
								<FormControl>
									<ImageUploader
										value={field.value}
										onChange={field.onChange}
									/>
								</FormControl>
								<FormDescription>
									Add up to 5 images (PNG, JPG, JPEG, GIF)
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" disabled={isPending}>
						{isPending ? "Adding offer..." : "Add offer"}
					</Button>
					<FormRootError />
				</form>
			</Form>
		</div>
	);
}

export default AddOfferForm;
