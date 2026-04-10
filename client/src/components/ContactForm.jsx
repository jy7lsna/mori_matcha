import React, { useState } from "react";
import api from "../api/client.js";

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in all fields.");
      setStatus("error");
      return;
    }

    try {
      await api.post("/contacts", form);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError("Unable to send message. Please try again later.");
    }
  };

  return (
    <section className="contact reveal" id="contact">
      <div className="contact-inner">
        <div>
          <p className="section-label">Contact</p>
          <h2 className="section-title">Say hello</h2>
          <p className="contact-desc">
            Private events, collaborations, or just a quick note - drop us a line and we will get back to you.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label className="contact-label">
            Name
            <input name="name" value={form.name} onChange={handleChange} type="text" placeholder="Your name" />
          </label>
          <label className="contact-label">
            Email
            <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="you@example.com" />
          </label>
          <label className="contact-label">
            Message
            <textarea name="message" value={form.message} onChange={handleChange} rows="4" placeholder="Tell us what is on your mind" />
          </label>
          {status === "error" && <p className="form-error">{error}</p>}
          {status === "success" && <p className="form-success">Thanks for reaching out. We will reply soon.</p>}
          <button className="btn-primary" type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
