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

const valueProps = [
  {
    title: "Familiar SQL at the Edge",
    desc: "Build applications with the power and familiarity of a relational, SQL-based database that lives on the edge. Leverage your existing SQL knowledge without learning a new query language.",
  },
  {
    title: "Native Workers Integration",
    desc: "Query your database with near-zero latency directly from your serverless functions. D1 is built to be the stateful backend for the Workers ecosystem.",
  },
  {
    title: "Global Read Replication",
    desc: "Automatically create read-only copies of your database across Cloudflare's global network. Serve data from a location near your users for incredibly fast read performance.",
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
      <p className="relative z-10 text-sm text-cf-text-muted mb-4">
        D1 is built into the Workers platform with out-of-the-box integration.
        SQLite offers a familiar, relational database with SQL querying.
      </p>

      <div className="relative z-10 flex-1 grid grid-cols-2 gap-4">
        {/* Left: KV vs D1 comparison */}
        <div className="flex flex-col gap-3">
          <p className="text-sm font-bold text-cf-text mb-1">
            Where D1 Fits
          </p>
          <Card corners cornerSize="sm" className="p-4 flex-1">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cf-border">
                  <th className="text-left text-[11px] font-bold text-cf-text pb-2.5 w-[100px]">
                    Aspect
                  </th>
                  <th className="text-left text-[11px] font-bold text-cf-text pb-2.5">
                    Workers KV
                  </th>
                  <th className="text-left text-[11px] font-bold text-cf-orange pb-2.5">
                    D1 Database
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row) => (
                  <tr key={row.aspect} className="border-b border-cf-border/50">
                    <td className="py-2 text-[11px] font-medium text-cf-text">
                      {row.aspect}
                    </td>
                    <td className="py-2 text-[11px] text-cf-text-muted">
                      {row.kv}
                    </td>
                    <td className="py-2 text-[11px] text-cf-text">
                      {row.d1}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2.5">
            <p className="text-xs text-blue-800">
              <strong>Cache-Aside Pattern:</strong> Read from KV first. On
              cache miss, query D1 and populate KV. On write, write to D1 and
              invalidate KV.
            </p>
          </div>
        </div>

        {/* Right: value props */}
        <div className="flex flex-col gap-2">
          <p className="text-sm font-bold text-cf-text mb-1">
            Why D1?
          </p>
          {valueProps.map((vp) => (
            <div
              key={vp.title}
              className="bg-white rounded-lg border border-cf-border px-4 py-2.5 flex-1"
            >
              <p className="text-md font-bold text-cf-text">{vp.title}</p>
              <p className="text-[12px] text-cf-text-muted mt-0.5 leading-relaxed">
                {vp.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}
