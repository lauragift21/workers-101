import { SlideFrame, PatternBackground, CodeBlock } from "../components";

const createKV = `# Create a KV namespace
npx wrangler kv namespace create "BOOKMARKS"

# Generate types for the binding
npx wrangler types`;

const wranglerConfig = `{
  "kv_namespaces": [
    {
      "binding": "BOOKMARKS",
      "id": "<your-namespace-id>"
    }
  ]
}`;

const migratedCode = `// Before (in-memory):
const bookmark = bookmarks.get(id);

// After (KV):
const bookmark = await env.BOOKMARKS.get(id, "json");

// Before (in-memory):
bookmarks.set(bookmark.id, bookmark);

// After (KV):
await env.BOOKMARKS.put(
  bookmark.id,
  JSON.stringify(bookmark)
);`;

function StepLabel({ num, text }: { num: number; text: string }) {
  return (
    <div className="flex items-center gap-3 h-6">
      <div className="w-6 h-6 rounded-full bg-cf-orange flex items-center justify-center shrink-0">
        <span className="text-[10px] font-bold text-white">{num}</span>
      </div>
      <span className="text-sm font-bold text-cf-text">{text}</span>
    </div>
  );
}

export default function Step3KVSetupSlide() {
  return (
    <SlideFrame className="flex flex-col p-8">
      <PatternBackground className="opacity-20" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-white bg-cf-orange px-3 py-1 rounded-full">
          Step 3 - KV Storage
        </span>
        <img src="/logos/cloudflare.svg" alt="Cloudflare" className="h-8" />
      </div>

      <h1 className="relative z-10 text-3xl font-bold text-cf-text mb-1">
        Migrate to KV
      </h1>
      <p className="relative z-10 text-sm text-cf-text-muted mb-4">
        Create a KV namespace, add the binding, and replace Map operations with
        KV calls.
      </p>

      <div className="relative z-10 flex-1 grid grid-cols-2 gap-5 items-start">
        {/* Left: Setup steps */}
        <div className="flex flex-col gap-3">
          <StepLabel num={1} text="Create namespace + add to config" />
          <CodeBlock
            code={createKV}
            language="bash"
            filename="Terminal"
            showLineNumbers={false}
          />
          <StepLabel num={2} text="Add binding to wrangler.jsonc" />
          <CodeBlock
            code={wranglerConfig}
            language="jsonc"
            filename="wrangler.jsonc"
            showLineNumbers={false}
          />
        </div>

        {/* Right: Code migration */}
        <div className="flex flex-col gap-3">
          <StepLabel num={3} text="Update handler functions" />
          <CodeBlock
            code={migratedCode}
            language="typescript"
            filename="Before vs After"
            showLineNumbers={false}
            maxHeight="320px"
          />
        </div>
      </div>
    </SlideFrame>
  );
}
