"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CONTACT, SITE } from "@/lib/data";
import { Magnetic } from "@/components/ui/Magnetic";

const ease = [0.16, 1, 0.3, 1] as const;

function Field({
  id,
  label,
  type = "text",
  required,
  value,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="group relative">
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        className="peer w-full border-b border-ink-500 bg-transparent pb-3 pt-6 text-ivory outline-none transition-colors focus:border-gold"
        aria-required={required}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-6 text-ivory-mute transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-gold peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
      >
        {label}
        {required && <span className="text-gold"> *</span>}
      </label>
    </div>
  );
}

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    business: "",
    company: "", // honeypot
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (form.company) return; // bot trap
    const subject = encodeURIComponent(
      form.subject || `New enquiry from ${form.name || "the website"}`
    );
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        form.business && `Business: ${form.business}`,
        "",
        "Sent via dspr.in",
      ]
        .filter(Boolean)
        .join("\n")
    );
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden py-28 sm:py-36"
    >
      {/* Mumbai influence concept — animated backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 animate-[float_9s_ease-in-out_infinite] rounded-full bg-gold/[0.06] blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[40vmax] w-[40vmax] rounded-full bg-gold-deep/[0.05] blur-3xl" />
        <span className="absolute inset-x-0 bottom-0 select-none text-center font-display text-[26vw] font-semibold leading-none text-ivory/[0.03]">
          MUMBAI
        </span>
      </div>

      <div className="container-luxe relative">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Heading + form */}
          <div className="lg:col-span-7">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-gold/60" />
              <span className="eyebrow">Contact · Careers</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, ease }}
              className="font-display text-display-md font-medium"
            >
              {CONTACT.heading}
            </motion.h2>
            <p className="mt-6 max-w-md text-ivory-dim">{CONTACT.intro}</p>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease }}
                className="mt-12 rounded-xl border border-gold/30 bg-gold/5 p-8"
              >
                <p className="font-display text-2xl text-gold">Thank you.</p>
                <p className="mt-2 text-ivory-dim">
                  Your mail client should now be open. If not, write to us
                  directly at{" "}
                  <a href={`mailto:${SITE.email}`} className="text-gold underline">
                    {SITE.email}
                  </a>
                  .
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-7">
                <div className="grid gap-7 sm:grid-cols-2">
                  <Field
                    id="name"
                    label="Name"
                    required
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                  />
                  <Field
                    id="email"
                    label="Email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                  />
                </div>
                <div className="grid gap-7 sm:grid-cols-2">
                  <Field
                    id="subject"
                    label="Subject"
                    value={form.subject}
                    onChange={(v) => setForm({ ...form, subject: v })}
                  />
                  <Field
                    id="business"
                    label="Business Name"
                    value={form.business}
                    onChange={(v) => setForm({ ...form, business: v })}
                  />
                </div>

                {/* honeypot */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="hidden"
                  value={form.company}
                  onChange={(v) => setForm({ ...form, company: v.target.value })}
                />

                <div className="mt-2">
                  <Magnetic cursor="hover">
                    <button
                      type="submit"
                      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gold px-9 py-4 font-medium uppercase tracking-widest text-ink transition-colors"
                    >
                      <span className="relative z-10">Submit</span>
                      <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
                        →
                      </span>
                      <span className="absolute inset-0 origin-left scale-x-0 bg-gold-light transition-transform duration-500 ease-luxe group-hover:scale-x-100" />
                    </button>
                  </Magnetic>
                </div>
              </form>
            )}
          </div>

          {/* Studio details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease, delay: 0.15 }}
            className="flex flex-col gap-10 lg:col-span-4 lg:col-start-9"
          >
            <div>
              <p className="eyebrow mb-4">Write to us</p>
              <a
                href={`mailto:${SITE.email}`}
                className="font-display text-2xl text-ivory transition-colors hover:text-gold"
              >
                {SITE.email}
              </a>
            </div>
            <div>
              <p className="eyebrow mb-4">Location</p>
              <p className="font-display text-2xl text-ivory">
                {CONTACT.location}
              </p>
            </div>
            <div>
              <p className="eyebrow mb-4">Follow</p>
              <div className="flex flex-col gap-2">
                <a
                  href={SITE.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory-dim transition-colors hover:text-gold"
                >
                  Instagram — @hellodspr
                </a>
                <a
                  href={SITE.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory-dim transition-colors hover:text-gold"
                >
                  Facebook — DSPRIndia
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
