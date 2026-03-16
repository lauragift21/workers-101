import { SlideFrame, PatternBackground, CodeBlock } from "../components";

const createD1 = `# Create D1 database (auto-adds binding to wrangler.jsonc)
npx wrangler d1 create bookmark-db`;

const wranglerConfig = `{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "bookmark-db",
      "database_id": "<your-database-id>"
    }
  ]
}`;

const schemaSQL = `CREATE TABLE IF NOT EXISTS bookmarks (
  id TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  tags TEXT DEFAULT '',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`;

const applySchema = `# Apply schema locally
npx wrangler d1 execute bookmark-db \\
  --local --file=schema.sql

# Generate updated types
npx wrangler types`;

export default function D1SetupSlide() {
  return (
    <SlideFrame className="flex flex-col p-8">
      <PatternBackground className="opacity-20" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-white bg-cf-orange px-3 py-1 rounded-full">
          Step 4 - D1 Setup
        </span>
        <img src="/logos/cloudflare.svg" alt="Cloudflare" className="h-8" />
      </div>

      <h1 className="relative z-10 text-3xl font-bold text-cf-text mb-1">
        Create Database & Schema
      </h1>
      <p className="relative z-10 text-sm text-cf-text-muted mb-4">
        Create the D1 database, define a schema, and apply it locally. The
        binding is auto-added to your config.
      </p>

      <div className="relative z-10 flex-1 grid grid-cols-2 gap-4 items-start">
        {/* Left: Terminal commands */}
        <div className="flex flex-col gap-3">
          <CodeBlock
            code={createD1}
            language="bash"
            filename="Terminal"
            showLineNumbers={false}
          />
          <CodeBlock
            code={applySchema}
            language="bash"
            filename="Terminal"
            showLineNumbers={false}
          />
          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3">
            <p className="text-xs text-green-700">
              <strong>Tags:</strong> We added a{" "}
              <code className="font-mono">tags</code> column so we can filter
              bookmarks by tag using SQL <code className="font-mono">LIKE</code>
              .
            </p>
          </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
            <p className="text-xs text-amber-800">
              <strong>Parameterized queries:</strong> Always use{" "}
              <code className="font-mono">.bind()</code> to prevent SQL
              injection. Never concatenate user input into SQL strings.
            </p>
          </div>
        </div>

        {/* Right: Schema + callouts */}
        <div className="flex flex-col gap-3">
          <CodeBlock
            code={schemaSQL}
            language="sql"
            filename="schema.sql"
            showLineNumbers
          />
          <CodeBlock
            code={wranglerConfig}
            language="jsonc"
            filename="wrangler.jsonc (auto-added by CLI)"
            showLineNumbers={false}
          />
        </div>
      </div>
    </SlideFrame>
  );
}
