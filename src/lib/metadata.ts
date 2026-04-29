import type { Metadata } from "next";

const SITE_NAME = "EKAS by AdaptiveFactory";

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: path ? { canonical: path } : undefined,
    openGraph: {
      type: "website",
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
