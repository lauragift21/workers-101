import { SlideFrame, PatternBackground, CodeBlock } from "../components";

const loginCmd = `npx wrangler login`;

const scaffoldCmd = `npm create cloudflare@latest -- bookmark-api --type hello-world --ts`;

const runCmd = `cd bookmark-api
npm run dev`;

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

export default function Step1GettingStartedSlide() {
  return (
    <SlideFrame className="flex flex-col p-8">
      <PatternBackground className="opacity-20" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-white bg-cf-orange px-3 py-1 rounded-full">
          Step 1 - Getting Started
        </span>
        <img src="/logos/cloudflare.svg" alt="Cloudflare" className="h-8" />
      </div>

      <h1 className="relative z-10 text-3xl font-bold text-cf-text mb-1">
        Scaffold Your Worker
      </h1>
      <p className="relative z-10 text-sm text-cf-text-muted mb-4">
        Authenticate with Cloudflare, create the project, and verify it runs
        locally.
      </p>

      <div className="relative z-10 flex-1 flex flex-col gap-3">
        <StepLabel num={1} text="Authenticate with Cloudflare" />
        <CodeBlock
          code={loginCmd}
          language="bash"
          filename="Terminal"
          showLineNumbers={false}
        />

        <StepLabel num={2} text="Create the project" />
        <CodeBlock
          code={scaffoldCmd}
          language="bash"
          filename="Terminal"
          showLineNumbers={false}
        />

        <StepLabel num={3} text="Start the dev server" />
        <CodeBlock
          code={runCmd}
          language="bash"
          filename="Terminal"
          showLineNumbers={false}
        />

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
            Visit{" "}
            <span className="font-mono font-bold">http://localhost:8787</span> -
            you should see "Hello World!"
          </p>
        </div>
      </div>
    </SlideFrame>
  );
}
