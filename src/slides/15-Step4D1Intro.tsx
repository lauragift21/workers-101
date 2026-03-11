import { SlideFrame, PatternBackground, Card } from "../components";

const comparisons = [
  {
    aspect: "Role",
    kv: "Read cache",
    d1: "Source of truth",
  },
  {
    aspect: "Data Model",
    kv: "Key-value pairs",
    d1: "SQL tables with relations",
  },
  {
    aspect: "Consistency",
    kv: "Eventually consistent",
    d1: "Strong consistency",
  },
  {
    aspect: "Query Power",
    kv: "Get by key only",
    d1: "Full SQL (JOIN, WHERE, etc.)",
  },
  {
    aspect: "Best For",
    kv: "Hot reads, caching",
    d1: "Complex queries, structured data",
  },
];

export default function Step4D1IntroSlide() {
  return (
    <SlideFrame className="flex flex-col p-8">
      <PatternBackground className="opacity-20" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-cf-orange bg-cf-orange-light px-3 py-1 rounded-full">
          Step 4 - D1 Database
        </span>
        <img src="/logos/cloudflare.svg" alt="Cloudflare" className="h-8" />
      </div>

      <h1 className="relative z-10 text-3xl font-bold text-cf-text mb-1">
        D1: SQL at the Edge
      </h1>
      <p className="relative z-10 text-sm text-cf-text-muted mb-5">
        D1 is Cloudflare's serverless SQL database (SQLite-based). We'll use it
        as the source of truth with KV as a read cache - the cache-aside
        pattern.
      </p>

      <div className="relative z-10 flex-1 flex flex-col gap-5">
        <Card corners cornerSize="sm" className="p-5">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cf-border">
                <th className="text-left text-sm font-bold text-cf-text pb-3 w-[140px]">
                  Aspect
                </th>
                <th className="text-left text-sm font-bold text-cf-text pb-3">
                  Workers KV
                </th>
                <th className="text-left text-sm font-bold text-cf-orange pb-3">
                  D1 Database
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row) => (
                <tr key={row.aspect} className="border-b border-cf-border/50">
                  <td className="py-2.5 text-sm font-medium text-cf-text">
                    {row.aspect}
                  </td>
                  <td className="py-2.5 text-sm text-cf-text-muted">
                    {row.kv}
                  </td>
                  <td className="py-2.5 text-sm text-cf-text font-medium">
                    {row.d1}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
          <p className="text-xs text-blue-800">
            <strong>Cache-Aside Pattern:</strong> Read from KV first. On cache
            miss, query D1 and populate KV. On write, write to D1 and invalidate
            KV. This gives you both speed (KV) and correctness (D1).
          </p>
        </div>
      </div>
    </SlideFrame>
  );
}
