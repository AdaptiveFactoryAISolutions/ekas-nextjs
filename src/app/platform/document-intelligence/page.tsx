import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ChevronLeft } from "lucide-react";
import PageShell from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Document Intelligence — EKAS by AdaptiveFactory",
  description: "Upload supplier invoices, PPAP submissions, calibration certs, and work orders. Extract structured data and query through the AI Assistant.",
};

export default function DocumentIntelligencePage() {
  return (
    <PageShell>
        {/* Hero */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px]">
            <Link href="/platform" className="inline-flex items-center gap-2 text-body-sm text-accent mb-6 hover:underline">
              <ChevronLeft size={16} />
              Back to Platform
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,200,255,0.12)", border: "1px solid rgba(0,200,255,0.2)" }}
              >
                <FileText size={24} style={{ color: "#00c8ff" }} />
              </div>
              <h1 className="text-h1 text-primary-text" style={{ fontFamily: "var(--font-rajdhani)" }}>
                Document Intelligence
              </h1>
            </div>

            <p className="text-body-lg text-secondary-text">
              Manufacturing documents extracted, indexed, and made queryable — without manual data entry.
            </p>
          </div>
        </section>

        {/* The Problem */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[860px]">
            <span className="section-label">The Problem</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-4">
              Documents Carry Operational Data That Never Reaches Your Systems
            </h2>
            <p className="text-body-base text-secondary-text">
              Supplier quality records, calibration certificates, maintenance work orders, NCRs, and PPAP submissions carry critical operational and financial data. That data lives in PDFs and email attachments — outside your MES, outside your ERP, outside any system that can answer questions about it. EKAS changes that.
            </p>
          </div>
        </section>

        {/* Eight Document Types */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[1000px]">
            <span className="section-label">Eight Document Types</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-8">
              What EKAS Processes Today
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  type: "1. Supplier Invoices",
                  desc: "All required financial fields extracted"
                },
                {
                  type: "2. PPAP Quality Submissions",
                  desc: "Part number, supplier, submission level, approval status, drawing number"
                },
                {
                  type: "3. Maintenance Work Orders",
                  desc: "WO number, asset ID, fault description, priority, estimated hours"
                },
                {
                  type: "4. Calibration Certificates",
                  desc: "Certificate number, instrument ID, calibration date, next due date, PASS/FAIL result"
                },
                {
                  type: "5. Non-Conformance Reports",
                  desc: "NCR number, part number, quantity affected, disposition, root cause"
                },
                {
                  type: "6. Material / Quality Certificates",
                  desc: "Grade, heat number, supplier, properties"
                },
                {
                  type: "7. Scanned Paper Records",
                  desc: "OCR extraction for digitised paper documents"
                },
                {
                  type: "8. Custom Document Types",
                  desc: "Field schemas defined at deployment, no code change required"
                }
              ].map((doc) => (
                <div key={doc.type} className="premium-card">
                  <div className="text-h4 text-primary-text mb-2">{doc.type}</div>
                  <p className="text-body-sm text-secondary-text">{doc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Three Steps */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[1000px]">
            <span className="section-label">Three Steps</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-12">
              Upload. Extract. Query.
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Document Arrives",
                  body: "Documents uploaded via the EKAS interface or placed in a monitored network folder are processed immediately — no batch schedule, no wait."
                },
                {
                  step: "2",
                  title: "Fields Extracted",
                  body: "EKAS extracts required fields and reports a confidence score based on the fraction of required fields successfully extracted. Missing fields return null with a reason code — not a hallucinated value substituted for missing data."
                },
                {
                  step: "3",
                  title: "Immediately Queryable",
                  body: "Extracted documents are available for natural language queries through the AI Assistant within seconds of upload. Ask 'Show me all calibration certs due this month' or 'Which NCRs are open for this part number?' and receive grounded, sourced answers."
                }
              ].map((item) => (
                <div key={item.step} className="premium-card">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center mb-3" style={{ background: "rgba(0,200,255,0.12)" }}>
                    <span className="text-body-sm font-bold" style={{ color: "#00c8ff" }}>{item.step}</span>
                  </div>
                  <h3 className="text-h4 text-primary-text mb-2">{item.title}</h3>
                  <p className="text-body-sm text-secondary-text">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Accuracy and Honesty */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px]">
            <span className="section-label">Accuracy and Honesty</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-4">
              What EKAS Will and Will Not Do
            </h2>
            <p className="text-body-base text-secondary-text">
              OCR accuracy on degraded paper records — handwritten fields, low-resolution photographs, complex table layouts — is lower than on digital PDFs. EKAS reports this honestly: a document with missing required fields returns those fields as null with a reason code. Partial extraction is reported as partial. No hallucinated values are substituted for missing data.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.72)" }}>
          <div className="container max-w-[640px] text-center">
            <h2 className="text-h2 text-primary-text mb-4">See Document Intelligence in Action</h2>
            <p className="text-body-base text-secondary-text">
              Request a demonstration to see how EKAS extracts and indexes manufacturing documents.
            </p>
          </div>
        </section>
      </PageShell>
  );
}
