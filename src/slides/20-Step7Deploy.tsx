import { SlideFrame, PatternBackground, CodeBlock } from "../components";

const deploySteps = `# 1. Apply D1 schema to production
npx wrangler d1 execute bookmark-db \\
  --remote --file=schema.sql

# 2. Apply AI summary migration
npx wrangler d1 execute bookmark-db \\
  --remote --file=migration-summary.sql

# 3. Deploy the Worker
npx wrangler deploy`;

const opsCommands = `# Stream live logs from production
npx wrangler tail

# List recent deployments
npx wrangler deployments list

# Roll back to a previous version
npx wrangler rollback`;

export default function Step7DeploySlide() {
  return (
    <SlideFrame className="flex flex-col p-8">
      <PatternBackground className="opacity-20" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-white bg-cf-orange px-3 py-1 rounded-full">
          Step 7 - Deploy
        </span>
        <img src="/logos/cloudflare.svg" alt="Cloudflare" className="h-8" />
      </div>

      <h1 className="relative z-10 text-3xl font-bold text-cf-text mb-1">
        Deploy to Production
      </h1>
      <p className="relative z-10 text-sm text-cf-text-muted mb-4">
        Ship your API globally and monitor with live logs.
      </p>

      <div className="relative z-10 flex-1 grid grid-cols-2 gap-4 items-start">
        <div className="flex flex-col gap-3">
          <CodeBlock
            code={deploySteps}
            language="bash"
            filename="Terminal"
            showLineNumbers={false}
          />
        </div>

        <div className="flex flex-col gap-3">
          <CodeBlock
            code={opsCommands}
            language="bash"
            filename="Operations"
            showLineNumbers={false}
          />
          <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3">
            <p className="text-xs text-green-700">
              <strong>That's it.</strong> Your API is now live on Cloudflare's
              network in 300+ cities. One command to deploy, one command to roll
              back.
            </p>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
