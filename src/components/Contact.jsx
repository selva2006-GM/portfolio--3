import { useState } from "react";
import { FaEnvelope, FaGithub, FaLinkedin, FaPaperclip } from "react-icons/fa";
import data from "../data.json";

export default function Contact() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [fileName, setFileName] = useState("");

    const contact = data.contact;

    async function handleSubmit(e) {
        e.preventDefault();

        if (loading) return;

        const form = e.target;
        const formData = new FormData(form);

        const name = formData.get("name")?.trim();
        const email = formData.get("email")?.trim();
        const message = formData.get("message")?.trim();
        const file = formData.get("file");

        if (!name || !email || !message) {
            setStatus("Please fill in all required fields.");
            return;
        }

        // 5 MB maximum
        if (file && file.size > 5 * 1024 * 1024) {
            setStatus("File size must be less than 5 MB.");
            return;
        }

        setLoading(true);
        setStatus("");

        try {
            let attachment = null;

            // Convert file to Base64
            if (file && file.size > 0) {
                const arrayBuffer = await file.arrayBuffer();

                const bytes = new Uint8Array(arrayBuffer);

                let binary = "";

                for (let i = 0; i < bytes.length; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }

                const base64 = btoa(binary);

                attachment = {
                    filename: file.name,
                    content: base64,
                };
            }

            const payload = {
                name,
                email,
                message,
                attachment,
            };

            const res = await fetch("/api/email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (res.ok && result.success) {
                setStatus("Message sent successfully! 🚀");
                form.reset();
                setFileName("");
            } else {
                setStatus(
                    result.message || "Failed to send message."
                );
            }

        } catch (error) {
            console.error("Contact form error:", error);
            setStatus("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    function handleFileChange(e) {
        const file = e.target.files[0];

        if (!file) {
            setFileName("");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setStatus("File size must be less than 5 MB.");
            e.target.value = "";
            setFileName("");
            return;
        }

        setStatus("");
        setFileName(file.name);
    }

    return (
        <section className="max-w-5xl mx-auto px-6 py-20 text-center">

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                {contact.title}
            </h1>

            <p className="mt-4 text-lg text-gray-600">
                {contact.subtitle}
            </p>


            {/* Social Links */}

            <div className="mt-10 flex flex-wrap justify-center gap-4">

                <a
                    href={contact.email}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:-translate-y-1 hover:bg-black hover:text-white"
                >
                    <FaEnvelope className="text-xl" />
                    Email
                </a>

                <a
                    href={contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:-translate-y-1 hover:bg-black hover:text-white"
                >
                    <FaGithub className="text-xl" />
                    GitHub
                </a>

                <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:-translate-y-1 hover:bg-black hover:text-white"
                >
                    <FaLinkedin className="text-xl" />
                    LinkedIn
                </a>

            </div>


            {/* Contact Form */}

            <form
                onSubmit={handleSubmit}
                className="mx-auto mt-12 flex max-w-2xl flex-col gap-5"
            >

                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    maxLength={100}
                    className="rounded-xl border border-gray-300 px-5 py-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />


                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    maxLength={254}
                    className="rounded-xl border border-gray-300 px-5 py-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />


                <textarea
                    name="message"
                    rows="6"
                    placeholder="Your Message"
                    required
                    maxLength={5000}
                    className="resize-none rounded-xl border border-gray-300 px-5 py-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />


                {/* File Upload */}

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-300 px-5 py-4 text-left transition hover:border-blue-500 hover:bg-gray-50">

                    <FaPaperclip className="text-xl text-gray-600" />

                    <div className="flex-1">

                        <span className="font-medium text-gray-700">
                            {fileName || "Attach a file"}
                        </span>

                        <p className="text-sm text-gray-500">
                            PDF, DOC, DOCX, JPG, PNG — max 5 MB
                        </p>

                    </div>

                    <input
                        type="file"
                        name="file"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="hidden"
                    />

                </label>


                {/* Status */}

                {status && (
                    <p className="text-sm font-medium text-gray-700">
                        {status}
                    </p>
                )}


                {/* Submit */}

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                    {loading ? "Sending..." : "Send Message"}
                </button>

            </form>

        </section>
    );
}