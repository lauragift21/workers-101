import { SlideFrame, PatternBackground, Card } from "../components";

const kvOperations = [
  {
    method: "env.BOOKMARKS.get(key, 'json')",
    desc: "Read a value by key (returns parsed object or null)",
  },
  {
    method: "env.BOOKMARKS.put(key, value)",
    desc: "Write a key-value pair (string or stream)",
  },
  {
    method: "env.BOOKMARKS.delete(key)",
    desc: "Remove a key-value pair",
  },
  {
    method: "env.BOOKMARKS.list()",
    desc: "List all keys (with optional prefix filter)",
  },
];

const characteristics = [
  { label: "Consistency", value: "Eventually consistent (up to 60s)" },
  { label: "Locations", value: "Replicated to 300+ data centers" },
  { label: "Max Value", value: "25 MB per value" },
  { label: "Best For", value: "High-read, low-write data (config, cache)" },
];

export default function WhatIsKVSlide() {
  return (
    <SlideFrame className="flex flex-col p-8">
      <PatternBackground className="opacity-20" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-cf-orange bg-cf-orange-light px-3 py-1 rounded-full">
          Step 3 - Workers KV
        </span>
        <img src="/logos/cloudflare.svg" alt="Cloudflare" className="h-8" />
      </div>

      <h1 className="relative z-10 text-3xl font-bold text-cf-text mb-1">
        What Is Workers KV?
      </h1>
      <p className="relative z-10 text-sm text-cf-text-muted mb-5">
        A global, low-latency key-value store. Think of it as a distributed
        cache built into the Workers platform.
      </p>

      <div className="relative z-10 flex-1 grid grid-cols-2 gap-5 items-start">
        {/* Left: API */}
        <div className="flex flex-col gap-2">
          <p className="text-sm font-bold text-cf-text mb-1">KV API</p>
          {kvOperations.map((op) => (
            <div
              key={op.method}
              className="bg-white rounded-lg border border-cf-border px-4 py-2.5"
            >
              <code className="text-sm font-bold text-cf-orange font-mono">
                {op.method}
              </code>
              <p className="text-[11px] text-cf-text-muted mt-0.5">{op.desc}</p>
            </div>
          ))}
        </div>

        {/* Right: Characteristics */}
        <div className="flex flex-col gap-3">
          <p className="text-sm font-bold text-cf-text mb-1">
            Key Characteristics
          </p>
          <Card corners cornerSize="sm" className="p-5">
            <div className="space-y-4">
              {characteristics.map((c) => (
                <div key={c.label}>
                  <p className="text-xs font-bold text-cf-text">{c.label}</p>
                  <p className="text-sm text-cf-text-muted">{c.value}</p>
                </div>
              ))}
            </div>
          </Card>

          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
            <p className="text-xs text-amber-800">
              <strong>Bindings</strong> connect external resources to your
              Worker through the <code className="font-mono">env</code> object.
              No API keys or connection strings needed.
            </p>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
