"use server";

import { prisma } from "@/lib/prisma";
import { authActionClient } from "@/lib/safe-action";
import { utapi } from "@/lib/uploadthing";
import { addOfferFormDataSchema } from "@/schemas/offer-schemas";
import { z } from "zod";

export const createOffer = authActionClient
	.schema(addOfferFormDataSchema)
	.action(
		async ({
			parsedInput: {
				title,
				description,
				price,
				firstImage,
				secondImage,
				thirdImage,
				fourthImage,
				fifthImage,
			},
			ctx: { session },
		}) => {
			const images = [
				firstImage,
				secondImage,
				thirdImage,
				fourthImage,
				fifthImage,
			].filter((image) => !!image);

			console.log(images);

			const { user } = session;

			const resultUploadingFiles = await uploadFiles(images, user.id);

			if (!resultUploadingFiles.success) {
				return {
					success: false,
					error: "Error uploading files",
				};
			}

			const offer = await prisma.offer.create({
				data: {
					title,
					description,
					price,
					images: resultUploadingFiles.files,
					user: {
						connect: {
							id: user.id,
						},
					},
				},
			});

			if (!offer) {
				return {
					success: false,
					error: "Error creating offer",
				};
			}

			return {
				success: true,
				message: "Succesfully added a new offer!",
			};
		},
	);

export const getOffer = authActionClient
	.schema(z.object({ id: z.string() }))
	.action(async ({ parsedInput: { id } }) => {
		try {
			const offer = await prisma.offer.findUnique({
				where: { id },
				include: {
					user: {
						select: {
							id: true,
							name: true,
							email: true,
							image: true,
						},
					},
				},
			});

			if (!offer) {
				return {
					success: false,
					error: "Offer not found",
				};
			}

			return {
				success: true,
				offer,
			};
		} catch (error) {
			console.error("Error fetching offer:", error);
			return {
				success: false,
				error: "Error fetching offer",
			};
		}
	});

const generateFilename = async (file: File, userId: string) => {
	const ext = file.type.split("/")[1];
	return `${userId}-${Date.now()}.${ext}`;
};

type UploadFilesResponse =
	| {
			success: true;
			message: string;
			files: string[];
	  }
	| {
			success: false;
			error: string;
	  };
const uploadFiles = async (
	files: File[],
	userId: string,
): Promise<UploadFilesResponse> => {
	try {
		// Przygotowanie plików z nowymi nazwami
		const preparedFiles = await Promise.all(
			files.map(async (file) => {
				const filename = await generateFilename(file, userId);
				return new File([file], filename, { type: file.type });
			}),
		);

		// Przesyłanie plików
		const uploadedFiles = await utapi.uploadFiles(preparedFiles);

		// Sprawdzenie błędów
		if (
			uploadedFiles.some((file) => file.error) ||
			!uploadedFiles.every((file) => !!file.data)
		) {
			return {
				success: false,
				error: "Error uploading files",
			};
		}

		// Zwrócenie adresów URL przesłanych plików
		return {
			success: true,
			message: "Files uploaded successfully",
			files: uploadedFiles.map((file) => file.data.ufsUrl),
		};
	} catch (error) {
		console.error("Błąd podczas przesyłania plików:", error);
		return {
			success: false,
			error: "Error uploading files",
		};
	}
};
