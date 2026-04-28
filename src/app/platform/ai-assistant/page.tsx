"use client";

import Link from "next/link";
import { MessageSquare, Check } from "lucide-react";
import PageShell from "@/components/layout/PageShell";

export default function AIAssistantPage() {
  return (
    <PageShell>
      {/* Hero */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px]">
            <Link href="/platform" className="text-body-sm text-accent hover:underline mb-4 inline-block">
              ← Back to Platform
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,200,255,0.12)", border: "1px solid rgba(0,200,255,0.2)" }}
              >
                <MessageSquare size={24} style={{ color: "#00c8ff" }} />
              </div>
              <h1 className="text-h1 text-primary-text" style={{ fontFamily: "var(--font-rajdhani)" }}>
                AI Assistant
              </h1>
            </div>

            <p className="text-body-lg text-secondary-text">
              Ask operational questions in plain language. Get grounded, traceable answers from your production data — not estimates, not hallucinations.
            </p>
          </div>
        </section>

        {/* What It Is */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[860px]">
            <span className="section-label">What It Is</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-4">
              Conversational Manufacturing Intelligence
            </h2>
            <p className="text-body-base text-secondary-text mb-4">
              The EKAS AI Assistant is a conversational interface to your manufacturing data. Instead of building dashboards or writing SQL queries, operations teams ask questions in plain language and receive grounded answers tied directly to production records.
            </p>
            <p className="text-body-base text-secondary-text">
              Every answer comes from your MES or ERP data. Every metric is computed from your confirmed production records using governed definitions. No estimation. No interpolation. No generic model output.
            </p>
          </div>
        </section>

        {/* Example Questions */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[1000px]">
            <span className="section-label">Example Questions</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-8">
              What Operations Teams Ask
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                "What was our worst performing workcenter yesterday?",
                "Which failure modes are recurring on Machine 47?",
                "Show me First Pass Yield by part for the past week",
                "How many hours of downtime did we experience on 2nd shift last month?",
                "Which machines are running below target OEE?",
                "What's driving time variance in stamping this quarter?",
                "Compare downtime between facilities for Q1",
                "Which defect types are trending up this month?",
              ].map((question) => (
                <div key={question} className="premium-card">
                  <div className="flex items-start gap-3">
                    <MessageSquare size={18} className="mt-0.5" style={{ color: "#00c8ff", flexShrink: 0 }} />
                    <span className="text-body-sm text-secondary-text">{question}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[1100px]">
            <span className="section-label">How It Works</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-12">
              Grounded by Design
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "You ask in plain language",
                  body: "No SQL required. No dashboard configuration. Ask the question the way you would ask a colleague.",
                },
                {
                  title: "Intent is classified and entities are resolved",
                  body: "The platform identifies what you are asking about — which machine, workcenter, time window, or metric — and resolves it against your ISA-95 equipment hierarchy. Prior investigation context is loaded from your conversation history.",
                },
                {
                  title: "Evidence is collected before the answer is formed",
                  body: "Every metric is computed from your confirmed production data. Raw values, record counts, coverage, and data source are assembled into an EvidencePacket alongside the response — before any answer text is generated.",
                },
                {
                  title: "Every number is verified against its source",
                  body: "The platform cross-validates every numerical value in the response against the EvidencePacket collected during the query. A response with numbers that cannot be sourced is not delivered as if it were complete. You receive an honest, structured explanation of what was and was not determinable.",
                },
                {
                  title: "You can drill down or ask follow-ups",
                  body: "Refine the question, change the time window, or explore related metrics in a conversational flow. Your investigation context persists across turns — you do not repeat yourself.",
                },
                {
                  title: "Every query is logged and auditable",
                  body: "Full audit trail of who asked what, when, and what data was accessed — with the complete EvidencePacket preserved. Designed to support IATF 16949 compliance requirements.",
                },
              ].map((card) => (
                <div key={card.title} className="premium-card">
                  <h3 className="text-h4 text-primary-text mb-2">{card.title}</h3>
                  <p className="text-body-sm text-secondary-text">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why It's Different */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px]">
            <span className="section-label">Why It's Different</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-6">
              Not a Generic Chatbot
            </h2>

            <div className="space-y-4">
              {[
                {
                  point: "Grounded in your production data",
                  detail: "Every answer comes from your MES or ERP. If the data isn't there, the answer isn't there. No estimation.",
                },
                {
                  point: "Deterministic calculation",
                  detail: "Metric calculations use governed, versioned definitions applied consistently to your production data. Results are reproducible, auditable, and traceable to source records.",
                },
                {
                  point: "Manufacturing context built in",
                  detail: "The system understands ISA-95 hierarchy, ISO 22400-2 metrics, and manufacturing-specific terminology.",
                },
                {
                  point: "Controlled refusal",
                  detail: "When EKAS cannot produce a fully evidenced answer, it returns a structured response with a specific reason — time window has no data, entity not resolved, data quality issue detected. You receive an honest structured failure, not a hallucinated answer.",
                },
                {
                  point: "EvidencePacket on every response",
                  detail: "Every EKAS response carries an EvidencePacket: the time window queried, the ISA-95 scope, the data source, the record count, the coverage percentage, and the raw values behind every metric. No black-box answers. Every number has a named source.",
                },
                {
                  point: "Full audit trail",
                  detail: "Every query is logged with cryptographic hash, catalog version, and data provenance.",
                },
              ].map((item) => (
                <div key={item.point} className="flex items-start gap-3 p-4 rounded-lg" style={{ background: "rgba(0,200,255,0.04)" }}>
                  <Check size={20} className="mt-0.5" style={{ color: "#00c8ff", flexShrink: 0 }} />
                  <div>
                    <p className="text-body-sm font-semibold text-primary-text mb-1">{item.point}</p>
                    <p className="text-body-sm text-secondary-text">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Boundaries */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[860px]">
            <span className="section-label">Trust Boundaries</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-4">
              What the AI Can and Cannot Do
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="premium-card">
                <h3 className="text-h4 text-primary-text mb-3">The AI Can:</h3>
                <ul className="space-y-2">
                  {[
                    "Understand your question",
                    "Select the right analytical tool",
                    "Choose the correct metric",
                    "Format and explain results",
                    "Suggest follow-up questions",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ background: "#00c8ff", flexShrink: 0 }} />
                      <span className="text-body-sm text-secondary-text">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="premium-card">
                <h3 className="text-h4 text-primary-text mb-3">The AI Cannot:</h3>
                <ul className="space-y-2">
                  {[
                    "Perform the calculation itself",
                    "Estimate missing data",
                    "Interpolate or extrapolate",
                    "Generate synthetic results",
                    "Override governed metric logic",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ background: "#00c8ff", flexShrink: 0 }} />
                      <span className="text-body-sm text-secondary-text">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* The Evidence Standard */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px]">
            <span className="section-label">The Evidence Standard</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-6">
              EvidencePacket — What Every Response Contains
            </h2>

            <p className="text-body-base text-secondary-text mb-6">
              Every EKAS response carries an EvidencePacket. This is not optional — it is an architectural constraint. A response without a complete EvidencePacket does not reach the user.
            </p>

            <div className="premium-card">
              <div className="grid md:grid-cols-2 gap-4 text-body-sm">
                <div className="pb-3 border-b border-white/10">
                  <div className="text-accent mb-1">time_window</div>
                  <div className="text-secondary-text">Exact date range of data consumed in this response</div>
                </div>
                <div className="pb-3 border-b border-white/10">
                  <div className="text-accent mb-1">scope</div>
                  <div className="text-secondary-text">ISA-95 nodes covered — site, workcenter, machine, part</div>
                </div>
                <div className="pb-3 border-b border-white/10">
                  <div className="text-accent mb-1">grain</div>
                  <div className="text-secondary-text">Granularity — shift, daily, hourly, or operation level</div>
                </div>
                <div className="pb-3 border-b border-white/10">
                  <div className="text-accent mb-1">record_count</div>
                  <div className="text-secondary-text">Number of source records consumed</div>
                </div>
                <div className="pb-3 border-b border-white/10">
                  <div className="text-accent mb-1">coverage_pct</div>
                  <div className="text-secondary-text">Fraction of requested scope with confirmed data</div>
                </div>
                <div className="pb-3 border-b border-white/10">
                  <div className="text-accent mb-1">numerator + denominator</div>
                  <div className="text-secondary-text">Raw values behind every ratio metric — no black-box percentages</div>
                </div>
                <div>
                  <div className="text-accent mb-1">source</div>
                  <div className="text-secondary-text">Which data view or table was queried</div>
                </div>
              </div>
            </div>

            <p className="text-body-sm text-secondary-text mt-6">
              If a required EvidencePacket field cannot be populated, the response is blocked before it reaches the user. This is what 'evidence by contract' means — enforced architecturally on every query, not as a configurable option.
            </p>
          </div>
        </section>

        {/* Quality Assurance */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[860px]">
            <span className="section-label">Quality Assurance</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-4">
              Every Release Tested Against Manufacturing-Specific Questions
            </h2>

            <p className="text-body-base text-secondary-text">
              EKAS maintains a stratified golden query set covering the full range of manufacturing intelligence questions: OEE investigation at every ISA-95 level, downtime root cause analysis, financial cost variance, cross-domain queries combining operational and financial data, document retrieval, and structured failure scenarios. Every release is evaluated using the RAGAS framework — measuring faithfulness (answer grounded in source data), relevancy (answer addresses the question), and context precision (correct data retrieved). Releases that regress on any dimension do not reach production.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.72)" }}>
          <div className="container max-w-[640px] text-center">
            <h2 className="text-h2 text-primary-text mb-4">See the AI Assistant in Action</h2>
            <p className="text-body-base text-secondary-text">
              Bring an operational question. We'll show you how EKAS answers it with grounded production data.
            </p>
          </div>
        </section>
    </PageShell>
  );
}
