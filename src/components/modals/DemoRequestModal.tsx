"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  email: z.string().email("Valid business email required").max(255),
  company: z.string().min(1, "Company name is required").max(200),
  jobTitle: z.string().min(1, "Job title is required").max(100),
});

type FormData = z.infer<typeof formSchema>;

interface DemoRequestModalProps {
  open: boolean;
  onClose: () => void;
}

const DemoRequestModal = ({ open, onClose }: DemoRequestModalProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitterFirstName, setSubmitterFirstName] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitterFirstName(data.firstName);

    try {
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.ok) {
        // Success
        setIsSubmitted(true);
      } else if (response.status === 400) {
        // Validation error from server
        setSubmitError(result.error || "Submission failed. Please check your information and try again.");
      } else {
        // Server error or network failure
        setSubmitError(result.error || "Submission failed. Please email pat@adaptivefactory.net directly.");
      }
    } catch (error) {
      // Network error
      console.error("Form submission error:", error);
      setSubmitError("Submission failed. Please email pat@adaptivefactory.net directly and include your company name and role.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setIsSubmitted(false);
      setSubmitError(null);
      reset();
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-h3 text-primary-text">Request a Demo</DialogTitle>
              <DialogDescription className="text-body-sm text-secondary-text mt-2">
                We'll show you how EKAS approaches manufacturing intelligence with your operational context.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-primary-text mb-1.5">
                    First Name *
                  </label>
                  <input
                    {...register("firstName")}
                    type="text"
                    id="firstName"
                    className="form-input"
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="text-xs text-red-400 mt-1">{errors.firstName.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-primary-text mb-1.5">
                    Last Name *
                  </label>
                  <input
                    {...register("lastName")}
                    type="text"
                    id="lastName"
                    className="form-input"
                    placeholder="Smith"
                  />
                  {errors.lastName && (
                    <p className="text-xs text-red-400 mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary-text mb-1.5">
                  Business Email *
                </label>
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="john.smith@company.com"
                />
                {errors.email && (
                  <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-primary-text mb-1.5">
                  Company Name *
                </label>
                <input
                  {...register("company")}
                  type="text"
                  id="company"
                  className="form-input"
                  placeholder="Acme Manufacturing"
                />
                {errors.company && (
                  <p className="text-xs text-red-400 mt-1">{errors.company.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="jobTitle" className="block text-sm font-medium text-primary-text mb-1.5">
                  Job Title *
                </label>
                <input
                  {...register("jobTitle")}
                  type="text"
                  id="jobTitle"
                  className="form-input"
                  placeholder="Plant Manager"
                />
                {errors.jobTitle && (
                  <p className="text-xs text-red-400 mt-1">{errors.jobTitle.message}</p>
                )}
              </div>

              <p className="text-fine" style={{ color: "#6a7a9a", marginTop: 12 }}>
                Demo access runs against synthetic data only. Your production data is never involved.
              </p>

              {submitError && (
                <div className="p-3 rounded" style={{ backgroundColor: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)" }}>
                  <p className="text-sm" style={{ color: "#ef4444" }}>
                    {submitError.includes("pat@adaptivefactory.net") ? (
                      <>
                        {submitError.split("pat@adaptivefactory.net")[0]}
                        <a href="mailto:pat@adaptivefactory.net" className="underline" style={{ color: "#ef4444" }}>
                          pat@adaptivefactory.net
                        </a>
                        {submitError.split("pat@adaptivefactory.net")[1]}
                      </>
                    ) : (
                      submitError
                    )}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full mt-6"
              >
                {isSubmitting ? "Sending..." : "Request Demo Access"}
              </button>
            </form>
          </>
        ) : (
          <div className="py-8">
            <DialogTitle className="text-h3 text-primary-text mb-4 text-center">Request received.</DialogTitle>
            <p className="text-body-base text-secondary-text mb-4">
              Thanks, {submitterFirstName}. Pat will personally review your request and respond from <a href="mailto:pat@adaptivefactory.net" className="text-accent hover:underline">pat@adaptivefactory.net</a> within one business day. If you need to reach out in the meantime, the same email works.
            </p>
            <p className="text-fine text-secondary-text mb-6" style={{ fontSize: "0.75rem", opacity: 0.7 }}>
              Your information will not be shared, sold, or added to any marketing list.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setSubmitError(null);
                reset();
                onClose();
              }}
              className="btn-primary w-full"
            >
              Close
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DemoRequestModal;
