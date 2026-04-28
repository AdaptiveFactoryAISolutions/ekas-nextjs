"use client";

import { ReactNode, useState } from "react";
import BackgroundAtmosphere from "./BackgroundAtmosphere";
import Navigation from "./Navigation";
import FooterSection from "./FooterSection";
import DemoRequestModal from "@/components/modals/DemoRequestModal";

interface PageShellProps {
  children: ReactNode;
}

const PageShell = ({ children }: PageShellProps) => {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <BackgroundAtmosphere />
      <Navigation onDemoClick={() => setDemoOpen(true)} />
      <main style={{ position: "relative", zIndex: 1, paddingTop: 80 }}>
        {children}
        <FooterSection />
      </main>
      <DemoRequestModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
};

export default PageShell;
