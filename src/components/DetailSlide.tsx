import type { ReactNode } from "react";
import { SlideFrame } from "./SlideFrame";
import { PatternBackground } from "./PatternBackground";

interface DetailSlideProps {
  badge: string;
  number: number;
  title: ReactNode;
  description: ReactNode;
  bullets: string[];
}

export function DetailSlide({
  badge,
  number,
  title,
  description,
  bullets,
}: DetailSlideProps) {
  return (
    <SlideFrame className="flex flex-col p-8">
      <PatternBackground className="opacity-30" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <span className="text-sm font-medium text-cf-orange bg-cf-orange-light px-3 py-1 rounded-full">
          {badge}
        </span>
        <img src="/logos/cloudflare.svg" alt="Cloudflare" className="h-8" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-5xl">
        {/* Headline with number */}
        <div className="flex items-baseline gap-4 mb-4">
          <span className="text-5xl font-bold text-cf-orange">{number}</span>
          <h1 className="text-5xl font-bold text-cf-text">{title}</h1>
        </div>

        {/* Description - aligned with title */}
        <p className="text-2xl text-cf-text-muted mb-10 ml-[52px]">
          {description}
        </p>

        {/* Bullets - aligned with title */}
        <ul className="space-y-6 ml-[52px]">
          {bullets.map((bullet, index) => (
            <li key={index} className="flex items-start gap-4">
              <span className="text-cf-orange text-2xl leading-none mt-1">
                &bull;
              </span>
              <span className="text-xl text-cf-text leading-relaxed">
                {bullet}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </SlideFrame>
  );
}
