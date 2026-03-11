import { SlideFrame, PatternBackground, CodeBlock } from "../components";

const workerCode = `export default {
  async fetch(request, env, ctx): Promise<Response> {
    return Response.json({
      message: "Hello from Workers!",
      timestamp: new Date().toISOString(),
    });
  },
} satisfies ExportedHandler<Env>;`;

const params = [
  {
    name: "request",
    type: "Request",
    desc: "The incoming HTTP request (URL, method, headers, body)",
  },
  {
    name: "env",
    type: "Env",
    desc: "Bindings to KV, D1, AI, R2, and other services (no API keys needed)",
  },
  {
    name: "ctx",
    type: "ExecutionContext",
    desc: "waitUntil() for background tasks, passThroughOnException() for fallback",
  },
];

export default function WorkerAnatomySlide() {
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
        Anatomy of a Worker
      </h1>
      <p className="relative z-10 text-sm text-cf-text-muted mb-5">
        Every Worker exports a <code className="font-mono">fetch</code> handler
        that receives a request and returns a response.
      </p>

      <div className="relative z-10 flex-1 grid grid-cols-[1.2fr_1fr] gap-6 items-start">
        {/* Code */}
        <CodeBlock
          code={workerCode}
          language="typescript"
          filename="src/index.ts"
          showLineNumbers
        />

        {/* Parameters */}
        <div className="flex flex-col gap-3">
          {params.map((p) => (
            <div
              key={p.name}
              className="bg-white rounded-lg border border-cf-border px-4 py-3"
            >
              <div className="flex items-center gap-2 mb-1">
                <code className="text-sm font-bold text-cf-orange font-mono">
                  {p.name}
                </code>
                <span className="text-xs text-cf-text-muted font-mono">
                  : {p.type}
                </span>
              </div>
              <p className="text-xs text-cf-text-muted">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}
