"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageSquare, Check } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import DemoRequestModal from "@/components/modals/DemoRequestModal";

export default function AIAssistantPage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <PageShell onDemoClick={() => setDemoOpen(true)}>
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

            <p className="text-body-lg text-secondary-text mb-8">
              Ask operational questions in plain language. Get grounded, traceable answers from your production data — not estimates, not hallucinations.
            </p>

            <button onClick={() => setDemoOpen(true)} className="btn-primary">
              Request a Demo
            </button>
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
              Every answer comes from your MES or ERP data. The AI selects the right analytical tool — but governed SQL executes the calculation. No estimation. No interpolation. No generic model output.
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
                  title: "AI selects the analytical tool",
                  body: "The model understands your question and chooses the appropriate metric, query template, or analytical function.",
                },
                {
                  title: "Governed SQL executes the calculation",
                  body: "Deterministic, versioned SQL runs against your production data. The AI doesn't calculate — it orchestrates.",
                },
                {
                  title: "Answer returns with full provenance",
                  body: "Every response includes the SQL hash, catalog version, data source, record count, and timestamp.",
                },
                {
                  title: "You can drill down or ask follow-ups",
                  body: "Refine the question, change the time window, or explore related metrics in a conversational flow.",
                },
                {
                  title: "All queries are logged and auditable",
                  body: "Full audit trail of who asked what, when, and what data was accessed. Designed to support IATF 16949 compliance.",
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
                  detail: "The AI doesn't do the math — versioned SQL does. Results are reproducible and auditable.",
                },
                {
                  point: "Manufacturing context built in",
                  detail: "The system understands ISA-95 hierarchy, ISO 22400-2 metrics, and manufacturing-specific terminology.",
                },
                {
                  point: "Controlled refusal",
                  detail: "If EKAS doesn't have the data or confidence to answer, it says so explicitly. No hallucination.",
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

        {/* CTA */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.72)" }}>
          <div className="container max-w-[640px] text-center">
            <h2 className="text-h2 text-primary-text mb-4">See the AI Assistant in Action</h2>
            <p className="text-body-base text-secondary-text mb-8">
              Bring an operational question. We'll show you how EKAS answers it with grounded production data.
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
