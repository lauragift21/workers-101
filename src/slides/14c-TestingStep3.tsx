import { SlideFrame, PatternBackground, CodeBlock } from "../components";

const testCmds = `# Create a bookmark
curl -X POST http://localhost:8787/bookmarks \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://workers.cloudflare.com", "title": "Workers Docs"}'

# List all bookmarks
curl http://localhost:8787/bookmarks

# Now restart the dev server (Ctrl+C, then npx wrangler dev)
# List again -- data should still be there!
curl http://localhost:8787/bookmarks`;

const responseExample = `{
  "bookmarks": [
    {
      "id": "a1b2c3d4",
      "url": "https://workers.cloudflare.com",
      "title": "Workers Docs",
      "createdAt": "2026-03-10T14:30:00.000Z"
    }
  ],
  "count": 1
}`;

export default function TestingStep3Slide() {
  return (
    <SlideFrame className="flex flex-col p-8">
      <PatternBackground className="opacity-20" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-white bg-cf-orange px-3 py-1 rounded-full">
          Step 3 - Try It
        </span>
        <img src="/logos/cloudflare.svg" alt="Cloudflare" className="h-8" />
      </div>

      <h1 className="relative z-10 text-3xl font-bold text-cf-text mb-1">
        Test KV Persistence
      </h1>
      <p className="relative z-10 text-sm text-cf-text-muted mb-4">
        Create a bookmark, restart the dev server, and verify data persists.
        This is the key difference from the in-memory version.
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
            filename="Response (after restart)"
            showLineNumbers={false}
          />

          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
            <p className="text-xs text-amber-800">
              <strong>Key test:</strong> Restart your dev server and list
              bookmarks again. Unlike Step 2, your data survives restarts
              because it's stored in KV, not in memory.
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
              Data survives restarts? You're ready for Step 4.
            </p>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
