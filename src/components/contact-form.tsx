"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

// PRD Section 7.4 — Freelance contact form
// Fields: name, email, project description, budget, timeline, referral
// Honeypot spam protection, no CAPTCHA
export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      project: formData.get("project") as string,
      budget: formData.get("budget") as string,
      timeline: formData.get("timeline") as string,
      referral: formData.get("referral") as string,
      honeypot: formData.get("website") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("sent");
      } else {
        const json = await res.json();
        setStatus("error");
        setErrorMessage(json.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  }

  if (status === "sent") {
    return (
      <div>
        <p>Thanks — I&apos;ll get back to you within 24 hours.</p>
      </div>
    );
  }

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    background: "var(--bg-primary)",
    color: "var(--text-primary)",
    border: "1px solid var(--border)",
    fontSize: "16px",
    fontFamily: "var(--font-sans)",
    outline: "none",
    borderRadius: 0,
    display: "block",
    marginTop: "8px",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    fontSize: "14px",
    color: "var(--text-secondary)",
    display: "block",
    marginBottom: "4px",
  };

  const fieldStyle = {
    marginBottom: "24px",
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Honeypot field — hidden from users, catches bots */}
      <div style={{ display: "none" }} aria-hidden="true">
        <label htmlFor="website">Website (leave blank)</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div style={fieldStyle}>
        <label htmlFor="name" style={labelStyle}>
          Name <span style={{ color: "var(--text-muted)" }}>*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          style={inputStyle}
          disabled={status === "sending"}
        />
      </div>

      <div style={fieldStyle}>
        <label htmlFor="email" style={labelStyle}>
          Email <span style={{ color: "var(--text-muted)" }}>*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          style={inputStyle}
          disabled={status === "sending"}
        />
      </div>

      <div style={fieldStyle}>
        <label htmlFor="project" style={labelStyle}>
          What do you need built? <span style={{ color: "var(--text-muted)" }}>*</span>
        </label>
        <textarea
          id="project"
          name="project"
          required
          rows={6}
          placeholder="Describe your project in a few sentences. What problem are you solving?"
          style={{ ...inputStyle, resize: "vertical" }}
          disabled={status === "sending"}
        />
      </div>

      <div style={fieldStyle}>
        <label htmlFor="budget" style={labelStyle}>
          Budget range <span style={{ color: "var(--text-muted)" }}>*</span>
        </label>
        <select
          id="budget"
          name="budget"
          required
          style={inputStyle}
          disabled={status === "sending"}
        >
          <option value="">Select a range</option>
          <option value="under-1000">Under $1,000</option>
          <option value="1000-5000">$1,000 – $5,000</option>
          <option value="5000-15000">$5,000 – $15,000</option>
          <option value="15000-plus">$15,000+</option>
          <option value="not-sure">Not sure yet</option>
        </select>
      </div>

      <div style={fieldStyle}>
        <label htmlFor="timeline" style={labelStyle}>
          Timeline
        </label>
        <select
          id="timeline"
          name="timeline"
          style={inputStyle}
          disabled={status === "sending"}
        >
          <option value="">Select a timeline</option>
          <option value="asap">ASAP</option>
          <option value="1-2-months">1–2 months</option>
          <option value="3-plus-months">3+ months</option>
          <option value="exploring">No rush, just exploring</option>
        </select>
      </div>

      <div style={fieldStyle}>
        <label htmlFor="referral" style={labelStyle}>
          How did you find me?
        </label>
        <input
          type="text"
          id="referral"
          name="referral"
          style={inputStyle}
          disabled={status === "sending"}
        />
      </div>

      {status === "error" && (
        <p style={{ color: "#C0392B", fontSize: "14px", marginBottom: "16px" }}>
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        style={{
          background: "var(--text-primary)",
          color: "var(--bg-primary)",
          border: "none",
          padding: "12px 24px",
          fontSize: "16px",
          fontFamily: "var(--font-sans)",
          cursor: status === "sending" ? "not-allowed" : "pointer",
          opacity: status === "sending" ? 0.7 : 1,
          borderRadius: 0,
          textDecoration: "none",
          display: "inline-block",
        }}
      >
        {status === "sending" ? "Sending…" : "Send Project Details"}
      </button>

      <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "16px" }}>
        By submitting this form, you agree to our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </form>
  );
}
