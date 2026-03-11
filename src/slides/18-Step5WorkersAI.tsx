import { SlideFrame, PatternBackground, CodeBlock } from "../components";

const wranglerAI = `{
  "ai": {
    "binding": "AI"
  }
}`;

const aiCode = `async function generateSummary(
  title: string, url: string, env: Env
): Promise<string> {
  try {
    const response = await env.AI.run(
      "@cf/meta/llama-3.1-8b-instruct-fast",
      {
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that writes concise bookmark descriptions. Respond with exactly one sentence, no more than 20 words."
          },
          {
            role: "user",
            content: \`Write a one-sentence description for this bookmark:\\nTitle: \${title}\\nURL: \${url}\`
          }
        ],
      }
    );
    return response.response?.trim() || "";
  } catch {
    // Graceful failure: never block bookmark creation
    return "";
  }
}`;

const features = [
  {
    title: "No API keys needed",
    desc: "The AI binding is injected through wrangler.jsonc. Just call env.AI.run().",
  },
  {
    title: "70+ open-source models",
    desc: "Text generation, embeddings, image generation, speech-to-text, and more.",
  },
  {
    title: "Runs on Cloudflare GPUs",
    desc: "Low latency inference. No external services or cold starts for popular models.",
  },
  {
    title: "Use with --remote",
    desc: "Workers AI models run on Cloudflare's network: use npx wrangler dev --remote.",
  },
];

export default function Step5WorkersAISlide() {
  return (
    <SlideFrame className="flex flex-col p-8">
      <PatternBackground className="opacity-20" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-white bg-cf-orange px-3 py-1 rounded-full">
          Step 5 - Workers AI
        </span>
        <img src="/logos/cloudflare.svg" alt="Cloudflare" className="h-8" />
      </div>

      <h1 className="relative z-10 text-3xl font-bold text-cf-text mb-1">
        AI-Powered Summaries
      </h1>
      <p className="relative z-10 text-sm text-cf-text-muted mb-4">
        Automatically generate bookmark summaries when a new bookmark is
        created. One binding, one function call.
      </p>

      <div className="relative z-10 flex-1 grid grid-cols-[1.3fr_1fr] gap-5 min-h-0">
        <div className="flex flex-col gap-3 min-h-0">
          <CodeBlock
            code={wranglerAI}
            language="jsonc"
            filename="wrangler.jsonc"
            showLineNumbers={false}
          />
          <div className="overflow-y-auto min-h-0 flex-1">
            <CodeBlock
              code={aiCode}
              language="typescript"
              filename="src/index.ts"
              showLineNumbers
              wrap
            />
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-lg border border-cf-border px-4 py-3"
            >
              <p className="text-xs font-bold text-cf-text">{f.title}</p>
              <p className="text-[10px] text-cf-text-muted mt-0.5">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}
