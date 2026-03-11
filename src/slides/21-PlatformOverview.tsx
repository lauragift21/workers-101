import { SlideFrame, PatternBackground, Card } from "../components";

const products = [
  {
    name: "Workers",
    desc: "Serverless compute at the edge. The runtime for everything.",
    used: true,
  },
  {
    name: "Workers KV",
    desc: "Global key-value storage. Eventually consistent, high-read performance.",
    used: true,
  },
  {
    name: "D1",
    desc: "Serverless SQL database (SQLite). Strong consistency, full SQL.",
    used: true,
  },
  {
    name: "Workers AI",
    desc: "Run AI models on Cloudflare GPUs. 70+ models, no API keys.",
    used: true,
  },
  {
    name: "AI Gateway",
    desc: "Caching, analytics, and rate limiting for AI calls.",
    used: true,
  },
  {
    name: "R2",
    desc: "Object storage (S3-compatible). Zero egress fees.",
    used: false,
  },
  {
    name: "Durable Objects",
    desc: "Stateful, single-instance compute. Great for coordination and real-time.",
    used: false,
  },
  {
    name: "Queues",
    desc: "Message queues for async processing and background jobs.",
    used: false,
  },
  {
    name: "Workflows",
    desc: "Durable, multi-step execution with retries and checkpointing.",
    used: false,
  },
  {
    name: "Agents SDK",
    desc: "Build stateful AI agents with WebSockets, tools, and scheduling.",
    used: false,
  },
];

export default function PlatformOverviewSlide() {
  return (
    <SlideFrame className="flex flex-col p-8">
      <PatternBackground className="opacity-20" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-cf-orange bg-cf-orange-light px-3 py-1 rounded-full">
          Platform
        </span>
        <img src="/logos/cloudflare.svg" alt="Cloudflare" className="h-8" />
      </div>

      <h1 className="relative z-10 text-3xl font-bold text-cf-text mb-1">
        The Cloudflare Developer Platform
      </h1>
      <p className="relative z-10 text-sm text-cf-text-muted mb-4">
        We used 5 products today. Here's the full picture of what's available.
      </p>

      <div className="relative z-10 flex-1">
        <Card corners cornerSize="sm" className="p-4">
          <div className="grid grid-cols-2 gap-2.5">
            {products.map((p) => (
              <div
                key={p.name}
                className={`rounded-lg px-3.5 py-2.5 border ${p.used ? "bg-cf-orange/5 border-cf-orange/30" : "bg-white border-cf-border"}`}
              >
                <div className="flex items-center gap-2">
                  <p
                    className={`text-sm font-bold ${p.used ? "text-cf-orange" : "text-cf-text"}`}
                  >
                    {p.name}
                  </p>
                  {p.used && (
                    <span className="text-[8px] font-bold text-cf-orange bg-cf-orange-light px-1.5 py-0.5 rounded-full">
                      USED TODAY
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-cf-text-muted mt-0.5">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </SlideFrame>
  );
}
