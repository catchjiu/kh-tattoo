"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Check, PenLine } from "lucide-react";
import { submitBooking } from "@/app/contact/actions";
import { BookingReferenceUpload } from "./BookingReferenceUpload";

const STEPS = [
  { id: 1, title: "Your details", key: "details" },
  { id: 2, title: "Your vision", key: "vision" },
  { id: 3, title: "Preferences", key: "preferences" },
  { id: 4, title: "Confirm", key: "confirm" },
];

const STYLES = ["Traditional", "Fine-line", "Realism", "Blackwork", "Japanese", "Neo-traditional", "Other"];
const SIZES = ["Small (under 1 hour)", "Medium (1–3 hours)", "Large (half day)", "Full sleeve / day"];

type Props = {
  artists: { id: string; name: string }[];
};

export function BookingForm({ artists }: Props) {
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [referenceUrl, setReferenceUrl] = useState<string | null>(null);

  const formId = "booking-form";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    if (referenceUrl) formData.set("reference_url", referenceUrl);
    const result = await submitBooking(formData);
    setLoading(false);
    if (result?.error) {
      setError(result.error);
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-md border border-[var(--accent-gold)] bg-[var(--accent-gold-muted)] p-12 text-center"
      >
        <Check className="mx-auto mb-4 text-[var(--accent-gold)]" size={48} strokeWidth={1.5} />
        <h2 className="font-serif text-2xl font-medium">Thank you</h2>
        <p className="mt-2 text-[var(--muted)]">
          Your booking request has been received. We&apos;ll be in touch within 24–48 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress */}
      <div className="mb-6 flex items-center justify-between">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <button
              type="button"
              onClick={() => setStep(s.id)}
              className={`flex items-center gap-1.5 text-sm transition-colors ${
                step >= s.id ? "text-[var(--accent-gold)]" : "text-[var(--muted)]"
              }`}
            >
              {step > s.id ? (
                <Check size={16} strokeWidth={2} />
              ) : (
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-current">
                  {s.id}
                </span>
              )}
              <span className="hidden sm:inline">{s.title}</span>
            </button>
            {i < STEPS.length - 1 && (
              <div
                className={`mx-2 h-px w-6 sm:w-12 ${
                  step > s.id ? "bg-[var(--accent-gold)]" : "bg-[var(--border)]"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <form id={formId} onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-md border border-[var(--accent-crimson)] bg-[var(--accent-crimson-muted)] px-4 py-2 text-sm text-[var(--accent-crimson)]">
            {error}
          </div>
        )}

        {/* All steps rendered to keep form data in DOM on submit */}
        <div className={step !== 1 ? "hidden" : ""}>
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
              <h3 className="font-serif text-lg font-medium text-[var(--accent-gold)]">
                Step 1 — Your details
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-[var(--muted)]">Name *</label>
                  <input
                    name="name"
                    required
                    className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[var(--foreground)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--muted)]">Email *</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[var(--foreground)]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--muted)]">Phone</label>
                <input
                  name="phone"
                  type="tel"
                  className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[var(--foreground)]"
                />
              </div>
          </motion.div>
        </div>

        <div className={step !== 2 ? "hidden" : ""}>
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
              <h3 className="font-serif text-lg font-medium text-[var(--accent-gold)]">
                Step 2 — Your vision
              </h3>
              <div>
                <label className="block text-sm font-medium text-[var(--muted)]">Style</label>
                <select
                  name="style"
                  className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[var(--foreground)]"
                >
                  <option value="">Select a style</option>
                  {STYLES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--muted)]">Placement</label>
                <input
                  name="placement"
                  placeholder="e.g. arm, back, leg"
                  className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[var(--foreground)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--muted)]">Size</label>
                <select
                  name="size"
                  className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[var(--foreground)]"
                >
                  <option value="">Select size</option>
                  {SIZES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--muted)]">Describe your idea</label>
                <textarea
                  name="description"
                  rows={4}
                  placeholder="Tell us about your tattoo vision, reference images, or inspiration..."
                  className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[var(--foreground)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--muted)]">Reference photo</label>
                <BookingReferenceUpload value={referenceUrl} onChange={setReferenceUrl} />
              </div>
          </motion.div>
        </div>

        <div className={step !== 3 ? "hidden" : ""}>
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
              <h3 className="font-serif text-lg font-medium text-[var(--accent-gold)]">
                Step 3 — Preferences
              </h3>
              <div>
                <label className="block text-sm font-medium text-[var(--muted)]">Preferred artist</label>
                <select
                  name="preferred_artist_id"
                  className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[var(--foreground)]"
                >
                  <option value="">No preference</option>
                  {artists.map((a) => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--muted)]">When would you like to book?</label>
                <input
                  name="preferred_date"
                  placeholder="e.g. Next month, flexible"
                  className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[var(--foreground)]"
                />
              </div>
          </motion.div>
        </div>

        <div className={step !== 4 ? "hidden" : ""}>
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
              <h3 className="font-serif text-lg font-medium text-[var(--accent-gold)]">
                Step 4 — Confirm & submit
              </h3>
              <p className="text-[var(--muted)]">
                Review your details and submit. We&apos;ll be in touch to confirm your session.
              </p>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-[var(--accent-gold)] px-6 py-4 font-medium text-[#121212] transition-colors hover:bg-[#d4af37] disabled:opacity-50"
              >
                {loading ? (
                  "Submitting…"
                ) : (
                  <>
                    <PenLine size={20} strokeWidth={1.5} />
                    Submit booking request
                  </>
                )}
              </button>
          </motion.div>
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className="rounded-md border border-[var(--border)] px-4 py-2 text-sm hover:bg-[var(--border)] disabled:opacity-40 disabled:hover:bg-transparent"
          >
            Back
          </button>
          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep((s) => Math.min(4, s + 1))}
              className="flex items-center gap-2 rounded-md bg-[var(--accent-gold)] px-4 py-2 text-sm font-medium text-[#121212] hover:bg-[#d4af37]"
            >
              Next
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}
