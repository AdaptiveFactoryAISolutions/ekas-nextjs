import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "FAQs",
  description: "Common questions about EKAS — what it is, what it connects to, deployment timelines, security, IATF 16949 support, EvidencePackets, and how it differs from MES/BI tools.",
  path: "/resources/faqs",
});

export default function FAQsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
