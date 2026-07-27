import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }

  try {
    const { name, email, message } = req.body;

    const data = await resend.emails.send({
      from: "contact@selvacodes.online",
      to: "selvaganesh.s2006@gmail.com",
      subject: `Portfolio Message from ${name}`,
      html: `
        <h2>New Portfolio Message</h2>

        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `
    });

    return res.status(200).json({
      success: true,
      data
    });

  } catch (error) {
  console.error("FULL ERROR:", error);

  return res.status(500).json({
    success: false,
    error: error.message,
    stack: error.stack
  });
}
}