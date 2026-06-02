import { SlideFrame, PatternBackground, Card } from "../components";

const steps = [
  {
    num: 1,
    title: "Getting Started",
    desc: "Scaffold the project and understand the runtime",
  },
  {
    num: 2,
    title: "Routes and CRUD Endpoints",
    desc: "Build routing and 4 endpoints with in-memory storage",
  },
  {
    num: 3,
    title: "Persistent Storage with KV",
    desc: "Replace in-memory data with persistent key-value storage",
  },
  {
    num: 4,
    title: "D1 Database + KV Cache",
    desc: "Add SQL database as source of truth with KV read cache",
  },
  {
    num: 5,
    title: "AI-Powered Summaries",
    desc: "Generate AI-powered bookmark summaries automatically",
  },
  {
    num: 6,
    title: "AI Gateway",
    desc: "Add caching, analytics, and rate limiting to AI calls",
  },
  {
    num: 7,
    title: "Deploy to Production",
    desc: "Ship globally with live logs and rollbacks",
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

      <div className="relative z-10 grid grid-cols-2 gap-5">
        {steps.map((step) => (
          <Card
            key={step.num}
            corners cornerSize="sm" 
            className="flex items-center gap-2.5 bg-white rounded-lg border border-cf-border px-3 py-2"
          >
            <div className="w-6 h-6 rounded-full bg-cf-orange flex items-center justify-center shrink-0">
              <span className="text-[10px] font-bold text-white">{step.num}</span>
            </div>
            <div className="flex-1 min-w-0 py-4">
              <p className="text-md font-bold text-cf-text leading-tight">{step.title}</p>
              <p className="text-sm text-cf-text-muted leading-tight">
                {step.desc}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </SlideFrame>
  );
}
