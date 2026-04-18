import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Technical Overview — EKAS by AdaptiveFactory",
  description: "How EKAS works from question to provenance-backed answer. System architecture, data flow, standards compliance, and deployment options.",
};

export default function TechnicalOverviewPage() {
  return (
    <PageShell>
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px] text-center">
            <span className="section-label">Technical Overview</span>
            <h1 className="text-h1 text-primary-text mt-3 mb-4" style={{ fontFamily: "var(--font-rajdhani)" }}>
              How EKAS Works
            </h1>
            <p className="text-body-lg text-secondary-text">
              EKAS is a multi-capability manufacturing AI platform built on a governed data layer, a nine-stage security pipeline, and a full provenance enforcement standard. This page describes how the system operates.
            </p>
          </div>
        </section>

        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[1100px]">
            <span className="section-label">System Architecture</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-12">
              Core Components
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Data Integration Layer",
                  body: "EKAS connects to ERP systems (Oracle E-Business Suite, SAP S/4HANA, Epicor Kinetic, Infor LN), MES platforms (Plex, Shopfloor, FactoryLogix), SCADA systems (Rockwell, Siemens), and quality databases. Data is ingested via batch extract, API integration, or ODBC connection. No modifications to source systems required.",
                },
                {
                  title: "Governed Metrics Catalog",
                  body: "91 manufacturing metrics across the ISA-95 hierarchy, each defined in versioned SQL with a cryptographic hash. When metric logic changes, the version increments. Historic calculations remain tied to the definition that generated them.",
                },
                {
                  title: "AI Inference Pipeline",
                  body: "Questions asked in plain language are processed through intent classification, entity resolution, evidence collection, answer synthesis, and controlled refusal checks. Enterprise cloud LLM inference with zero-training-data guarantee. Air-gapped deployment option available using open-source models.",
                },
                {
                  title: "Security and Audit Pipeline",
                  body: "Nine-stage security enforcement: authentication, tenant isolation, role-based access control, query validation, SQL injection defense, row-level security, audit logging, response sanitization, and EvidencePacket attachment.",
                },
              ].map((card) => (
                <div key={card.title} className="premium-card">
                  <h3 className="text-h4 text-primary-text mb-3">{card.title}</h3>
                  <p className="text-body-sm text-secondary-text">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[1100px]">
            <span className="section-label">Data Flow</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-12">
              From Question to Provenance-Backed Answer
            </h2>

            <div className="space-y-4">
              {[
                {
                  step: "1",
                  title: "User asks question in plain language",
                  body: "No SQL required. No dashboard configuration. Example: \"What was OEE for Cell 3 on second shift last Tuesday?\"",
                },
                {
                  step: "2",
                  title: "Intent classification and entity resolution",
                  body: "Platform identifies the workcenter, shift, date, and metric requested. Resolves \"Cell 3\" to the correct ISA-95 equipment hierarchy node.",
                },
                {
                  step: "3",
                  title: "Evidence collection before answer synthesis",
                  body: "The governed SQL definition for OEE is executed. Raw production data is queried. Record count, data source, and calculation timestamp are captured.",
                },
                {
                  step: "4",
                  title: "EvidencePacket construction",
                  body: "All provenance metadata — SQL hash, metric version, time window, record count, data source — is assembled into the EvidencePacket before the answer text is generated.",
                },
                {
                  step: "5",
                  title: "Answer synthesis with controlled refusal",
                  body: "If the question is answerable with the available data, a response is generated. If not — insufficient data, ambiguous question, out-of-scope request — EKAS refuses with an explanation.",
                },
                {
                  step: "6",
                  title: "Response returned with full audit trail",
                  body: "The user receives the answer, the EvidencePacket, and a clickable reference to the source data. Every interaction is logged for audit review.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(0,200,255,0.12)", border: "1px solid rgba(0,200,255,0.2)" }}>
                    <span className="text-h4 text-accent" style={{ fontFamily: "var(--font-rajdhani)" }}>
                      {item.step}
                    </span>
                  </div>
                  <div className="flex-1 pb-4">
                    <h3 className="text-h4 text-primary-text mb-2">{item.title}</h3>
                    <p className="text-body-sm text-secondary-text">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[1100px]">
            <span className="section-label">Standards Compliance</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-12">
              Which Standards EKAS Enforces
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "ISO 22400-2 OEE Methodology",
                  body: "Ratio-of-sums OEE calculation enforced throughout. No average-of-averages approximations. All OEE results traceable to shift-level input data.",
                },
                {
                  title: "ISA-95 Equipment Hierarchy",
                  body: "Every metric is computed within the ISA-95 structure: Enterprise → Site → Workcenter → Machine → Part. Aggregation rules follow the standard.",
                },
                {
                  title: "IATF 16949 Audit Trail Requirements",
                  body: "Full query logging, metric definition versioning, and data lineage tracking designed to satisfy automotive Tier supplier audit requirements.",
                },
              ].map((card) => (
                <div key={card.title} className="premium-card">
                  <h3 className="text-h4 text-primary-text mb-3">{card.title}</h3>
                  <p className="text-body-sm text-secondary-text">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[1000px]">
            <span className="section-label">Deployment Options</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-12">
              Cloud or Air-Gapped
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="premium-card">
                <h3 className="text-h4 text-primary-text mb-3">Cloud Deployment</h3>
                <p className="text-body-sm text-secondary-text">
                  Enterprise cloud AI inference with zero-training-data guarantee. Your production data is processed within your cloud environment. No data used for model training or shared with other customers. Recommended for most deployments.
                </p>
              </div>

              <div className="premium-card">
                <h3 className="text-h4 text-primary-text mb-3">Fully Air-Gapped / On-Premises</h3>
                <p className="text-body-sm text-secondary-text">
                  For customers with strict data residency requirements — EU data localisation obligations, sensitive operational environments — EKAS runs entirely on local infrastructure using open-source AI models. No production data leaves your environment after initial setup. Same nine-stage security pipeline. Same EvidencePacket enforcement. Same audit trail.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding" style={{ background: "rgba(10,14,26,0.72)" }}>
          <div className="container max-w-[640px] text-center">
            <h2 className="text-h2 text-primary-text mb-4">Request a Technical Deep Dive</h2>
            <p className="text-body-base text-secondary-text">
              Schedule a technical demonstration with the engineering team.
            </p>
          </div>
        </section>
      </PageShell>
  );
}
