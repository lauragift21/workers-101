import { SlideFrame, PatternBackground, CodeBlock } from "../components";

const gatewayCode = `// Before: direct AI call
const response = await env.AI.run(
  "@cf/meta/llama-3.1-8b-instruct-fast",
  { messages }
);

// After: routed through AI Gateway
const response = await env.AI.run(
  "@cf/meta/llama-3.1-8b-instruct-fast",
  { messages },
  {
    gateway: {
      id: "bookmark-gateway",
      skipCache: false,
      cacheTtl: 86400,  // 24 hours
    },
  }
);`;

const setupSteps = `Steps:
1. Go to Cloudflare Dashboard
2. Select AI > AI Gateway
3. Click Create Gateway
4. Name it "bookmark-gateway"`;

const benefits = [
  {
    title: "Caching",
    desc: "Identical AI requests return cached responses. Save tokens and reduce latency.",
  },
  {
    title: "Analytics",
    desc: "Request count, cache hit rate, latency, token usage, and error rate in the dashboard.",
  },
  {
    title: "Rate Limiting",
    desc: "Control request volume to manage costs and prevent abuse.",
  },
  {
    title: "Logging",
    desc: "Full request/response logging for debugging and auditing AI calls.",
  },
];

export default function Step6AIGatewaySlide() {
  return (
    <SlideFrame className="flex flex-col p-8">
      <PatternBackground className="opacity-20" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-white bg-cf-orange px-3 py-1 rounded-full">
          Step 6 - AI Gateway
        </span>
        <img src="/logos/cloudflare.svg" alt="Cloudflare" className="h-8" />
      </div>

      <h1 className="relative z-10 text-3xl font-bold text-cf-text mb-1">
        AI Gateway
      </h1>
      <p className="relative z-10 text-sm text-cf-text-muted mb-4">
        Route AI calls through a managed gateway for caching, monitoring, and
        cost control. One extra parameter, zero code changes.
      </p>

      <div className="relative z-10 flex-1 grid grid-cols-[1.3fr_1fr] gap-5 items-start">
        <div className="flex flex-col gap-3">
           <CodeBlock
            code={setupSteps}
            language="text"
            filename="Dashboard Setup"
            showLineNumbers={false}
          />
          <CodeBlock
            code={gatewayCode}
            language="typescript"
            filename="src/index.ts"
            showLineNumbers={false}
            maxHeight="280px"
          />
         
        </div>

        <div className="flex flex-col gap-2.5">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="bg-white rounded-lg border border-cf-border px-4 py-3"
            >
              <p className="text-xs font-bold text-cf-text">{b.title}</p>
              <p className="text-[10px] text-cf-text-muted mt-0.5">{b.desc}</p>
            </div>
          ))}

          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
            <p className="text-xs text-blue-800">
              <strong>Setup:</strong> Create an AI Gateway in the Cloudflare
              Dashboard under AI &gt; AI Gateway. Name it "bookmark-gateway".
            </p>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
