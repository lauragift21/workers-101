import { SlideFrame, PatternBackground, CodeBlock } from "../components";

const fullCode = `interface Bookmark {
  id: string;
  url: string;
  title: string;
  tags: string;
  created_at: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    if (path === "/bookmarks" && method === "GET") return listBookmarks(env, url);
    if (path === "/bookmarks" && method === "POST") return createBookmark(request, env);

    const match = path.match(/^\\/bookmarks\\/([a-zA-Z0-9_-]+)$/);
    if (match && method === "GET") return getBookmark(match[1], env);
    if (match && method === "DELETE") return deleteBookmark(match[1], env);

    if (path === "/") {
      return Response.json({
        name: "Bookmark API", version: "3.0.0", storage: "D1 + KV cache",
      });
    }
    return Response.json({ error: "Not Found" }, { status: 404 });
  },
};

async function listBookmarks(env: Env, url: URL): Promise<Response> {
  const tag = url.searchParams.get("tag");
  let results: Bookmark[];

  if (tag) {
    const { results: rows } = await env.DB.prepare(
      "SELECT * FROM bookmarks WHERE tags LIKE ? ORDER BY created_at DESC"
    ).bind(\`%\${tag}%\`).all<Bookmark>();
    results = rows;
  } else {
    const { results: rows } = await env.DB.prepare(
      "SELECT * FROM bookmarks ORDER BY created_at DESC"
    ).all<Bookmark>();
    results = rows;
  }
  return Response.json({ bookmarks: results, count: results.length });
}

async function createBookmark(request: Request, env: Env): Promise<Response> {
  const body = (await request.json()) as {
    url?: string; title?: string; tags?: string;
  };
  if (!body.url || !body.title) {
    return Response.json({ error: "Missing: url, title" }, { status: 400 });
  }
  const id = crypto.randomUUID().slice(0, 8);
  const result = await env.DB.prepare(
    \`INSERT INTO bookmarks (id, url, title, tags)
     VALUES (?, ?, ?, ?) RETURNING *\`
  ).bind(id, body.url, body.title, body.tags || "").first<Bookmark>();

  if (!result) {
    return Response.json({ error: "Failed to create" }, { status: 500 });
  }
  await env.BOOKMARKS.put(id, JSON.stringify(result), { expirationTtl: 3600 });
  return Response.json(result, { status: 201 });
}

async function getBookmark(id: string, env: Env): Promise<Response> {
  const cached = await env.BOOKMARKS.get<Bookmark>(id, "json");
  if (cached) return Response.json({ ...cached, _cached: true });

  const bookmark = await env.DB.prepare(
    "SELECT * FROM bookmarks WHERE id = ?"
  ).bind(id).first<Bookmark>();
  if (!bookmark) return Response.json({ error: "Not found" }, { status: 404 });

  await env.BOOKMARKS.put(id, JSON.stringify(bookmark), { expirationTtl: 3600 });
  return Response.json(bookmark);
}

async function deleteBookmark(id: string, env: Env): Promise<Response> {
  const existing = await env.DB.prepare(
    "SELECT id FROM bookmarks WHERE id = ?"
  ).bind(id).first();
  if (!existing) return Response.json({ error: "Not found" }, { status: 404 });

  await env.DB.prepare("DELETE FROM bookmarks WHERE id = ?").bind(id).run();
  await env.BOOKMARKS.delete(id);
  return Response.json({ message: "Bookmark deleted" });
}`;

export default function D1FullCodeSlide() {
  return (
    <SlideFrame className="flex flex-col p-8">
      <PatternBackground className="opacity-20" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-white bg-cf-orange px-3 py-1 rounded-full">
          Step 4 - Full Code
        </span>
        <img src="/logos/cloudflare.svg" alt="Cloudflare" className="h-8" />
      </div>

      <h1 className="relative z-10 text-3xl font-bold text-cf-text mb-1">
        Complete D1 + KV Cache Implementation
      </h1>
      <p className="relative z-10 text-sm text-cf-text-muted mb-3">
        Replace the entire contents of{" "}
        <code className="font-mono">src/index.ts</code> with this. D1 as source
        of truth, KV as read cache, tag filtering via SQL.
      </p>

      <div className="relative z-10 flex-1">
        <CodeBlock
          code={fullCode}
          language="typescript"
          filename="src/index.ts"
          showLineNumbers
          maxHeight="430px"
        />
      </div>
    </SlideFrame>
  );
}
