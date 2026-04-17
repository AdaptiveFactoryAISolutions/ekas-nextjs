import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "rgba(10,14,26,0.95)" }}>
      <div className="text-center">
        <h1 className="text-hero text-primary-text mb-4" style={{ fontFamily: "var(--font-rajdhani)" }}>
          404
        </h1>
        <p className="text-body-lg text-secondary-text mb-8">
          Oops! Page not found
        </p>
        <Link href="/" className="btn-primary">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
