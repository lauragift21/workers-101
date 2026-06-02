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

const valueProps = [
  {
    title: "Global Low-Latency Reads",
    desc: "Serve data worldwide with <5ms hot read latencies on the Cloudflare edge network.",
  },
  {
    title: "Infinite Scale, Simple API",
    desc: "One API to store and retrieve key-value pairs — unlimited storage, high scalability, no infra to manage.",
  },
  {
    title: "More Than a Cache",
    desc: "Unlike a volatile cache, KV stores data persistently with exceptional availability and durability.",
  },
];

const characteristics = [
  { label: "Consistency", value: "Eventually consistent (up to 60s)" },
  { label: "Locations", value: "Replicated to 300+ data centers" },
  { label: "Max Key", value: "512 bytes per key" },
  { label: "Max Value", value: "25 MiB per value" },
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
        What is Workers KV?
      </h1>
      <p className="relative z-10 text-sm text-cf-text-muted mb-4">
        An eventually consistent, high-performance key-value database built for
        Workers. Ideal for read-heavy, low-latency edge decisions and
        configuration.
      </p>

      <div className="relative z-10 flex-1 grid grid-cols-2 gap-4 items-start">
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

          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mt-1">
            <p className="text-xs text-amber-800">
              <strong>Bindings</strong> connect KV to your Worker through the{" "}
              <code className="font-mono">env</code> object. No API keys or
              connection strings needed.
            </p>
          </div>
        </div>

        {/* Right: value props + characteristics */}
        <div className="flex flex-col gap-3">
          <p className="text-sm font-bold text-cf-text mb-1">
            Key Advantages
          </p>
          <div className="space-y-2">
            {valueProps.map((vp) => (
              <div
                key={vp.title}
                className="bg-white rounded-lg border border-cf-border px-4 py-3"
              >
                <p className="text-xs font-bold text-cf-text">{vp.title}</p>
                <p className="text-[11px] text-cf-text-muted mt-0.5">{vp.desc}</p>
              </div>
            ))}
          </div>

          <Card corners cornerSize="sm" className="p-4 mt-1">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {characteristics.map((c) => (
                <div key={c.label}>
                  <p className="text-[10px] font-bold text-cf-text">{c.label}</p>
                  <p className="text-[11px] text-cf-text-muted">{c.value}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </SlideFrame>
  );
}
