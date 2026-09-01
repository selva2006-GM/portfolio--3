import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHTML(value = "") {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed"
        });
    }

    try {
        const {
            name,
            email,
            message,
            attachment
        } = req.body || {};

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Name, email and message are required."
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address."
            });
        }

        if (name.length > 100) {
            return res.status(400).json({
                success: false,
                message: "Name is too long."
            });
        }

        if (message.length > 5000) {
            return res.status(400).json({
                success: false,
                message: "Message is too long."
            });
        }

        const safeName = escapeHTML(name);
        const safeEmail = escapeHTML(email);
        const safeMessage = escapeHTML(message)
            .replace(/\n/g, "<br>");

        const emailOptions = {
            from: "Portfolio <contact@selvacodes.online>",

            to: [
                "selvaganesh.s2006@gmail.com"
            ],

            replyTo: email,

            subject: `Portfolio Message from ${name}`,

            html: `
                <h2>New Portfolio Message</h2>

                <p>
                    <strong>Name:</strong>
                    ${safeName}
                </p>

                <p>
                    <strong>Email:</strong>
                    ${safeEmail}
                </p>

                <hr>

                <p>
                    <strong>Message:</strong>
                </p>

                <p>
                    ${safeMessage}
                </p>

                <hr>

                <p>
                    Sent from <strong>selvacodes.online</strong>
                </p>
            `
        };

        // Add uploaded file
        if (attachment) {
            emailOptions.attachments = [
                {
                    filename: attachment.filename,
                    content: attachment.content
                }
            ];
        }

        const { data, error } =
            await resend.emails.send(emailOptions);

        if (error) {
            console.error("Resend error:", error);

            return res.status(500).json({
                success: false,
                message: "Failed to send email."
            });
        }

        console.log("Email sent:", data.id);

        return res.status(200).json({
            success: true,
            message: "Message sent successfully!",
            id: data.id
        });

    } catch (error) {
        console.error("Server error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong."
        });
    }
}