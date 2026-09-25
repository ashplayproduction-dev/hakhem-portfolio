"use client";

/**
 * ContactTerminal.tsx
 * ────────────────────
 * The expanded "Production Desk" modal for the Contact Section.
 * Replaces the simulated cyberpunk terminal with a high-craft Editorial
 * Consultation Desk with real accessible inline error validation,
 * mailto action dispatch, and message-copy fallback.
 */

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  SendIcon,
  MailIcon,
  PhoneIcon,
  CheckIcon,
  ArrowRightIcon,
  SparklesIcon,
} from "@/components/icons";

interface ContactTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INQUIRY_TYPES = [
  "Video Editing",
  "Tournament Directing",
  "Photojournalism",
  "Creative Collaboration",
] as const;

type InquiryType = (typeof INQUIRY_TYPES)[number];

const MORPH_SPRING = { type: "spring" as const, bounce: 0.35 };
const BTN_SPRING = { type: "spring" as const, stiffness: 500, damping: 24 };

export default function ContactTerminal({ isOpen, onClose }: ContactTerminalProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState<InquiryType>("Video Editing");
  const [details, setDetails] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; details?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Keyboard: close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus first input when modal opens
  useEffect(() => {
    if (isOpen && !submitted) {
      const t = setTimeout(() => nameRef.current?.focus(), 350);
      return () => clearTimeout(t);
    }
  }, [isOpen, submitted]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setSubmitted(false);
        setIsSubmitting(false);
        setSubmitError(null);
        setErrors({});
        setCopiedMessage(false);
        setCopiedEmail(false);
      }, 350);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Construct formatted mailto URL and raw body
  const formattedBody = `Hi Hakhem,\n\nName / Organization: ${name}\nEmail / Handle: ${email}\nInquiry Type: ${inquiryType}\n\nProject Scope & Timeline:\n${details}\n\nSent via Abdul Hakhem R. Serad Portfolio`;
  const mailtoUrl = `mailto:serad.abdulhakhem@gmail.com?subject=${encodeURIComponent(
    `Inquiry: [${inquiryType}] from ${name}`
  )}&body=${encodeURIComponent(formattedBody)}`;

  const validate = () => {
    const nextErrors: { name?: string; email?: string; details?: string } = {};

    if (!name.trim() || name.trim().length < 2) {
      nextErrors.name = "Please enter your name or organization name.";
    }

    if (!email.trim() || !email.includes("@") || email.trim().length < 5) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!details.trim() || details.trim().length < 10) {
      nextErrors.details = "Please share at least a few details about your project or event.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "28070792-2986-4f36-95ee-7e8e7dbd57fc",
          name: name.trim(),
          email: email.trim(),
          inquiry_type: inquiryType,
          message: details.trim(),
          subject: `Portfolio Inquiry: [${inquiryType}] from ${name.trim()}`,
          from_name: `${name.trim()} via Hakhem Portfolio`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setSubmitError(data.message || "Failed to deliver message. Please try again or email Hakhem directly.");
      }
    } catch {
      setSubmitError("Network connection error. Please verify your connection or email directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyMessage = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(formattedBody);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 3000);
    }
  };

  const handleCopyEmail = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("serad.abdulhakhem@gmail.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 3000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Frosted backdrop */}
          <motion.div
            key="ct-backdrop"
            className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden={true}
          />

          {/* Morphing Production Desk Card */}
          <motion.div
            key="ct-card"
            layoutId="contact-morph"
            role="dialog"
            aria-modal="true"
            aria-label="Editorial Production Desk — Start a Project"
            transition={MORPH_SPRING}
            className="relative z-10 w-full max-w-xl my-auto overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl shadow-black/80"
          >
            {/* Top accent line */}
            <div
              aria-hidden={true}
              className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"
            />

            <div className="relative p-6 sm:p-8">
              {/* Header */}
              <div className="mb-6 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-400/20 bg-neutral-950 text-amber-400">
                    <SendIcon size={18} />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-neutral-100 tracking-tight">
                      Editorial Production Desk
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Reach Hakhem for video editing, tournament direction, or press coverage.
                    </p>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-700 bg-neutral-800/80 text-sm text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white cursor-pointer"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              {/* SUCCESS STATE */}
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                    className="py-6 text-center"
                  >
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      <CheckIcon size={24} />
                    </div>

                    <h4 className="text-xl font-bold text-neutral-100">
                      Inquiry Dispatched Directly to Hakhem!
                    </h4>
                    <p className="mt-2 text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
                      Thank you, <span className="text-neutral-200 font-medium">{name}</span>! Your project details have been successfully delivered to Hakhem&apos;s personal inbox. Expect a prompt response within 24 hours.
                    </p>

                    <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={handleCopyMessage}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-700 bg-neutral-800 px-5 py-2.5 text-xs sm:text-sm font-medium text-neutral-200 hover:bg-neutral-750 transition-all cursor-pointer"
                      >
                        {copiedMessage ? <CheckIcon size={16} className="text-amber-400" /> : <SparklesIcon size={16} />}
                        <span>{copiedMessage ? "Summary Copied!" : "Copy Summary"}</span>
                      </button>

                      <a
                        href={mailtoUrl}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-800 border border-neutral-700 px-5 py-2.5 text-xs sm:text-sm font-medium text-neutral-200 hover:text-white hover:bg-neutral-700 transition-all cursor-pointer"
                      >
                        <MailIcon size={16} />
                        <span>Send Direct Email</span>
                      </a>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="font-mono text-xs text-amber-400 hover:text-amber-300 underline cursor-pointer"
                      >
                        {copiedEmail ? "Copied: serad.abdulhakhem@gmail.com" : "Copy email: serad.abdulhakhem@gmail.com"}
                      </button>
                    </div>

                    <div className="mt-8 pt-6 border-t border-neutral-800 flex justify-center">
                      <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full border border-neutral-700 bg-neutral-800 px-6 py-2 text-xs font-semibold text-neutral-200 hover:text-white hover:bg-neutral-700 transition-colors cursor-pointer"
                      >
                        Close Desk
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* FORM STATE */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate={false}
                    className="space-y-4"
                  >
                    {submitError && (
                      <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-xs text-rose-300 flex items-start gap-2">
                        <span className="text-sm leading-none">⚠</span>
                        <div className="flex-1">
                          <p className="font-semibold">Unable to dispatch message</p>
                          <p className="mt-0.5 text-rose-300/80">{submitError}</p>
                        </div>
                      </div>
                    )}
                    {/* Inquiry Type Chips */}
                    <div>
                      <label className="block font-mono text-xs text-neutral-300 mb-2">
                        Select Inquiry Category
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {INQUIRY_TYPES.map((type) => {
                          const isSelected = inquiryType === type;
                          return (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setInquiryType(type)}
                              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer active:scale-[0.97] ${
                                isSelected
                                  ? "border border-amber-400/40 bg-amber-400/10 text-amber-300"
                                  : "border border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200"
                              }`}
                            >
                              {type}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Name Field */}
                    <div>
                      <label htmlFor="ct-name" className="block text-xs font-medium text-neutral-300 mb-1.5">
                        Your Name / Organization <span className="text-amber-400">*</span>
                      </label>
                      <input
                        ref={nameRef}
                        id="ct-name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        placeholder="e.g. Maria Santos or Sarimanok Esports Hub"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "ct-name-error" : undefined}
                        className={`w-full rounded-xl border px-4 py-2.5 text-sm text-neutral-100 placeholder-neutral-500 transition-all focus:outline-none ${
                          errors.name
                            ? "border-rose-500/50 bg-rose-500/10 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                            : "border-neutral-800 bg-neutral-950 focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/60"
                        }`}
                      />
                      {errors.name && (
                        <p id="ct-name-error" role="alert" className="mt-1 text-xs text-rose-400 flex items-center gap-1 font-medium">
                          <span>⚠</span> {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="ct-email" className="block text-xs font-medium text-neutral-300 mb-1.5">
                        Email Address <span className="text-amber-400">*</span>
                      </label>
                      <input
                        id="ct-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        placeholder="yourname@domain.com"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "ct-email-error" : undefined}
                        className={`w-full rounded-xl border px-4 py-2.5 text-sm text-neutral-100 placeholder-neutral-500 transition-all focus:outline-none ${
                          errors.email
                            ? "border-rose-500/50 bg-rose-500/10 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                            : "border-neutral-800 bg-neutral-950 focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/60"
                        }`}
                      />
                      {errors.email && (
                        <p id="ct-email-error" role="alert" className="mt-1 text-xs text-rose-400 flex items-center gap-1 font-medium">
                          <span>⚠</span> {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Details Field */}
                    <div>
                      <label htmlFor="ct-details" className="block text-xs font-medium text-neutral-300 mb-1.5">
                        Project Scope &amp; Details <span className="text-amber-400">*</span>
                      </label>
                      <textarea
                        id="ct-details"
                        rows={3}
                        value={details}
                        onChange={(e) => {
                          setDetails(e.target.value);
                          if (errors.details) setErrors((prev) => ({ ...prev, details: undefined }));
                        }}
                        placeholder="Tell Hakhem about your project scope, turnaround time, or event details..."
                        aria-invalid={!!errors.details}
                        aria-describedby={errors.details ? "ct-details-error" : undefined}
                        className={`w-full resize-none rounded-xl border px-4 py-2.5 text-sm text-neutral-100 placeholder-neutral-500 transition-all focus:outline-none ${
                          errors.details
                            ? "border-rose-500/50 bg-rose-500/10 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                            : "border-neutral-800 bg-neutral-950 focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/60"
                        }`}
                      />
                      {errors.details && (
                        <p id="ct-details-error" role="alert" className="mt-1 text-xs text-rose-400 flex items-center gap-1 font-medium">
                          <span>⚠</span> {errors.details}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 py-3 text-sm font-semibold tracking-wide text-amber-950 transition-all hover:bg-amber-300 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-amber-950 border-t-transparent" />
                          <span>Dispatching Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <SendIcon size={16} />
                          <span>Prepare &amp; Send Message</span>
                        </>
                      )}
                    </button>

                    {/* Direct Contact Channels Footer */}
                    <div className="mt-6 pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-neutral-400">
                      <div className="flex items-center gap-1.5">
                        <MailIcon size={13} className="text-amber-400" />
                        <span>serad.abdulhakhem@gmail.com</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <PhoneIcon size={13} className="text-neutral-400" />
                        <span>0938-835-0649</span>
                      </div>
                      <div className="text-neutral-500">
                        Asia/Manila (GMT+8)
                      </div>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
