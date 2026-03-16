import { SlideFrame, PatternBackground } from "../components";

const steps = [
  {
    num: 1,
    title: "Getting Started",
    detail: "Scaffolded a Worker, understood the fetch handler and V8 runtime",
  },
  {
    num: 2,
    title: "HTTP & CRUD",
    detail:
      "Built a full REST API with URL routing, request parsing, and proper status codes",
  },
  {
    num: 3,
    title: "KV Storage",
    detail:
      "Replaced in-memory data with globally distributed key-value persistence",
  },
  {
    num: 4,
    title: "D1 + KV Cache",
    detail:
      "Added SQL database as source of truth with cache-aside pattern for reads",
  },
  {
    num: 5,
    title: "Workers AI",
    detail:
      "Integrated LLM-powered bookmark summaries with graceful failure handling",
  },
  {
    num: 6,
    title: "AI Gateway",
    detail:
      "Added caching, analytics, and rate limiting for AI calls in one line",
  },
  {
    num: 7,
    title: "Production Deploy",
    detail:
      "Shipped globally with secrets management, auth, live logs, and rollback",
  },
];

const resources = [
  { label: "Workers Docs", url: "https://developers.cloudflare.com/workers" },
  { label: "D1 Docs", url: "https://developers.cloudflare.com/d1" },
  { label: "Workers AI", url: "https://developers.cloudflare.com/workers-ai" },
  { label: "Discord", url: "https://discord.cloudflare.com" },
];

export default function RecapSlide() {
  return (
    <SlideFrame className="flex flex-col p-8">
      <PatternBackground className="opacity-20" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-cf-orange bg-cf-orange-light px-3 py-1 rounded-full">
          Recap
        </span>
        <img src="/logos/cloudflare.svg" alt="Cloudflare" className="h-8" />
      </div>

      <h1 className="relative z-10 text-3xl font-bold text-cf-text mb-1">
        What We Built Today
      </h1>
      <p className="relative z-10 text-sm text-cf-text-muted mb-4">
        From "Hello World" to a production API with a database, caching, and AI
        - deployed globally.
      </p>

      <div className="relative z-10 flex-1 grid grid-cols-[1fr_auto] gap-6 items-start">
        {/* Left: step list */}
        <div className="grid grid-cols-2 gap-2">
          {steps.map((s) => (
            <div
              key={s.num}
              className="flex items-start gap-2.5 bg-white rounded-lg border border-cf-border px-3 py-2.5"
            >
              <div className="w-6 h-6 rounded-full bg-cf-orange flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[10px] font-bold text-white">
                  {s.num}
                </span>
              </div>
              <div>
                <p className="text-xs font-bold text-cf-text">{s.title}</p>
                <p className="text-[10px] text-cf-text-muted mt-0.5">
                  {s.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right: resources */}
        {/* <div className="flex flex-col gap-2 w-[180px]">
          <p className="text-xs font-bold text-cf-text">Resources</p>
          {resources.map((r) => (
            <a
              key={r.label}
              href={r.url}
              target="_blank"
              className="bg-white rounded-lg border border-cf-border px-3 py-2"
            >
              <p className="text-[10px] font-bold text-cf-text">{r.label}</p>
              <p className="text-[9px] text-cf-text-muted font-mono truncate">
                {r.url}
              </p>
            </a>
          ))}
        </div> */}
      </div>
    </SlideFrame>
  );
}
