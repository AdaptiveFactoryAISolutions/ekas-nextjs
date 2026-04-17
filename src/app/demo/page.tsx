"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PageShell from "@/components/layout/PageShell";

const formSchema = z.object({
  firstName: z.string().min(1, "Required").max(100),
  lastName: z.string().max(100).optional(),
  email: z.string().email("Valid email required").max(255),
  company: z.string().min(1, "Required").max(200),
  role: z.string().max(100).optional(),
  challenge: z.string().max(2000).optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function DemoPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      console.log("Demo request:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageShell>
      <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
        <div className="container max-w-[1000px]">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <span className="section-label">Contact</span>
              <h1 className="text-h1 text-primary-text mt-3 mb-4" style={{ fontFamily: "var(--font-rajdhani)" }}>
                Bring One Plant Problem
              </h1>
              <p className="text-body-base text-secondary-text mb-8">
                We'll show you how EKAS would approach it using grounded manufacturing intelligence and your operational context.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  "Product walkthrough with realistic manufacturing data",
                  "Relevant use-case discussion for your environment",
                  "Data and deployment discussion",
                  "Next-step fit assessment",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ background: "#00c8ff" }} />
                    <span className="text-body-sm text-secondary-text">{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-fine text-secondary-text">
                <strong>Who Should Attend:</strong> Plant Manager, Operations Leader, or VP-level sponsor who owns the business outcome. IT or IS representative welcome for architecture discussion.
              </p>
            </div>

            <div>
              {!isSubmitted ? (
                <div className="premium-card">
                  <h2 className="text-h3 text-primary-text mb-6">Request a Demo</h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-primary-text mb-1.5">First Name *</label>
                        <input {...register("firstName")} id="firstName" className="form-input" />
                        {errors.firstName && <p className="text-xs text-red-400 mt-1">{errors.firstName.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-primary-text mb-1.5">Last Name</label>
                        <input {...register("lastName")} id="lastName" className="form-input" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-primary-text mb-1.5">Work Email *</label>
                      <input {...register("email")} id="email" type="email" className="form-input" />
                      {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-primary-text mb-1.5">Company *</label>
                      <input {...register("company")} id="company" className="form-input" />
                      {errors.company && <p className="text-xs text-red-400 mt-1">{errors.company.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-primary-text mb-1.5">Role / Title</label>
                      <input {...register("role")} id="role" className="form-input" />
                    </div>

                    <div>
                      <label htmlFor="challenge" className="block text-sm font-medium text-primary-text mb-1.5">Primary challenge or plant problem</label>
                      <textarea {...register("challenge")} id="challenge" className="form-input" rows={3} />
                    </div>

                    <p className="text-fine" style={{ color: "#6a7a9a" }}>
                      Demo runs against synthetic data. Your production data is never involved.
                    </p>

                    <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
                      {isSubmitting ? "Submitting..." : "Request a Demo"}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="premium-card text-center py-12">
                  <h3 className="text-h3 text-primary-text mb-3">Thank You</h3>
                  <p className="text-body-base text-secondary-text">
                    We'll review your request and respond within 2 business days.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
