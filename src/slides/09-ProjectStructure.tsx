import { SlideFrame, PatternBackground, CodeBlock } from "../components";

const fileTree = `bookmark-api/
  src/
    index.ts        # Your Worker code (fetch handler)
  wrangler.jsonc    # Cloudflare config (bindings, routes)
  package.json      # Dependencies and scripts
  tsconfig.json     # TypeScript configuration`;

const wranglerCode = `{
  "name": "bookmark-api",
  "main": "src/index.ts",
  "compatibility_date": "2026-03-11",
  "compatibility_flags": ["nodejs_compat"]
}`;

const features = [
  {
    file: "src/index.ts",
    desc: "The fetch handler. This is where all your Worker logic lives.",
  },
  {
    file: "wrangler.jsonc",
    desc: "Project config. Defines bindings (KV, D1, AI), routes, and deployment settings.",
  },
  {
    file: "package.json",
    desc: 'Scripts: "dev" starts local server, "deploy" ships to production.',
  },
];

export default function ProjectStructureSlide() {
  return (
    <SlideFrame className="flex flex-col p-8">
      <PatternBackground className="opacity-20" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-cf-orange bg-cf-orange-light px-3 py-1 rounded-full">
          Step 1
        </span>
        <img src="/logos/cloudflare.svg" alt="Cloudflare" className="h-8" />
      </div>

      <h1 className="relative z-10 text-3xl font-bold text-cf-text mb-1">
        Project Structure
      </h1>
      <p className="relative z-10 text-sm text-cf-text-muted mb-4">
        A minimal Worker project. Everything you need.
      </p>

      <div className="relative z-10 flex-1 grid grid-cols-[1fr_1fr] gap-5 items-start">
        {/* Left: file tree + wrangler */}
        <div className="flex flex-col gap-3">
          <CodeBlock
            code={fileTree}
            language="text"
            filename="File Structure"
            showLineNumbers={false}
          />
          <CodeBlock
            code={wranglerCode}
            language="jsonc"
            filename="wrangler.jsonc"
            showLineNumbers={false}
          />
        </div>

        {/* Right: descriptions */}
        <div className="flex flex-col gap-3">
          {features.map((f) => (
            <div
              key={f.file}
              className="bg-white rounded-lg border border-cf-border px-4 py-3"
            >
              <code className="text-sm font-bold text-cf-orange font-mono">
                {f.file}
              </code>
              <p className="text-xs text-cf-text-muted mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}
