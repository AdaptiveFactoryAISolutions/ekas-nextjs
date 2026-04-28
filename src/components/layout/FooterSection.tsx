import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  Platform: [
    { label: "Overview", href: "/platform" },
    { label: "AI Assistant", href: "/platform/ai-assistant" },
    { label: "Manufacturing Intelligence", href: "/platform/manufacturing-intelligence" },
    { label: "Data Connections", href: "/platform/data-connections" },
    { label: "Reporting & Analytics", href: "/platform/reporting-analytics" },
    { label: "Governance & Auditability", href: "/security" },
  ],
  Solutions: [
    { label: "Downtime Reduction", href: "/solutions/downtime-reduction" },
    { label: "Scrap & Quality Visibility", href: "/solutions/scrap-quality-visibility" },
    { label: "Capacity & Throughput", href: "/solutions/capacity-throughput" },
    { label: "Cost Driver Analysis", href: "/solutions/cost-driver-analysis" },
    { label: "Multi-Site Performance", href: "/solutions/multi-site-performance" },
  ],
  Roles: [
    { label: "Plant Managers", href: "/roles#plant-managers" },
    { label: "Operations Leaders", href: "/roles#operations-leaders" },
    { label: "Manufacturing Engineering", href: "/roles#manufacturing-engineering" },
    { label: "Quality Leaders", href: "/roles#quality-leaders" },
    { label: "Finance Leaders", href: "/roles#finance-leaders" },
    { label: "Executive / PE Operations", href: "/roles#executive-operations" },
  ],
  Industries: [
    { label: "Metal Stamping", href: "/industries/metal-stamping" },
    { label: "Automotive", href: "/industries/automotive" },
    { label: "Industrial Manufacturing", href: "/industries/industrial-manufacturing" },
  ],
  Trust: [
    { label: "Security", href: "/security" },
    { label: "Governance", href: "/security#governance" },
    { label: "Data Handling", href: "/security#data-handling" },
    { label: "Architecture", href: "/security#architecture" },
  ],
  Resources: [
    { label: "FAQs", href: "/resources/faqs" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Founder", href: "/about/founder" },
    { label: "Contact", href: "/demo" },
  ],
};

const FooterSection = () => (
  <footer style={{ backgroundColor: "rgba(7, 10, 20, 0.85)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
    <div className="container py-20">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-8 mb-12">
        {/* Brand / Contact */}
        <div className="col-span-2 md:col-span-4 lg:col-span-2">
          <Image src="/ekas-logo.svg" alt="EKAS" width={120} height={44} className="h-11 mb-4" />
          <p className="text-fine text-muted-text mt-2">Michigan, USA</p>
          <a
            href="mailto:pat@adaptivefactory.net"
            className="text-body-sm transition-colors duration-150 inline-block mt-3 break-words"
            style={{ color: "#8A9BBF" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#00c8ff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#8A9BBF")}
          >
            pat@adaptivefactory.net
          </a>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title} className="col-span-1">
            <p className="text-sm font-semibold text-primary-text mb-4">{title}</p>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-body-sm transition-colors duration-150"
                    style={{ color: "#6a9ac0" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#00c8ff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#6a9ac0")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="divider-gradient mb-8" />

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-6">
        <p style={{ fontSize: 13, color: "#6a7a9a", lineHeight: 1.6, maxWidth: 640 }}>
          EKAS is in active development. All pilot engagements are paid professional programs. AdaptiveFactory AI Solutions, Inc. is an independent Michigan C-corporation.
        </p>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-start gap-1">
            <span style={{ fontSize: 10, color: "#6a8aaa", textTransform: "uppercase", letterSpacing: "0.08em" }}>Infrastructure</span>
            <Image
              src="https://d0.awsstatic.com/logos/powered-by-aws-white.png"
              alt="Powered by AWS"
              width={100}
              height={20}
              style={{ height: 20, opacity: 0.7 }}
              unoptimized
            />
          </div>
          <div className="flex flex-col items-start gap-1">
            <span style={{ fontSize: 10, color: "#6a8aaa", textTransform: "uppercase", letterSpacing: "0.08em" }}>Code Quality</span>
            <Image
              src="https://sonarcloud.io/images/project_badges/sonarcloud-light.svg"
              alt="SonarCloud"
              width={120}
              height={20}
              style={{ height: 20, opacity: 0.7 }}
              unoptimized
            />
          </div>
        </div>
      </div>

      <p style={{ fontSize: 13, color: "#6a8aaa", lineHeight: 1.6 }}>
        © {new Date().getFullYear()} AdaptiveFactory AI Solutions, Inc.
      </p>
    </div>
  </footer>
);

export default FooterSection;
