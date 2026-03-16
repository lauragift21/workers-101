import { SlideFrame, PatternBackground, CodeBlock } from "../components";

const testCmds = `# Create a bookmark with tags
curl -X POST http://localhost:8787/bookmarks \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://workers.cloudflare.com",
       "title": "Workers Docs", "tags": "cloudflare,dev-tools"}'

# Filter by tag
curl "http://localhost:8787/bookmarks?tag=dev-tools"

# Get by ID (first request hits D1, second returns from KV)
curl http://localhost:8787/bookmarks/<id>
curl http://localhost:8787/bookmarks/<id>`;

const responseExample = `// Second GET returns "_cached": true
{
  "id": "a1b2c3d4",
  "url": "https://workers.cloudflare.com",
  "title": "Workers Docs",
  "tags": "cloudflare,dev-tools",
  "_cached": true
}`;

export default function TestingStep4Slide() {
  return (
    <SlideFrame className="flex flex-col p-8">
      <PatternBackground className="opacity-20" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-white bg-cf-orange px-3 py-1 rounded-full">
          Step 4 - Try It
        </span>
        <img src="/logos/cloudflare.svg" alt="Cloudflare" className="h-8" />
      </div>

      <h1 className="relative z-10 text-3xl font-bold text-cf-text mb-1">
        Test D1 + KV Cache
      </h1>
      <p className="relative z-10 text-sm text-cf-text-muted mb-4">
        Test tag filtering, and verify the cache-aside pattern by checking for
        the <code className="font-mono">_cached</code> field.
      </p>

      <div className="relative z-10 flex-1 grid grid-cols-[1.3fr_1fr] gap-5 items-start">
        <CodeBlock
          code={testCmds}
          language="bash"
          filename="Terminal"
          showLineNumbers={false}
          maxHeight="380px"
        />

        <div className="flex flex-col gap-3">
          <CodeBlock
            code={responseExample}
            language="jsonc"
            filename="Response comparison"
            showLineNumbers={false}
          />

          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
            <p className="text-xs text-amber-800">
              <strong>Verify caching:</strong> GET a bookmark twice. The first
              response comes from D1. The second includes{" "}
              <code className="font-mono">"_cached": true</code> — served from
              KV.
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-2.5 flex items-center gap-3">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#16a34a"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <p className="text-xs text-green-700">
              Tag filtering works and _cached shows up on second read? You're
              ready for Step 5.
            </p>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
