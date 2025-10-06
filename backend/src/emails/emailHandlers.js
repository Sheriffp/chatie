import { resendClient, sender } from "../config/resend.js";
import { createWelcomeEmailTemplate } from "../emails/emailTemplates.js";

export const sendWelcomeEmail = async (email, name, clientUrl) => {
	const { data, error } = await resendClient.emails.send({
		from: `${sender.name} <${sender.email}>`,
		to: "monday45live@gmail.com",
		subject: "Welcome to Chatie!",
		html: createWelcomeEmailTemplate(name, clientUrl)
	});
	if (error) {
		console.error(error, "Error sending welcome email");
		throw new Error("Failed to send welcome email");
	}

	console.log("Welcome email sent successfully", data);
};
