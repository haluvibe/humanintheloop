"use client";

import { FormEvent, useState } from "react";

function OrbitalLoop() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Outer glow */}
      <div className="absolute w-[600px] h-[600px] rounded-full gradient-radial animate-pulse-glow" />

      {/* Outer ring */}
      <svg
        className="absolute w-[500px] h-[500px] animate-orbit-slow"
        viewBox="0 0 500 500"
      >
        <circle
          cx="250"
          cy="250"
          r="230"
          fill="none"
          stroke="url(#gradient1)"
          strokeWidth="1"
          strokeDasharray="20 10"
          className="animate-dash"
          opacity="0.4"
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0097fe" />
            <stop offset="100%" stopColor="#0396df" />
          </linearGradient>
        </defs>
      </svg>

      {/* Middle ring */}
      <svg
        className="absolute w-[400px] h-[400px] animate-orbit-reverse"
        viewBox="0 0 400 400"
      >
        <circle
          cx="200"
          cy="200"
          r="180"
          fill="none"
          stroke="#0097fe"
          strokeWidth="0.5"
          opacity="0.3"
        />
        {/* Orbiting node */}
        <circle cx="200" cy="20" r="6" fill="#0097fe" className="glow-text">
          <animate
            attributeName="opacity"
            values="0.5;1;0.5"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      {/* Inner ring */}
      <svg
        className="absolute w-[280px] h-[280px] animate-orbit"
        viewBox="0 0 280 280"
      >
        <circle
          cx="140"
          cy="140"
          r="120"
          fill="none"
          stroke="url(#gradient2)"
          strokeWidth="2"
          opacity="0.5"
        />
        {/* Human node */}
        <g transform="translate(140, 20)">
          <circle r="10" fill="#0d1a26" stroke="#00b4ff" strokeWidth="2" />
          <circle r="4" fill="#00b4ff" />
        </g>
        <defs>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00b4ff" />
            <stop offset="50%" stopColor="#0396df" />
            <stop offset="100%" stopColor="#006ec7" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center pulse */}
      <div className="absolute w-4 h-4 rounded-full bg-blue-bright animate-pulse-glow" />
    </div>
  );
}

function QuestIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}) {
  return (
    <div
      className={`group relative p-6 rounded-2xl bg-navy-base/50 border border-white/5 hover:border-blue-accent/30 transition-all duration-500 hover:-translate-y-1 glow-border opacity-0 animate-fade-in-up ${delay}`}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative">
        <div className="w-12 h-12 rounded-xl bg-navy-mid flex items-center justify-center mb-4 group-hover:bg-blue-accent/20 transition-colors duration-300">
          {icon}
        </div>
        <h3
          className="text-lg font-semibold mb-2 text-white"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          {title}
        </h3>
        <p className="text-white/60 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const website = formData.get("website") as string;

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-navy-deep grid-pattern">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div
            className="flex items-center gap-2 opacity-0 animate-fade-in"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            <QuestIcon className="w-6 h-6 text-blue-bright" />
            <span className="text-lg font-bold tracking-tight">
              Human in the L<span className="text-blue-bright">ooo</span>p
            </span>
          </div>
          <a
            href="#waitlist"
            className="opacity-0 animate-fade-in delay-200 px-4 py-2 text-sm font-medium text-white/80 hover:text-white border border-white/10 rounded-full hover:border-blue-accent/50 transition-all duration-300"
          >
            Join Waitlist
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background orbital animation */}
        <OrbitalLoop />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Tagline */}
          <div className="opacity-0 animate-fade-in-up mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-accent/10 border border-blue-accent/20 text-blue-bright text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-bright animate-pulse" />
              A quest to make automation trustworthy
            </span>
          </div>

          {/* Main headline */}
          <h1
            className="opacity-0 animate-fade-in-up delay-100 text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            We custom automate
            <br />
            <span className="glow-text text-blue-bright">
              (almost) anything
            </span>
          </h1>

          {/* Subheadline */}
          <p className="opacity-0 animate-fade-in-up delay-200 text-xl md:text-2xl text-white/70 mb-4 max-w-2xl mx-auto leading-relaxed">
            Most automation tools are generic <br />— built for everyone, not
            for you. <br />
          </p>

          <p className="opacity-0 animate-fade-in-up delay-300 text-lg text-white/50 mb-12 max-w-xl mx-auto">
            We design and build custom automation workflows that fit your exact
            use case and the way your team actually works.
          </p>

          {/* CTA */}
          <div className="opacity-0 animate-fade-in-up delay-400">
            <a
              href="#waitlist"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-accent to-blue-bright text-white font-semibold rounded-full hover:shadow-lg hover:shadow-blue-accent/30 transition-all duration-300 hover:-translate-y-0.5 glow-box"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Begin Your Quest
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in delay-800">
            <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
              <div className="w-1 h-2 rounded-full bg-white/40 animate-float" />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4 opacity-0 animate-fade-in-up"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              The land of &ldquo;Fully Automated&rdquo;
              <br />
              <span className="text-white/50">is littered with ruins.</span>
            </h2>
            <p className="text-white/60 max-w-xl mx-auto opacity-0 animate-fade-in-up delay-100">
              Most automation dies not from lack of intelligence — but from lack
              of judgment.
            </p>
          </div>

          {/* Feature grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={
                <svg
                  className="w-6 h-6 text-blue-bright"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              }
              title="Automate the Known"
              description="Deterministic, repeatable steps run at machine speed."
              delay="delay-100"
            />
            <FeatureCard
              icon={
                <svg
                  className="w-6 h-6 text-blue-bright"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              }
              title="Detect Uncertainty"
              description="When confidence drops, the system pauses — intentionally."
              delay="delay-200"
            />
            <FeatureCard
              icon={
                <svg
                  className="w-6 h-6 text-blue-bright"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              }
              title="Summon the Human"
              description="A trained operator enters with context, tools, and authority."
              delay="delay-300"
            />
            <FeatureCard
              icon={
                <svg
                  className="w-6 h-6 text-blue-bright"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              }
              title="Learn & Loop"
              description="Each intervention strengthens the system for the next run."
              delay="delay-400"
            />
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Decorative gradient */}
        <div className="absolute inset-0 gradient-radial opacity-30" />

        <div className="relative max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-8 opacity-0 animate-fade-in-up"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Why &ldquo;L
            <span className="text-blue-bright">ooo</span>p&rdquo;?
          </h2>

          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto opacity-0 animate-fade-in-up delay-100">
            Because real systems aren&apos;t linear. They loop through
            exceptions, through learning, through human judgment, through
            continuous improvement.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="opacity-0 animate-slide-in-left delay-200">
              <div
                className="text-6xl font-bold text-blue-accent/20 mb-2"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                01
              </div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                No Black Boxes
              </h3>
              <p className="text-white/50 text-sm">
                Transparent systems where every decision is traceable.
              </p>
            </div>
            <div className="opacity-0 animate-slide-in-left delay-300">
              <div
                className="text-6xl font-bold text-blue-accent/20 mb-2"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                02
              </div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                No Blind Spots
              </h3>
              <p className="text-white/50 text-sm">
                Human oversight where consequences matter most.
              </p>
            </div>
            <div className="opacity-0 animate-slide-in-left delay-400">
              <div
                className="text-6xl font-bold text-blue-accent/20 mb-2"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                03
              </div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Real World Ready
              </h3>
              <p className="text-white/50 text-sm">
                Systems designed for uncertainty, not just happy paths.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="relative py-32 px-6">
        <div className="max-w-xl mx-auto">
          <div className="relative p-8 md:p-12 rounded-3xl bg-navy-base/80 border border-white/5 glow-box">
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-blue-accent/30 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-blue-accent/30 rounded-br-3xl" />

            <div className="text-center mb-8">
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Ready to start
                <br />
                <span className="text-blue-bright">your quest?</span>
              </h2>
              <p className="text-white/60">
                Join the waitlist and be first to know when we launch.
              </p>
            </div>

            {status === "success" ? (
              <div className="text-center py-8 animate-scale-in">
                <div className="w-16 h-16 rounded-full bg-blue-accent/20 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-bright"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  Quest accepted!
                </h3>
                <p className="text-white/60">
                  We&apos;ll be in touch when we&apos;re ready to begin.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field - hidden from real users, bots will fill it */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute opacity-0 h-0 w-0 pointer-events-none"
                  aria-hidden="true"
                />
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-6 py-4 bg-navy-mid/50 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-blue-accent/50 focus:ring-2 focus:ring-blue-accent/20 transition-all duration-300"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-accent to-blue-bright text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-accent/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {status === "loading" ? (
                    <>
                      <svg
                        className="w-5 h-5 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Joining...
                    </>
                  ) : (
                    <>
                      Join the Waitlist
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}

            <p className="text-center text-white/30 text-xs mt-6">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div
            className="flex items-center gap-2 text-white/50"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            <QuestIcon className="w-5 h-5" />
            <span className="text-sm font-medium">
              Human in the L<span className="text-blue-bright/70">ooo</span>p
            </span>
          </div>
          <p className="text-white/30 text-sm">
            &copy; {new Date().getFullYear()} Human in the Looop. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
