import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const { data, error } = await resend.batch.send([
  {
    from: "Acme <onboarding@resend.dev>",
    to: ["delivered@resend.dev"],
    subject: "Welcome to Acme",
    html: "<p>Thanks for signing up!</p>",
  },
  {
    from: "Acme <onboarding@resend.dev>",
    to: ["delivered@resend.dev"],
    subject: "Order Confirmation",
    html: "<p>Your order has been confirmed.</p>",
  },
]);

if (error) {
  console.error("Resend error:", error);
} else {
  console.log("Success:", data);
}