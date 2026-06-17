import { useState, useRef, useEffect, useCallback, createContext, useContext } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Send, CheckCircle2, ArrowRight, Building2, User, Mail,
  Phone, MessageSquare, Briefcase, AlertCircle, Loader2, Sparkles,
} from "lucide-react";

// ── Context for global modal control ──
interface ContactModalContextType {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

const ContactModalContext = createContext<ContactModalContextType>({
  open: () => {},
  close: () => {},
  isOpen: false,
});

export function useContactModal() {
  return useContext(ContactModalContext);
}

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ContactModalContext.Provider value={{ open: () => setIsOpen(true), close: () => setIsOpen(false), isOpen }}>
      {children}
      <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </ContactModalContext.Provider>
  );
}

// ── Trigger Button (drop-in replacement for mailto links) ──
export function ContactButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "white" | "outline";
}) {
  const { open } = useContactModal();
  return (
    <button onClick={open} className={className}>
      {children}
    </button>
  );
}

// ── Validation helpers ──
const validators: Record<string, (v: string) => string | null> = {
  name: (v) => {
    if (!v.trim()) return "Full name is required";
    if (v.trim().length < 2) return "Name must be at least 2 characters";
    return null;
  },
  email: (v) => {
    if (!v.trim()) return "Work email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Please enter a valid email address";
    return null;
  },
  company: (v) => {
    if (!v.trim()) return "Company name is required";
    if (v.trim().length < 2) return "Company name must be at least 2 characters";
    return null;
  },
  phone: (v) => {
    if (!v.trim()) return null; // optional
    const digits = v.replace(/\D/g, "");
    if (digits.length > 0 && digits.length < 7) return "Phone number seems too short";
    return null;
  },
  role: (v) => {
    if (!v) return "Please select your role";
    return null;
  },
  message: () => null, // optional, no validation
};

// ── Free email domain detection (non-blocking) ──
const FREE_EMAIL_DOMAINS = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com", "icloud.com", "mail.com", "protonmail.com", "zoho.com"];

function isFreeEmailDomain(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  return !!domain && FREE_EMAIL_DOMAINS.includes(domain);
}

