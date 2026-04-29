"use client";

import Image from "next/image";
import { Check } from "lucide-react";

interface HeroSectionProps {
  onDemoClick?: () => void;
}

const HeroSection = ({ onDemoClick }: HeroSectionProps) => {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-[1100px] mx-auto">
          {/* Left Column - Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{ background: "rgba(0,200,255,0.08)", border: "1px solid rgba(0,200,255,0.15)" }}>
              <span className="text-label" style={{ color: "#00c8ff" }}>
                AI Portfolio Management for Precision Manufacturing
              </span>
            </div>

            <h1 className="text-hero mb-6" style={{ fontFamily: "var(--font-rajdhani)", color: "#e8f4ff" }}>
              Portfolio discipline. Not point tools.
            </h1>

            <p className="text-body-lg text-secondary-text mb-8">
              EKAS organizes 16 manufacturing-AI capabilities across the McKinsey Three Horizons framework, with quarterly portfolio governance and binary success gates. Built for SME precision stamping, fabrication, and metalforming.
            </p>

            <div className="flex items-center gap-4 mb-8">
              <button onClick={onDemoClick} className="btn-primary">
                Request Demo
              </button>
              <a href="/platform" className="text-body-sm text-accent hover:underline">
                Read the framework →
              </a>
            </div>

            <div className="space-y-2">
              {[
                "BCG 2025: 60% of AI investments produce no measurable value",
                "McKinsey Three Horizons framework. Quarterly portfolio governance.",
                "Founder: 30 years in precision metal stamping operations.",
              ].map((text) => (
                <div key={text} className="flex items-start gap-2">
                  <Check size={16} style={{ color: "#00c8ff", marginTop: 4, flexShrink: 0 }} />
                  <span className="text-body-sm text-secondary-text">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Screenshot */}
          <div className="relative">
            <div
              className="premium-card overflow-hidden"
              style={{
                border: "1px solid rgba(0,200,255,0.12)",
                boxShadow: "0 8px 32px rgba(0,200,255,0.08)",
              }}
            >
              <Image
                src="/ekas-dashboard.jpg"
                alt="EKAS Platform Dashboard"
                width={1000}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
