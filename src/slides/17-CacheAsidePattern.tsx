import { SlideFrame, PatternBackground, CodeBlock } from "../components";

const cacheReadCode = `async function getBookmark(
  id: string, env: Env
): Promise<Response> {
  // 1. Try KV cache first
  const cached = await env.BOOKMARKS.get(id, "json");
  if (cached) {
    return Response.json({
      ...cached, _cached: true
    });
  }

  // 2. Cache miss - query D1
  const row = await env.DB.prepare(
    "SELECT * FROM bookmarks WHERE id = ?"
  ).bind(id).first();

  if (!row) {
    return Response.json(
      { error: "Not found" }, { status: 404 }
    );
  }

  // 3. Populate cache for next time
  await env.BOOKMARKS.put(
    id, JSON.stringify(row), { expirationTtl: 3600 }
  );
  return Response.json(row);
}`;

const cacheWriteCode = `async function createBookmark(
  request: Request, env: Env
): Promise<Response> {
  const body = await request.json() as {
    url?: string; title?: string; tags?: string
  };

  const id = crypto.randomUUID();
  // Write to D1 (source of truth)
  const result = await env.DB.prepare(
    \`INSERT INTO bookmarks (id, url, title, tags)
     VALUES (?, ?, ?, ?)
     RETURNING *\`
  ).bind(id, body.url, body.title, body.tags || "")
   .first();

  // Write-through: also populate KV
  await env.BOOKMARKS.put(
    id, JSON.stringify(result), { expirationTtl: 3600 }
  );
  return Response.json(result, { status: 201 });
}`;

export default function CacheAsidePatternSlide() {
  return (
    <SlideFrame className="flex flex-col p-8">
      <PatternBackground className="opacity-20" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-cf-orange bg-cf-orange-light px-3 py-1 rounded-full">
          Step 4
        </span>
        <img src="/logos/cloudflare.svg" alt="Cloudflare" className="h-8" />
      </div>

      <h1 className="relative z-10 text-3xl font-bold text-cf-text mb-1">
        Cache-Aside in Action
      </h1>
      <p className="relative z-10 text-sm text-cf-text-muted mb-4">
        Read: KV first, D1 on miss. Write: D1 first, then populate KV. Delete:
        D1 first, then invalidate KV.
      </p>

      <div className="relative z-10 flex-1 grid grid-cols-2 gap-4 items-start">
        <CodeBlock
          code={cacheReadCode}
          language="typescript"
          filename="Read (cache-aside)"
          showLineNumbers
          maxHeight="450px"
        />
        <CodeBlock
          code={cacheWriteCode}
          language="typescript"
          filename="Write (write-through)"
          showLineNumbers
          maxHeight="450px"
        />
      </div>
    </SlideFrame>
  );
}
