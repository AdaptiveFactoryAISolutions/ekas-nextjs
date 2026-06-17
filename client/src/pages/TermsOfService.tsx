import { useEffect } from "react";

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-[oklch(0.15_0.04_255)] to-[oklch(0.18_0.04_255)] py-20">
        <div className="container">
          <p className="text-[oklch(0.7_0.15_210)] text-sm font-semibold tracking-wide mb-3">Legal</p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4">Terms of Service</h1>
          <p className="text-white/60 text-sm">Last updated: June 1, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="container py-16 max-w-3xl">
        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms of Service ("Terms") govern your access to and use of the EKAS platform (Enterprise Knowledge
              & Analytics System) and related services provided by Adaptive Factory AI Solutions ("Adaptive Factory,"
              "we," "us," or "our"). By accessing or using our services, you agree to be bound by these Terms. If you
              do not agree, you may not use our services.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              If you are using our services on behalf of an organization, you represent and warrant that you have the
              authority to bind that organization to these Terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">2. Description of Services</h2>
            <p className="text-gray-600 leading-relaxed">
              EKAS is a governed manufacturing decision-intelligence platform that helps enterprise manufacturers
              convert operational evidence into role-specific decisions, human-approved actions, and verified
              improvement. The platform provides governed metrics, evidence standards, and verification workflows
              for manufacturing operations.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              EKAS is an advisory and analytical tool. It does not autonomously control manufacturing equipment,
              override safety systems, or make operational decisions without human approval. All actions recommended
              by EKAS require explicit human authorization before implementation.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">3. Governance Principles</h2>
            <p className="text-gray-600 leading-relaxed">
              EKAS operates under strict governance principles that are fundamental to our service:
            </p>
            <ul className="list-disc pl-6 text-gray-600 leading-relaxed space-y-1.5 mt-2">
              <li><strong>No-Data Honesty:</strong> When data is missing, ambiguous, or insufficient, EKAS will explicitly state what it does not know rather than generate speculative answers.</li>
              <li><strong>Human-Approved Actions:</strong> Every action recommendation requires explicit human authorization before execution. EKAS does not take autonomous action.</li>
              <li><strong>Evidence Provenance:</strong> Every answer includes traceable evidence with source identification, confidence levels, and stated limitations.</li>
              <li><strong>Verification Workflows:</strong> Post-action verification confirms whether recommended actions achieved their intended outcomes.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">4. Financial Claims Disclaimer</h2>
            <p className="text-gray-600 leading-relaxed">
              EKAS does not claim ROI, EBITDA impact, dollar savings, margin impact, revenue impact, or payback
              period without a governed cost model validated with your organization's specific financial data.
              Any operational metrics, benchmarks, or industry statistics presented on our website or in our
              materials are for illustrative purposes and represent general industry observations, not guaranteed
              outcomes.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">5. Your Responsibilities</h2>
            <p className="text-gray-600 leading-relaxed">As a user of our services, you agree to:</p>
            <ul className="list-disc pl-6 text-gray-600 leading-relaxed space-y-1.5 mt-2">
              <li>Provide accurate and complete information when using the platform</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Use the platform in compliance with all applicable laws and regulations</li>
              <li>Not attempt to reverse-engineer, decompile, or disassemble the platform</li>
              <li>Not use the platform to process data you do not have the right to use</li>
              <li>Review and approve all EKAS-recommended actions before implementation</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">6. Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed">
              The EKAS platform, including its software, algorithms, documentation, and design, is the intellectual
              property of Adaptive Factory AI Solutions. Your use of our services does not grant you ownership of any
              intellectual property rights in our platform or content.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              Your operational data remains your property. We claim no ownership over the manufacturing data you
              provide to the platform. You grant us a limited license to process your data solely for the purpose
              of delivering EKAS services.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">7. Service Availability</h2>
            <p className="text-gray-600 leading-relaxed">
              We strive to maintain high availability of the EKAS platform but do not guarantee uninterrupted access.
              We may perform scheduled maintenance, updates, or modifications to the platform. We will provide
              reasonable notice of planned downtime when possible.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed">
              To the maximum extent permitted by law, Adaptive Factory shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages arising from your use of our services.
              EKAS provides analytical insights and recommendations; operational decisions and their outcomes
              remain the responsibility of the human operators who approve and implement them.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">9. Engagement and Subscription</h2>
            <p className="text-gray-600 leading-relaxed">
              EKAS services are provided through a structured engagement model: Discovery, Pilot Readiness,
              60-Day Pilot, and Ongoing Subscription. Specific terms for each engagement phase, including pricing,
              scope, and deliverables, are defined in your individual service agreement.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">10. Termination</h2>
            <p className="text-gray-600 leading-relaxed">
              Either party may terminate the service agreement in accordance with the terms specified in the
              individual service agreement. Upon termination, we will provide you with the ability to export
              your operational data within a reasonable timeframe.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">11. Changes to Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              We may update these Terms from time to time. We will notify you of material changes by posting
              the updated Terms on our website with a revised "Last updated" date. Your continued use of our
              services after any changes constitutes your acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">12. Governing Law</h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction
              in which Adaptive Factory AI Solutions is incorporated, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">13. Contact</h2>
            <p className="text-gray-600 leading-relaxed">
              For questions about these Terms, please contact us at:
            </p>
            <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-gray-700 font-semibold">Adaptive Factory AI Solutions</p>
              <p className="text-gray-600 text-sm mt-1">Email: contact@adaptivefactory.ai</p>
              <p className="text-gray-600 text-sm">Website: adaptivefactory.ai</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
