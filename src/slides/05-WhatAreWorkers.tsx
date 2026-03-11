import { SlideFrame, PatternBackground, Card } from "../components";

const comparisons = [
  {
    feature: "Runtime",
    traditional: "Node.js / Container",
    workers: "V8 Isolates (same engine as Chrome)",
  },
  {
    feature: "Cold Start",
    traditional: "100ms - seconds",
    workers: "0ms (no cold starts)",
  },
  {
    feature: "Location",
    traditional: "Single region",
    workers: "300+ cities globally",
  },
  {
    feature: "Scaling",
    traditional: "Manual / Auto-scaling groups",
    workers: "Automatic, per-request",
  },
  {
    feature: "Pricing",
    traditional: "Always running",
    workers: "Pay per request",
  },
  {
    feature: "Entry Point",
    traditional: "app.listen(3000)",
    workers: "export default { fetch() }",
  },
];

export default function WhatAreWorkersSlide() {
  return (
    <SlideFrame className="flex flex-col p-8">
      <PatternBackground className="opacity-20" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-cf-orange bg-cf-orange-light px-3 py-1 rounded-full">
          Core Concepts
        </span>
        <img src="/logos/cloudflare.svg" alt="Cloudflare" className="h-8" />
      </div>

      <h1 className="relative z-10 text-3xl font-bold text-cf-text mb-1">
        What Are Cloudflare Workers?
      </h1>
      <p className="relative z-10 text-sm text-cf-text-muted mb-5">
        Serverless JavaScript/TypeScript functions that run at the edge, on
        Cloudflare's global network. No servers to manage, no regions to choose.
      </p>

      <div className="relative z-10 flex-1">
        <Card corners cornerSize="sm" className="p-5">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cf-border">
                <th className="text-left text-sm font-bold text-cf-text pb-3 w-[140px]">
                  Feature
                </th>
                <th className="text-left text-sm font-bold text-cf-text-muted pb-3">
                  Traditional Server
                </th>
                <th className="text-left text-sm font-bold text-cf-orange pb-3">
                  Cloudflare Workers
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row) => (
                <tr key={row.feature} className="border-b border-cf-border/50">
                  <td className="py-2.5 text-sm font-medium text-cf-text">
                    {row.feature}
                  </td>
                  <td className="py-2.5 text-sm text-cf-text-muted">
                    {row.traditional}
                  </td>
                  <td className="py-2.5 text-sm text-cf-text font-medium">
                    {row.workers}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </SlideFrame>
  );
}
