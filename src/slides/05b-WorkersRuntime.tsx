import { SlideFrame, PatternBackground, Card } from "../components";

const works = [
  { name: "fetch()", desc: "HTTP client & server (standard web API)" },
  { name: "crypto", desc: "UUIDs, hashing, random values (Web Crypto)" },
  { name: "URL / Headers", desc: "Standard URL and header parsing" },
  { name: "WebSocket", desc: "Real-time bidirectional communication" },
  { name: "fetch handler", desc: "Entry point — no app.listen() needed" },
  { name: "env", desc: "Bindings (KV, D1, AI) injected at runtime" },
];

const nope = [
  { name: "fs / path", desc: "No filesystem access" },
  { name: "http / net", desc: "No Node.js server modules" },
  { name: "process.env", desc: "Use env bindings instead" },
  { name: "require()", desc: "Use ES modules (import)" },
  { name: "Buffer", desc: "Use Uint8Array or enable nodejs_compat" },
  { name: "Global state", desc: "Fresh isolate per request — no shared memory" },
];

export default function WorkersRuntimeSlide() {
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
        The Workers Runtime
      </h1>
      <p className="relative z-10 text-sm text-cf-text-muted mb-4">
        Web Standards APIs — not Node.js. Each request runs in a fresh V8
        isolate. No filesystem, no long-running process, no shared state.
      </p>

      <div className="relative z-10 flex-1 grid grid-cols-2 gap-5">
        {/* Left: what works */}
        <Card corners cornerSize="sm" className="p-4">
          <p className="text-sm font-bold text-cf-text mb-3">
            ✅ Built right in
          </p>
          <div className="space-y-2.5">
            {works.map((item) => (
              <div
                key={item.name}
                className="flex items-start gap-2.5 bg-white rounded-lg border border-cf-border px-3 py-2"
              >
                <span className="text-green-600 mt-0.5">&bull;</span>
                <div>
                  <code className="text-sm font-bold text-cf-text font-mono">
                    {item.name}
                  </code>
                  <p className="text-[10px] text-cf-text-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right: what does not work */}
        <Card corners cornerSize="sm" className="p-4">
          <p className="text-sm font-bold text-cf-text mb-3">
            ❌ Not available
          </p>
          <div className="space-y-2.5">
            {nope.map((item) => (
              <div
                key={item.name}
                className="flex items-start gap-2.5 bg-white rounded-lg border border-cf-border px-3 py-2 opacity-70"
              >
                <span className="text-red-500 mt-0.5">&bull;</span>
                <div>
                  <code className="text-sm font-bold text-cf-text font-mono">
                    {item.name}
                  </code>
                  <p className="text-[10px] text-cf-text-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="relative z-10 mt-3 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2.5">
        <p className="text-xs text-blue-800">
          <strong>Why this matters:</strong> Your code runs in a V8 isolate
          that starts fresh for every request. There is no server process to
          keep warm, no filesystem to read from, and no global variables shared
          between requests. This is what makes Workers portable across 300+
          cities — and why there are no cold starts.
        </p>
      </div>
    </SlideFrame>
  );
}
