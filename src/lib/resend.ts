import "server-only";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type SendEmailResponse =
	| {
			success: true;
			response: Awaited<ReturnType<typeof resend.emails.send>>;
	  }
	| {
			success: false;
			error: unknown;
	  };

export const sendEmail = async (
	to: string,
	subject: string,
	text: string,
): Promise<SendEmailResponse> => {
	try {
		const response = await resend.emails.send({
			from: "quicksell <quicksell@whoyoux.com>",
			to,
			subject,
			text,
		});
		return {
			success: true,
			response,
		};
	} catch (error) {
		console.error("[RESEND ERROR]: ", error);
		return {
			success: false,
			error,
		};
	}
};
