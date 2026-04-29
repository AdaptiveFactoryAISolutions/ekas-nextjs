import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Request a Demo",
  description: "Bring one plant problem. EKAS will show you how the platform approaches it using your operational context — industry, process type, and the question you actually need answered.",
  path: "/demo",
});

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
