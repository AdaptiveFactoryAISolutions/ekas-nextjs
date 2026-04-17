"use client";

import { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronLeft, ChevronDown } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import DemoRequestModal from "@/components/modals/DemoRequestModal";

export default function FAQsPage() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const faqs = [
    {
      category: "Product & Capabilities",
      questions: [
        { q: "What is EKAS?", a: "EKAS is a manufacturing intelligence platform that provides governed metrics, data provenance, and conversational AI for discrete manufacturing operations. It connects to your MES and ERP systems to calculate OEE, downtime tracking, quality metrics, and capacity utilization with full audit trail and traceability." },
        { q: "How is EKAS different from traditional MES or BI tools?", a: "EKAS does not replace your MES or ERP. It connects to existing systems and applies governed metric definitions with full data provenance. Unlike traditional BI tools, every calculation is traceable, versioned, and auditable — critical for manufacturing environments that answer to finance teams and regulatory audits." },
        { q: "What industries does EKAS serve?", a: "EKAS is built for discrete manufacturing: automotive, aerospace, medical devices, metal stamping, and industrial manufacturing. It is designed to support IATF 16949, ISO 13485, AS9100, and other compliance frameworks common in regulated manufacturing environments." },
        { q: "What metrics can EKAS calculate?", a: "EKAS calculates OEE (Availability, Performance, Quality), downtime attribution, First Pass Yield, scrap and rework rates, cost variance attribution, capacity utilization, throughput analysis, and quality event tracking — all with governed logic and full provenance." },
      ],
    },
    {
      category: "Implementation & Integration",
      questions: [
        { q: "How does EKAS connect to my MES or ERP?", a: "EKAS connects via read-only database access, RESTful/SOAP APIs, or scheduled file transfers (CSV, JSON, XML). No data is written back to your production systems. All integrations use TLS 1.3 encryption and support on-premise or cloud-hosted systems." },
        { q: "How long does implementation take?", a: "Typical deployment ranges from 6 to 12 weeks depending on data source complexity, metric governance requirements, and multi-site scope. Proof-of-concept deployments can be operational in 2-4 weeks for single-site, single-system environments." },
        { q: "Do you support on-premise deployment?", a: "EKAS is cloud-native and deployed on AWS. For customers with strict data residency or air-gap requirements, private cloud or on-premise deployment patterns can be discussed during enterprise procurement." },
        { q: "What systems does EKAS integrate with?", a: "EKAS integrates with MES platforms, ERP systems, SCADA systems, and quality databases. If your manufacturing system exposes production data via database, API, or file export, EKAS can connect." },
      ],
    },
    {
      category: "Security & Compliance",
      questions: [
        { q: "Is EKAS SOC 2 compliant?", a: "Yes. EKAS operates under SOC 2 Type II controls with annual audits. Security packet documentation, penetration test results, and compliance attestations are available to qualified enterprise customers." },
        { q: "How is my production data protected?", a: "Production data is encrypted in transit (TLS 1.3) and at rest (AWS KMS with customer-managed keys). Multi-tenant isolation is enforced via PostgreSQL row-level security with 56 tenant policies. No cross-customer data access is possible." },
        { q: "Does EKAS use my data to train AI models?", a: "No. EKAS uses Amazon Bedrock for AI capabilities with a zero-training-data guarantee. Your production data is never used for model training, cross-customer analytics, or shared with third parties." },
        { q: "Does EKAS support IATF 16949 and ISO compliance?", a: "Yes. EKAS is designed to support IATF 16949, ISO 13485, AS9100, and FDA 21 CFR Part 11 compliance. Every metric calculation includes full data provenance, audit trail, and traceability required for customer and regulatory audits." },
      ],
    },
    {
      category: "Pricing & Licensing",
      questions: [
        { q: "How is EKAS priced?", a: "EKAS pricing is based on facility count, user seats, and data source complexity. Enterprise licensing is available for multi-site deployments and portfolio-level analytics. Contact sales for a custom quote." },
        { q: "Is there a free trial?", a: "EKAS offers proof-of-concept deployments for qualified prospects. POC scope, duration, and pricing are determined during the sales qualification process." },
        { q: "What support is included?", a: "All EKAS licenses include technical support, security updates, and access to implementation guides. Enterprise customers receive dedicated customer success management, SLA guarantees, and priority support." },
      ],
    },
  ];

  return (
    <>
      <PageShell onDemoClick={() => setDemoOpen(true)}>
        {/* Hero */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px]">
            <Link href="/resources" className="inline-flex items-center gap-2 text-body-sm text-accent mb-6 hover:underline">
              <ChevronLeft size={16} />
              Back to Resources
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,200,255,0.12)", border: "1px solid rgba(0,200,255,0.2)" }}
              >
                <HelpCircle size={24} style={{ color: "#00c8ff" }} />
              </div>
              <h1 className="text-h1 text-primary-text" style={{ fontFamily: "var(--font-rajdhani)" }}>
                Frequently Asked Questions
              </h1>
            </div>

            <p className="text-body-lg text-secondary-text mb-8">
              Common questions about EKAS capabilities, implementation, security, and pricing.
            </p>
          </div>
        </section>

        {/* FAQs by Category */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[860px]">
            {faqs.map((category, idx) => (
              <div key={category.category} className="mb-12 last:mb-0">
                <h2 className="text-h3 text-primary-text mb-6">{category.category}</h2>
                <div className="space-y-3">
                  {category.questions.map((faq) => {
                    const faqId = `${category.category}-${faq.q}`;
                    const isOpen = openFAQ === faqId;
                    return (
                      <div key={faq.q} className="premium-card">
                        <button
                          onClick={() => setOpenFAQ(isOpen ? null : faqId)}
                          className="w-full flex items-start justify-between gap-4 text-left"
                        >
                          <h3 className="text-h4 text-primary-text">{faq.q}</h3>
                          <ChevronDown
                            size={20}
                            style={{ color: "#00c8ff", flexShrink: 0, transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}
                          />
                        </button>
                        {isOpen && (
                          <p className="text-body-sm text-secondary-text mt-3 pt-3 border-t border-white/10">
                            {faq.a}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.72)" }}>
          <div className="container max-w-[640px] text-center">
            <h2 className="text-h2 text-primary-text mb-4">Still Have Questions?</h2>
            <p className="text-body-base text-secondary-text mb-8">
              Request a demo and we will walk you through EKAS capabilities, integration options, and implementation timelines.
            </p>
            <button onClick={() => setDemoOpen(true)} className="btn-primary">
              Request a Demo
            </button>
          </div>
        </section>
      </PageShell>

      <DemoRequestModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
