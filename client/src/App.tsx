import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ContactModalProvider } from "./components/ContactModal";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Platform from "./pages/Platform";
import Solutions from "./pages/Solutions";
import WhyEkas from "./pages/WhyEkas";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Industries from "./pages/Industries";
import IndustryMetalStamping from "./pages/IndustryMetalStamping";
import IndustryAutomotive from "./pages/IndustryAutomotive";
import IndustryIndustrial from "./pages/IndustryIndustrial";
import Roles from "./pages/Roles";
import TechnicalOverview from "./pages/TechnicalOverview";
import Resources from "./pages/Resources";
import FAQs from "./pages/FAQs";
import ROICalculator from "./pages/ROICalculator";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/platform"} component={Platform} />
        <Route path={"/solutions"} component={Solutions} />
        <Route path={"/why-ekas"} component={WhyEkas} />
        <Route path={"/industries"} component={Industries} />
        <Route path={"/industries/metal-stamping"} component={IndustryMetalStamping} />
        <Route path={"/industries/automotive"} component={IndustryAutomotive} />
        <Route path={"/industries/industrial-manufacturing"} component={IndustryIndustrial} />
        <Route path={"/roles"} component={Roles} />
        <Route path={"/technical-overview"} component={TechnicalOverview} />
        <Route path={"/resources"} component={Resources} />
        <Route path={"/resources/faqs"} component={FAQs} />
        <Route path={"/resources/roi-calculator"} component={ROICalculator} />
        <Route path={"/privacy"} component={PrivacyPolicy} />
        <Route path={"/terms"} component={TermsOfService} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <ContactModalProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ContactModalProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
