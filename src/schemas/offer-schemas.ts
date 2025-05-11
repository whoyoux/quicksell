import { z } from "zod";
import { zfd } from "zod-form-data";

export const addOfferSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().min(1, "Description is required"),
	price: z.coerce
		.number()
		.min(1, "Price is required, min 1")
		.max(1000000, "Price is too high, max 1000000"),
	images: z
		.array(
			z.object({
				url: z.string().url("Please enter a valid image url"),
				file: z.instanceof(File),
			}),
		)
		.min(1, "Please add at least one image"),
});

export const addOfferFormDataSchema = zfd.formData({
	title: zfd.text(z.string().min(1, "Title is required")),
	description: zfd.text(z.string().min(1, "Description is required")),
	price: zfd.numeric(
		z.coerce
			.number()
			.min(1, "Price is required, min 1")
			.max(1000000, "Price is too high, max 1000000"),
	),
	images: zfd.repeatable(
		z
			.array(
				z.object({
					url: zfd.text(z.string().url("Please enter a valid image url")),
					file: zfd.file(z.instanceof(File)),
				}),
			)
			.min(1, "Please add at least one image"),
	),
});