// ── The Modal ──
function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    role: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [valid, setValid] = useState<Record<string, boolean>>({});
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const freeEmailToastShown = useRef(false);

  // Focus first input when modal opens
  useEffect(() => {
    if (isOpen && !submitted) {
      const timer = setTimeout(() => firstInputRef.current?.focus(), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, submitted]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Real-time validation for a single field
  const validateField = useCallback((field: string, value: string) => {
    const validator = validators[field];
    if (!validator) return;
    const error = validator(value);
    if (error) {
      setErrors((prev) => ({ ...prev, [field]: error }));
      setValid((prev) => ({ ...prev, [field]: false }));
    } else {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
      // Only mark valid if the field has a value (skip empty optional fields)
      setValid((prev) => ({ ...prev, [field]: !!value.trim() }));
    }
  }, []);

  // Validate all required fields at once (for submit)
  function validateAll(): boolean {
    const requiredFields = ["name", "email", "company", "role"];
    const allFields = [...requiredFields, "phone"];
    let hasErrors = false;

    allFields.forEach((field) => {
      const value = formData[field as keyof typeof formData];
      const error = validators[field]?.(value);
      if (error) {
        hasErrors = true;
        setErrors((prev) => ({ ...prev, [field]: error }));
        setValid((prev) => ({ ...prev, [field]: false }));
      }
    });

    // Mark all required fields as touched
    setTouched((prev) => {
      const next = { ...prev };
      requiredFields.forEach((f) => { next[f] = true; });
      return next;
    });

    return !hasErrors;
  }

  function handleBlur(field: string) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const value = formData[field as keyof typeof formData];
    validateField(field, value);

    // Show soft warning toast for free email domains (non-blocking)
    if (field === "email" && !freeEmailToastShown.current && isFreeEmailDomain(value)) {
      freeEmailToastShown.current = true;
      toast.warning("We recommend using your work email", {
        description: "A company email helps us tailor the review to your organization and speeds up scheduling.",
        duration: 6000,
      });
    }
  }

  function updateField(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Re-validate on change only if the field has been touched
    if (touched[field]) {
      validateField(field, value);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateAll()) return;

    setSubmitting(true);
    // Simulate API call — replace with real endpoint when backend is connected
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSubmitting(false);
    setSubmitted(true);
  }

  function handleClose() {
    onClose();
    // Reset after animation completes
    setTimeout(() => {
      setSubmitted(false);
      setSubmitting(false);
      setFormData({ name: "", email: "", company: "", phone: "", role: "", message: "" });
      setErrors({});
      setTouched({});
      setValid({});
      freeEmailToastShown.current = false;
    }, 300);
  }

  // Count validated required fields for progress indicator
  const requiredFields = ["name", "email", "company", "role"];
  const completedCount = requiredFields.filter((f) => valid[f]).length;
  const progressPct = (completedCount / requiredFields.length) * 100;

  const roles = [
    "VP/Director of Operations",
    "Plant Manager",
    "Continuous Improvement Lead",
    "Quality Manager",
    "IT/OT Director",
    "C-Suite Executive",
    "Other",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Progress bar header */}
            <div className="h-1.5 bg-gray-100 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[oklch(0.55_0.2_255)] via-[oklch(0.6_0.18_230)] to-[oklch(0.55_0.2_255)]"
                initial={{ width: "0%" }}
                animate={{ width: submitted ? "100%" : `${progressPct}%` }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              />
            </div>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-8"
                >
                  {/* Title */}
                  <div className="mb-6">
                    <h2 className="font-display text-2xl font-bold text-gray-900 mb-1.5">
                      Request an Executive Platform Review
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Share your details and we will schedule a focused walkthrough of EKAS tailored to your plant environment.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    {/* Name + Email row */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        ref={firstInputRef}
                        icon={<User className="w-4 h-4" />}
                        label="Full Name"
                        required
                        error={touched.name ? errors.name : undefined}
                        isValid={valid.name}
                        value={formData.name}
                        onChange={(v) => updateField("name", v)}
                        onBlur={() => handleBlur("name")}
                        placeholder="Jane Smith"
                      />
                      <FormField
                        icon={<Mail className="w-4 h-4" />}
                        label="Work Email"
                        required
                        error={touched.email ? errors.email : undefined}
                        isValid={valid.email}
                        value={formData.email}
                        onChange={(v) => updateField("email", v)}
                        onBlur={() => handleBlur("email")}
                        placeholder="jane@company.com"
                        type="email"
                      />
                    </div>

                    {/* Company + Phone row */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        icon={<Building2 className="w-4 h-4" />}
                        label="Company"
                        required
                        error={touched.company ? errors.company : undefined}
                        isValid={valid.company}
                        value={formData.company}
                        onChange={(v) => updateField("company", v)}
                        onBlur={() => handleBlur("company")}
                        placeholder="Acme Manufacturing"
                      />
                      <FormField
                        icon={<Phone className="w-4 h-4" />}
                        label="Phone"
                        error={touched.phone ? errors.phone : undefined}
                        isValid={valid.phone}
                        value={formData.phone}
                        onChange={(v) => updateField("phone", v)}
                        onBlur={() => handleBlur("phone")}
                        placeholder="+1 (555) 000-0000"
                        type="tel"
                      />
                    </div>

                    {/* Role select */}
                    <div>
                      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                        <Briefcase className="w-4 h-4 text-gray-400" />
                        Your Role <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={formData.role}
                          onChange={(e) => {
                            updateField("role", e.target.value);
                            setTouched((prev) => ({ ...prev, role: true }));
                            validateField("role", e.target.value);
                          }}
                          onBlur={() => handleBlur("role")}
                          className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-white transition-all duration-200 focus:outline-none focus:ring-2 appearance-none pr-10 ${
                            touched.role && errors.role
                              ? "border-red-300 bg-red-50/50 focus:ring-red-200 focus:border-red-400"
                              : valid.role
                                ? "border-green-300 bg-green-50/30 focus:ring-green-200 focus:border-green-400"
                                : "border-gray-200 hover:border-gray-300 focus:ring-[oklch(0.55_0.2_255)]/30 focus:border-[oklch(0.55_0.2_255)]"
                          }`}
                        >
                          <option value="">Select your role...</option>
                          {roles.map((r) => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </select>
                        {/* Status icon inside select */}
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <AnimatePresence mode="wait">
                            {touched.role && errors.role ? (
                              <motion.div key="err" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.15 }}>
                                <AlertCircle className="w-4 h-4 text-red-400" />
                              </motion.div>
                            ) : valid.role ? (
                              <motion.div key="ok" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.15 }}>
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                              </motion.div>
                            ) : null}
                          </AnimatePresence>
                        </div>
                      </div>
                      <AnimatePresence>
                        {touched.role && errors.role && (
                          <motion.p
                            initial={{ opacity: 0, height: 0, y: -4 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                            className="text-xs text-red-500 mt-1 flex items-center gap-1"
                          >
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            {errors.role}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                        <MessageSquare className="w-4 h-4 text-gray-400" />
                        What challenge would you like to explore?
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => updateField("message", e.target.value)}
                        rows={3}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[oklch(0.55_0.2_255)]/30 focus:border-[oklch(0.55_0.2_255)] resize-none"
                        placeholder="e.g., We're struggling with OEE accuracy across 3 stamping lines..."
                      />
                      {formData.message.length > 0 && (
                        <p className="text-[11px] text-gray-400 text-right mt-0.5">
                          {formData.message.length} / 500
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[oklch(0.55_0.2_255)] to-[oklch(0.48_0.2_255)] text-white font-bold text-sm rounded-lg hover:shadow-xl hover:shadow-[oklch(0.55_0.2_255_/_0.3)] hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.97] shadow-lg shadow-[oklch(0.55_0.2_255_/_0.15)] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Submit Request
                        </>
                      )}
                    </button>

                    {/* Field completion hint */}
                    <div className="flex items-center justify-center gap-2">
                      <div className="flex gap-1">
                        {requiredFields.map((f) => (
                          <motion.div
                            key={f}
                            className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                              valid[f] ? "bg-[oklch(0.55_0.2_255)]" : "bg-gray-200"
                            }`}
                            animate={valid[f] ? { scale: [1, 1.4, 1] } : {}}
                            transition={{ duration: 0.3 }}
                          />
                        ))}
                      </div>
                      <p className="text-[11px] text-gray-400">
                        {completedCount === requiredFields.length
                          ? "All required fields complete"
                          : `${completedCount} of ${requiredFields.length} required fields`}
                      </p>
                    </div>
                  </form>
                </motion.div>
              ) : (
                /* ── Success Confirmation ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 py-14 text-center relative overflow-hidden"
                >
                  {/* Background decoration */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-[oklch(0.55_0.2_255_/_0.06)] rounded-full blur-[80px]" />
                  </div>

                  <div className="relative z-10">
                    {/* Animated checkmark */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-100/50"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.35, duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                      >
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                      </motion.div>
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="font-display text-2xl font-bold text-gray-900 mb-2"
                    >
                      Request Received
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto mb-8"
                    >
                      Thank you, <span className="font-semibold text-gray-700">{formData.name.split(" ")[0]}</span>. Our team will reach out within one business day to schedule your executive platform review.
                    </motion.p>

                    {/* Confirmation details */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-gray-50 rounded-xl p-4 max-w-xs mx-auto mb-8 text-left"
                    >
                      <p className="text-[10px] font-display font-bold uppercase tracking-wider text-gray-400 mb-3">Confirmation Summary</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <User className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span className="text-gray-600 truncate">{formData.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span className="text-gray-600 truncate">{formData.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Building2 className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span className="text-gray-600 truncate">{formData.company}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Briefcase className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span className="text-gray-600 truncate">{formData.role}</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* What happens next */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="flex items-center justify-center gap-2 text-xs text-gray-400 mb-6"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>We will tailor the review to {formData.company}</span>
                    </motion.div>

                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      onClick={handleClose}
                      className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-[oklch(0.55_0.2_255)] hover:bg-[oklch(0.55_0.2_255_/_0.05)] rounded-lg transition-colors cursor-pointer"
                    >
                      Close <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Reusable form field with real-time validation indicators ──
import { forwardRef } from "react";

const FormField = forwardRef<HTMLInputElement, {
  icon: React.ReactNode;
  label: string;
  required?: boolean;
  error?: string;
  isValid?: boolean;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  placeholder: string;
  type?: string;
}>(function FormField({ icon, label, required, error, isValid, value, onChange, onBlur, placeholder, type = "text" }, ref) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
        <span className="text-gray-400">{icon}</span>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all duration-200 focus:outline-none focus:ring-2 pr-9 ${
            error
              ? "border-red-300 bg-red-50/50 focus:ring-red-200 focus:border-red-400"
              : isValid
                ? "border-green-300 bg-green-50/30 focus:ring-green-200 focus:border-green-400"
                : "border-gray-200 hover:border-gray-300 focus:ring-[oklch(0.55_0.2_255)]/30 focus:border-[oklch(0.55_0.2_255)]"
          }`}
        />
        {/* Inline status icon */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <AnimatePresence mode="wait">
            {error ? (
              <motion.div
                key="error"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <AlertCircle className="w-4 h-4 text-red-400" />
              </motion.div>
            ) : isValid ? (
              <motion.div
                key="valid"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
      {/* Animated error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-red-500 mt-1 flex items-center gap-1"
          >
            <AlertCircle className="w-3 h-3 shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});

export default ContactModal;
