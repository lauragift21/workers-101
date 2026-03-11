import type { ReactNode } from "react";
import { SlideFrame, PatternBackground, Card } from "../components";

const B = ({ children }: { children: ReactNode }) => (
  <strong className="font-bold text-cf-orange">{children}</strong>
);

const nextSteps = [
  {
    title: "Add a Framework",
    items: [
      <>
        Use <B>Hono</B> for cleaner routing, middleware, and OpenAPI support
      </>,
    ],
  },
  {
    title: "Expand Storage",
    items: [
      <>
        <B>R2</B> for file uploads (bookmark screenshots, favicons)
      </>,
      <>
        <B>Queues</B> for async background processing
      </>,
    ],
  },
  {
    title: "Go Real-Time",
    items: [
      <>
        <B>Durable Objects</B> for per-user state and WebSocket connections
      </>,
      <>
        <B>Cron Triggers</B> for scheduled bookmark health checks
      </>,
    ],
  },
  {
    title: "Build Agents",
    items: [
      <>
        <B>Agents SDK</B> for stateful AI agents with tool calling and memory
      </>,
      <>
        <B>Workflows</B> for multi-step orchestration with retries
      </>,
    ],
  },
];

export default function NextStepsSlide() {
  return (
    <SlideFrame className="flex flex-col p-8">
      <PatternBackground className="opacity-20" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-cf-orange bg-cf-orange-light px-3 py-1 rounded-full">
          What's Next
        </span>
        <img src="/logos/cloudflare.svg" alt="Cloudflare" className="h-8" />
      </div>

      <h1 className="relative z-10 text-4xl font-bold text-cf-text mb-6">
        Where to Go from Here
      </h1>

      <div className="relative z-10 grid grid-cols-2 gap-5">
        {nextSteps.map((section) => (
          <Card key={section.title} corners cornerSize="sm" className="p-5">
            <p className="text-lg font-bold text-cf-text mb-3">
              {section.title}
            </p>
            <ul className="space-y-2">
              {section.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-cf-orange text-lg leading-none mt-0.5">
                    &bull;
                  </span>
                  <span className="text-sm text-cf-text leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </SlideFrame>
  );
}
