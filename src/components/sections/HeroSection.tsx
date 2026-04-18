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
                Manufacturing Intelligence Platform
              </span>
            </div>

            <h1 className="text-hero mb-6" style={{ fontFamily: "var(--font-rajdhani)", color: "#e8f4ff" }}>
              Operational and Financial Performance —
              From the Production Data You Already Have.
            </h1>

            <p className="text-body-lg text-secondary-text mb-8">
              EKAS delivers governed OEE analytics, financial cost variance, and document intelligence built on your confirmed production data — every answer traced to its source record. No estimates. No period close required. Standard single-site deployment: four weeks.
            </p>

            <div className="space-y-2">
              {[
                "Built for manufacturing operations",
                "Grounded in production data",
                "Governed metrics and traceable answers",
              ].map((text) => (
                <div key={text} className="flex items-center gap-2">
                  <Check size={16} style={{ color: "#00c8ff" }} />
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
