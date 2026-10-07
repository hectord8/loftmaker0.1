"use client";

import { useState } from "react";

import { site } from "@/data/site";
import styles from "./contactform.module.css";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  location: "",
  message: "",
  company: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Please try again.");
      }

      setForm(initialForm);
      setStatus("success");
    } catch (submissionError) {
      setError(submissionError.message);
      setStatus("error");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.fields}>
        <label>
          <span className={styles.labelText}>Name <span aria-hidden="true">*</span></span>
          <input name="name" value={form.name} onChange={updateField} required autoComplete="name" />
        </label>
        <label>
          <span className={styles.labelText}>Email <span aria-hidden="true">*</span></span>
          <input type="email" name="email" value={form.email} onChange={updateField} required autoComplete="email" />
        </label>
        <label>
          <span className={styles.labelText}>Phone <span aria-hidden="true">*</span></span>
          <input type="tel" name="phone" value={form.phone} onChange={updateField} required autoComplete="tel" />
        </label>
        <label>
          <span className={styles.labelText}>Project type <span aria-hidden="true">*</span></span>
          <select name="projectType" value={form.projectType} onChange={updateField} required>
            <option value="">Choose a service</option>
            <option>Loft conversion</option>
            <option>Home extension</option>
            <option>Structural steel</option>
            <option>GRP flat roofing</option>
            <option>Other renovation</option>
          </select>
        </label>
        <label>
          <span className={styles.labelText}>Project location <span aria-hidden="true">*</span></span>
          <input name="location" value={form.location} onChange={updateField} required placeholder="Town or postcode" />
        </label>
        <label className={styles.fullWidth}>
          <span className={styles.labelText}>Tell us about your project <span aria-hidden="true">*</span></span>
          <textarea name="message" value={form.message} onChange={updateField} required rows="5" />
        </label>
        <label className={styles.honeypot} aria-hidden="true">
          Company
          <input name="company" value={form.company} onChange={updateField} tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button className="siteButton siteButtonPrimary" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Get in touch"}
      </button>

      {status === "success" ? (
        <p className={styles.success} role="status">Thanks — your enquiry has been sent. We’ll be in touch soon.</p>
      ) : null}
      {status === "error" ? (
        <p className={styles.error} role="alert">{error} You can call us on <a href={`tel:+44${site.phone.slice(1)}`}>{site.phone}</a>.</p>
      ) : null}
    </form>
  );
}
