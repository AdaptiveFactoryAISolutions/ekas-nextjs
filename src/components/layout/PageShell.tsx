import { ReactNode } from "react";
import BackgroundAtmosphere from "./BackgroundAtmosphere";
import Navigation from "./Navigation";
import FooterSection from "./FooterSection";

interface PageShellProps {
  children: ReactNode;
  onDemoClick?: () => void;
}

const PageShell = ({ children, onDemoClick }: PageShellProps) => (
  <>
    <BackgroundAtmosphere />
    <Navigation onDemoClick={onDemoClick} />
    <main style={{ position: "relative", zIndex: 1, paddingTop: 80 }}>
      {children}
      <FooterSection />
    </main>
  </>
);

export default PageShell;
