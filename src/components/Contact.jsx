import { useState } from "react";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import data from "../Data.json";

export default function Contact() {
    const [loading, setLoading] = useState(false);

    const contact = data.contact;

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const payload = {
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
        };

        setLoading(true);

        try {
            const res = await fetch("/api/email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (res.ok && result.success) {
                alert("Message sent successfully!");
                e.target.reset();
            } else {
                alert(result.message || "Failed to send message.");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="max-w-5xl mx-auto px-6 py-20 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                {contact.title}
            </h1>

            <p className="mt-4 text-lg text-gray-600">
                {contact.subtitle}
            </p>

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

            <form
                onSubmit={handleSubmit}
                className="mx-auto mt-12 flex max-w-2xl flex-col gap-5"
            >
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    className="rounded-xl border border-gray-300 px-5 py-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    className="rounded-xl border border-gray-300 px-5 py-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />

                <textarea
                    name="message"
                    rows="6"
                    placeholder="Your Message"
                    required
                    className="rounded-xl border border-gray-300 px-5 py-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
                ></textarea>

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