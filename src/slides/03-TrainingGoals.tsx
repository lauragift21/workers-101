import type { ReactNode } from "react";
import { SlideFrame, PatternBackground, Card } from "../components";

const B = ({ children }: { children: ReactNode }) => (
  <strong className="font-bold text-cf-orange">{children}</strong>
);

const learnings = [
  <>
    Understand the <B>Workers runtime</B> and how it differs from Node.js
  </>,
  <>
    Build a complete <B>REST API</B> with CRUD endpoints
  </>,
  <>
    Persist data with <B>Workers KV</B> (key-value storage)
  </>,
  <>
    Use <B>D1</B> as a relational database with KV caching
  </>,
  <>
    Add AI features with <B>Workers AI</B> and <B>AI Gateway</B>
  </>,
  <>
    <B>Deploy</B> to production across 300+ global data centers
  </>,
];

export default function TrainingGoalsSlide() {
  return (
    <SlideFrame className="flex flex-col p-8">
      <PatternBackground className="opacity-20" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-cf-orange bg-cf-orange-light px-3 py-1 rounded-full">
          Training Goals
        </span>
        <img src="/logos/cloudflare.svg" alt="Cloudflare" className="h-8" />
      </div>

      {/* Title */}
      <h1 className="relative z-10 text-4xl font-bold text-cf-text mb-6">
        What We Will Cover
      </h1>

      {/* Bullet list */}
      <div className="relative z-10">
        <Card corners cornerSize="sm" className="p-8">
          <ul className="space-y-5">
            {learnings.map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="text-cf-orange text-2xl leading-none mt-1 flex-shrink-0">
                  &bull;
                </span>
                <span className="text-2xl text-cf-text leading-snug">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </SlideFrame>
  );
}
