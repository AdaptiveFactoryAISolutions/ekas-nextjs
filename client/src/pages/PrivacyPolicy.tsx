import { useEffect } from "react";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-[oklch(0.15_0.04_255)] to-[oklch(0.18_0.04_255)] py-20">
        <div className="container">
          <p className="text-[oklch(0.7_0.15_210)] text-sm font-semibold tracking-wide mb-3">Legal</p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4">Privacy Policy</h1>
          <p className="text-white/60 text-sm">Last updated: June 1, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="container py-16 max-w-3xl">
        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
              Adaptive Factory AI Solutions ("Adaptive Factory," "we," "us," or "our") operates the EKAS platform
              (Enterprise Knowledge & Analytics System) and the website at adaptivefactory.ai. This Privacy Policy
              describes how we collect, use, disclose, and protect information when you visit our website, use our
              platform, or engage with our services.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              By accessing or using our services, you acknowledge that you have read and understood this Privacy Policy.
              If you do not agree with our practices, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
            <h3 className="font-display text-lg font-semibold text-gray-800 mb-2">Information You Provide</h3>
            <p className="text-gray-600 leading-relaxed">
              When you request a platform review, contact us, or engage with our services, we may collect your name,
              email address, phone number, company name, job title, and any information you include in messages or forms.
            </p>
            <h3 className="font-display text-lg font-semibold text-gray-800 mb-2 mt-4">Operational Data</h3>
            <p className="text-gray-600 leading-relaxed">
              When you use the EKAS platform, we process manufacturing operational data that your organization provides.
              This may include machine telemetry, production metrics, quality records, and related manufacturing data.
              This data remains the property of your organization and is processed solely to deliver EKAS services.
            </p>
            <h3 className="font-display text-lg font-semibold text-gray-800 mb-2 mt-4">Automatically Collected Information</h3>
            <p className="text-gray-600 leading-relaxed">
              When you visit our website, we may automatically collect certain information including your IP address,
              browser type, operating system, referring URLs, pages viewed, and the dates and times of your visits.
              We use privacy-respecting analytics that do not use cookies for tracking.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">3. How We Use Information</h2>
            <p className="text-gray-600 leading-relaxed">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-gray-600 leading-relaxed space-y-1.5 mt-2">
              <li>Provide, maintain, and improve the EKAS platform and our services</li>
              <li>Respond to your inquiries and schedule platform reviews</li>
              <li>Communicate with you about our services, updates, and relevant information</li>
              <li>Analyze website usage to improve our online presence</li>
              <li>Comply with legal obligations and enforce our agreements</li>
              <li>Protect the security and integrity of our services</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">4. Data Governance and Security</h2>
            <p className="text-gray-600 leading-relaxed">
              EKAS is built on principles of governed decision intelligence. We apply the same rigor to data protection
              that we bring to manufacturing analytics. Your operational data is processed with full provenance tracking,
              access controls, and audit trails. We implement industry-standard security measures including encryption
              in transit and at rest, role-based access controls, and regular security assessments.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              We do not sell, rent, or share your operational data with third parties for their marketing purposes.
              Operational data provided through the EKAS platform is used exclusively to deliver services to your
              organization.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">5. Data Retention</h2>
            <p className="text-gray-600 leading-relaxed">
              We retain personal information for as long as necessary to fulfill the purposes described in this policy,
              unless a longer retention period is required by law. Operational data processed through the EKAS platform
              is retained in accordance with your service agreement and can be exported or deleted upon request.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">6. Third-Party Services</h2>
            <p className="text-gray-600 leading-relaxed">
              We may use third-party service providers to assist in delivering our services, including cloud
              infrastructure providers, analytics services, and communication tools. These providers are contractually
              obligated to protect your information and use it only for the purposes we specify.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">7. Your Rights</h2>
            <p className="text-gray-600 leading-relaxed">
              Depending on your jurisdiction, you may have rights regarding your personal information, including the
              right to access, correct, delete, or port your data. To exercise these rights, please contact us at
              contact@adaptivefactory.ai. We will respond to your request within the timeframe required by applicable law.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">8. Changes to This Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of material changes by posting
              the updated policy on our website with a revised "Last updated" date. Your continued use of our services
              after any changes constitutes your acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">9. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have questions about this Privacy Policy or our data practices, please contact us at:
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
