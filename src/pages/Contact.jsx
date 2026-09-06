import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | sent

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) {
      next.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!form.message.trim()) next.message = "Message can't be empty.";
    return next;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");

    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    }, 700);
  }

  if (status === "sent") {
    return (
      <div className="px-6 py-24 text-center max-w-md mx-auto">
        <h1 className="text-2xl font-semibold mb-3">Message sent.</h1>
        <p className="text-stone">
          Thanks for reaching out — I'll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <div className="px-6 py-14">
      <p className="text-clay text-xs font-medium uppercase tracking-widest mb-3">Contact</p>
      <h1 className="text-3xl sm:text-4xl font-semibold mb-4 max-w-xl">Get in touch</h1>
      <p className="text-stone max-w-xl mb-10">
        Questions, feedback, or just want to say hi — send a message below.
      </p>

      <form onSubmit={handleSubmit} noValidate className="max-w-md space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1.5">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-stone-light bg-white px-4 py-2.5 text-sm focus:outline-none focus:border-clay transition-colors"
          />
          {errors.name && <p className="text-xs text-clay-dark mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1.5">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-stone-light bg-white px-4 py-2.5 text-sm focus:outline-none focus:border-clay transition-colors"
          />
          {errors.email && <p className="text-xs text-clay-dark mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1.5">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            className="w-full border border-stone-light bg-white px-4 py-2.5 text-sm focus:outline-none focus:border-clay transition-colors resize-none"
          />
          {errors.message && <p className="text-xs text-clay-dark mt-1">{errors.message}</p>}
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="bg-ink text-paper px-6 py-2.5 text-sm font-medium hover:bg-clay-dark transition-colors disabled:opacity-50"
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>
      </form>
    </div>
  );
}