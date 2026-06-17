import { useEffect } from "react";
import { SITE_URL, DEFAULT_OG_IMAGE, ROUTE_META, FALLBACK_META } from "@/lib/seo";

interface SeoProps {
  /** Exact route path, e.g. "/platform". Must match a key in ROUTE_META. */
  route: string;
}

/**
 * Per-route head manager. Sets a unique <title>, meta description, canonical,
 * and Open Graph / Twitter tags on mount and whenever the route changes.
 *
 * This is a client-side head manager. For full crawler coverage of a client-
 * rendered SPA, pair it with pre-rendering/SSR (tracked separately). It still
 * fixes duplicate titles/descriptions for engines that execute JS and for
 * social scrapers that render the page.
 */
function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function Seo({ route }: SeoProps) {
  useEffect(() => {
    const meta = ROUTE_META[route] ?? FALLBACK_META;
    const url = `${SITE_URL}${route === "/" ? "" : route}`;
    const image = meta.image ?? DEFAULT_OG_IMAGE;

    document.title = meta.title;

    setMeta('meta[name="description"]', "name", "description", meta.description);
    setCanonical(url);

    setMeta('meta[property="og:title"]', "property", "og:title", meta.title);
    setMeta('meta[property="og:description"]', "property", "og:description", meta.description);
    setMeta('meta[property="og:url"]', "property", "og:url", url);
    setMeta('meta[property="og:image"]', "property", "og:image", image);
    setMeta('meta[property="og:type"]', "property", "og:type", "website");
    setMeta('meta[property="og:site_name"]', "property", "og:site_name", "Adaptive Factory");

    setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", meta.title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", meta.description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", image);
  }, [route]);

  return null;
}
