import { SlideFrame, PatternBackground, CodeBlock } from "../components";

const testCmds = `# Important: restart dev server with --remote flag
npx wrangler dev --remote

# Create a bookmark -- AI generates a summary automatically
curl -X POST http://localhost:8787/bookmarks \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://developers.cloudflare.com/workers/", "title": "Cloudflare Workers Docs", "tags": "cloudflare,docs"}'

# Check the response -- "summary" field should be populated
curl http://localhost:8787/bookmarks/<id>`;

const responseExample = `{
  "id": "a1b2c3d4",
  "url": "https://developers.cloudflare.com/workers/",
  "title": "Cloudflare Workers Docs",
  "tags": "cloudflare,docs",
  "summary": "Documentation for building apps on Workers.",
  "created_at": "2026-03-10T14:30:00"
}`;

export default function TestingStep5Slide() {
  return (
    <SlideFrame className="flex flex-col p-8">
      <PatternBackground className="opacity-20" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-white bg-cf-orange px-3 py-1 rounded-full">
          Step 5/6 - Try It
        </span>
        <img src="/logos/cloudflare.svg" alt="Cloudflare" className="h-8" />
      </div>

      <h1 className="relative z-10 text-3xl font-bold text-cf-text mb-1">
        Test AI Summaries
      </h1>
      <p className="relative z-10 text-sm text-cf-text-muted mb-4">
        Create a bookmark and verify the AI-generated summary appears in the
        response. Remember to use <code className="font-mono">--remote</code>{" "}
        for this step.
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
            language="json"
            filename="Response (201 Created)"
            showLineNumbers={false}
          />

          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
            <p className="text-xs text-amber-800">
              <strong>--remote required:</strong> AI models run on Cloudflare
              GPUs. Use{" "}
              <code className="font-mono">npx wrangler dev --remote</code> or
              the AI binding won't be available.
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
              Summary field populated? You're ready to deploy!
            </p>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
