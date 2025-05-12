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
import { createOffer } from "@/actions/offer-actions";

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

			// Walidacja obrazów
			if (!values.images[0]) {
				form.setError("images", {
					type: "manual",
					message: "Please add at least one image",
				});
				toast.error("Please add at least one image");
				return;
			}

			// Przygotowanie FormData
			const formData = new FormData();
			formData.append("title", values.title);
			formData.append("description", values.description);
			formData.append("price", values.price.toString());

			// Dodawanie obrazów do FormData
			values.images.forEach((image, index) => {
				if (image) {
					formData.append(
						[
							"firstImage",
							"secondImage",
							"thirdImage",
							"fourthImage",
							"fifthImage",
						][index],
						image.file,
					);
				}
			});

			// Wysyłanie oferty
			const result = await createOffer(formData);

			if (!result) {
				toast.error("Wystąpił błąd podczas dodawania oferty");
				return;
			}

			// Sprawdzamy, czy wynik zawiera błąd
			if ("error" in result && typeof result.error === "string") {
				toast.error(result.error);
				return;
			}

			// Jeśli nie ma błędu, to znaczy że oferta została dodana pomyślnie
			toast.success("Offer has been added successfully");
			router.push("/");
		} catch (error) {
			console.error("Error adding offer:", error);
			toast.error("An unexpected error occurred while adding the offer");
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
