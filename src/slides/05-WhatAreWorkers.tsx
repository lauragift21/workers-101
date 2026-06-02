import { SlideFrame, PatternBackground, Card } from "../components";

const features = [
  {
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Only pay for what you use",
    desc: "Pay only for execution time (CPU time), not idle time spent waiting on I/O.",
  },
  {
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
    title: "Near your users, or your data",
    desc: "Deploy once, run in Cloudflare's 330+ cities by default. Use Smart Placement to run near your data.",
  },
  {
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    title: "No cold starts",
    desc: "Don't keep users waiting, or spend your time pre-warming machines. V8 isolates spin up instantly.",
  },
  {
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
      </svg>
    ),
    title: "Infinite concurrency",
    desc: "No pre-provisioned concurrency needed. Scale up on demand no matter how many concurrent users you have.",
  },
  {
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12V7H5a2 2 0 00-2 2v10a2 2 0 002 2h16v-5" />
        <path d="M12 12a3 3 0 103 3m-3-3a3 3 0 11-3 3m3-3v3" />
      </svg>
    ),
    title: "First-class local dev",
    desc: "Test changes locally with workerd, Cloudflare's open-source runtime. No surprises on deploy.",
  },
  {
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "JS, TS, Python or Rust",
    desc: "Choose from a template in your language to kickstart building. Write in what your team knows best.",
  },
];

export default function WhatAreWorkersSlide() {
  return (
    <SlideFrame className="flex flex-col p-8">
      <PatternBackground className="opacity-20" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-cf-orange bg-cf-orange-light px-3 py-1 rounded-full">
          Core Concepts
        </span>
        <img src="/logos/cloudflare.svg" alt="Cloudflare" className="h-8" />
      </div>

      <h1 className="relative z-10 text-3xl font-bold text-cf-text mb-1">
        What Are Cloudflare Workers?
      </h1>
      <p className="relative z-10 text-sm text-cf-text-muted mb-5">
        Serverless functions that run on Cloudflare's global edge network.
        Deploy once, run everywhere, with zero cold starts.
      </p>

      <div className="relative z-10 grid grid-cols-2 gap-5">
        {features.map((f) => (
          <Card key={f.title} corners cornerSize="sm" className="p-5">
            <div className="text-cf-orange mb-0.5">{f.icon}</div>
            <p className="text-md font-bold text-cf-text">{f.title}</p>
            <p className="text-sm text-cf-text-muted">
              {f.desc}
            </p>
          </Card>
        ))}
      </div>
    </SlideFrame>
  );
}
