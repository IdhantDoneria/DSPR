"use client";

import { useState, type FormEvent } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { CONTACT, SITE } from "@/lib/data";
import { Magnetic } from "@/components/ui/Magnetic";
import { gmailComposeUrl } from "@/lib/utils";

// Flowing 3D silk-cloth — DSPR's signature draped fabric, rendered in WebGL.
const SilkBackdrop = dynamic(
  () => import("@/components/three/SilkBackdrop").then((m) => m.SilkBackdrop),
  { ssr: false }
);

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
        className="peer w-full rounded-md border border-indigo/20 bg-canvas-cool px-4 pb-3 pt-6 text-ink outline-none transition-colors placeholder:text-ink-mute focus:border-indigo"
        aria-required={required}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-6 text-ink-mute transition-all duration-300 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-indigo peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-xs"
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
    const subject =
      form.subject || `New enquiry from ${form.name || "the website"}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.business && `Business: ${form.business}`,
      "",
      "Sent via dspr.in",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(
      gmailComposeUrl({ to: SITE.email, subject, body }),
      "_blank",
      "noopener,noreferrer"
    );
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-canvas to-canvas-warm py-28 sm:py-36"
    >
      {/* Mumbai influence concept — animated backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 animate-[float_9s_ease-in-out_infinite] rounded-full bg-gold/[0.10] blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[40vmax] w-[40vmax] rounded-full bg-indigo/[0.06] blur-3xl" />
        {/* 3D draped silk, masked into the lower-right so type stays legible */}
        <SilkBackdrop className="absolute -right-[10%] top-0 h-full w-[70%] opacity-50 [mask-image:radial-gradient(70%_70%_at_70%_55%,black,transparent)]" />
        <span className="absolute inset-x-0 bottom-0 select-none text-center font-display text-[26vw] font-semibold leading-none text-indigo/[0.05]">
          MUMBAI
        </span>
      </div>

      <div className="container-luxe relative">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Heading + form */}
          <div className="lg:col-span-7">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-indigo/60" />
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
            <p className="mt-6 max-w-md text-ink-dim">{CONTACT.intro}</p>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease }}
                className="mt-12 rounded-xl border border-indigo/15 bg-canvas-cool p-8 shadow-[0_18px_50px_-28px_rgba(28,26,71,0.35)]"
              >
                <p className="font-display text-2xl text-indigo">Thank you.</p>
                <p className="mt-2 text-ink-dim">
                  Gmail should now be open in a new tab. If not, write to us
                  directly at{" "}
                  <a
                    href={gmailComposeUrl({ to: SITE.email })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo underline"
                  >
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
                      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-indigo px-9 py-4 font-medium uppercase tracking-widest text-canvas-cool transition-colors hover:bg-indigo-deep"
                    >
                      <span className="relative z-10">Submit</span>
                      <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
                        →
                      </span>
                      <span className="absolute inset-0 origin-left scale-x-0 bg-indigo-deep transition-transform duration-500 ease-luxe group-hover:scale-x-100" />
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
            className="flex flex-col gap-10 rounded-2xl bg-indigo-deep p-9 text-canvas shadow-[0_28px_70px_-32px_rgba(28,26,71,0.55)] lg:col-span-4 lg:col-start-9"
          >
            <div>
              <p className="eyebrow mb-4 text-gold-light">Write to us</p>
              <a
                href={gmailComposeUrl({ to: SITE.email })}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-2xl text-canvas transition-colors hover:text-gold-light"
              >
                {SITE.email}
              </a>
            </div>
            <div>
              <p className="eyebrow mb-4 text-gold-light">Location</p>
              <p className="font-display text-2xl text-canvas">
                {CONTACT.location}
              </p>
            </div>
            <div>
              <p className="eyebrow mb-4 text-gold-light">Follow</p>
              <div className="flex flex-col gap-2">
                <a
                  href={SITE.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-canvas/80 transition-colors hover:text-gold-light"
                >
                  Instagram — @hellodspr
                </a>
                <a
                  href={SITE.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-canvas/80 transition-colors hover:text-gold-light"
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
