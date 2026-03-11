import { SlideFrame, PatternBackground } from "../components";

const steps = [
  {
    num: 1,
    title: "Getting Started",
    desc: "Scaffold the project and understand the runtime",
    duration: "10 min",
  },
  {
    num: 2,
    title: "Routes and CRUD Endpoints",
    desc: "Build routing and 4 endpoints with in-memory storage",
    duration: "20 min",
  },
  {
    num: 3,
    title: "Persistent Storage with KV",
    desc: "Replace in-memory data with persistent key-value storage",
    duration: "15 min",
  },
  {
    num: 4,
    title: "D1 Database + KV Cache",
    desc: "Add SQL database as source of truth with KV read cache",
    duration: "20 min",
  },
  {
    num: 5,
    title: "AI-Powered Summaries",
    desc: "Generate AI-powered bookmark summaries automatically",
    duration: "20 min",
  },
  {
    num: 6,
    title: "AI Gateway",
    desc: "Add caching, analytics, and rate limiting to AI calls",
    duration: "10 min",
  },
  {
    num: 7,
    title: "Deploy to Production",
    desc: "Ship globally with secrets, monitoring, and rollback",
    duration: "5 min",
  },
];

export default function WhatWeAreBuildingSlide() {
  return (
    <SlideFrame className="flex flex-col p-8">
      <PatternBackground className="opacity-20" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-cf-orange bg-cf-orange-light px-3 py-1 rounded-full">
          Workshop Overview
        </span>
        <img src="/logos/cloudflare.svg" alt="Cloudflare" className="h-8" />
      </div>

      <h1 className="relative z-10 text-3xl font-bold text-cf-text mb-1">
        Building a Bookmark API
      </h1>
      <p className="relative z-10 text-sm text-cf-text-muted mb-4">
        One project, 7 progressive steps. Each builds on the last.
      </p>

      <div className="relative z-10 flex-1 grid grid-cols-[1fr_1fr] gap-x-5 gap-y-2">
        {steps.map((step) => (
          <div
            key={step.num}
            className="flex items-start gap-3 bg-white rounded-lg border border-cf-border px-4 py-2.5"
          >
            <div className="w-7 h-7 rounded-full bg-cf-orange flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xs font-bold text-white">{step.num}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-cf-text">{step.title}</p>
                <span className="text-[10px] text-cf-text-muted font-mono">
                  {step.duration}
                </span>
              </div>
              <p className="text-[11px] text-cf-text-muted mt-0.5">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SlideFrame>
  );
}
