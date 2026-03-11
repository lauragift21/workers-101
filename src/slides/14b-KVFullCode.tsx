import { SlideFrame, PatternBackground, CodeBlock } from "../components";

const fullCode = `interface Bookmark {
  id: string;
  url: string;
  title: string;
  createdAt: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    if (path === "/bookmarks" && method === "GET") return listBookmarks(env);
    if (path === "/bookmarks" && method === "POST") return createBookmark(request, env);

    const match = path.match(/^\\/bookmarks\\/([a-zA-Z0-9_-]+)$/);
    if (match && method === "GET") return getBookmark(match[1], env);
    if (match && method === "DELETE") return deleteBookmark(match[1], env);

    if (path === "/") {
      return Response.json({
        name: "Bookmark API", version: "2.0.0", storage: "Workers KV",
      });
    }
    return Response.json({ error: "Not Found" }, { status: 404 });
  },
};

async function listBookmarks(env: Env): Promise<Response> {
  const keys = await env.BOOKMARKS.list();
  const all: Bookmark[] = [];
  for (const key of keys.keys) {
    const value = await env.BOOKMARKS.get<Bookmark>(key.name, "json");
    if (value) all.push(value);
  }
  return Response.json({ bookmarks: all, count: all.length });
}

async function createBookmark(request: Request, env: Env): Promise<Response> {
  const body = (await request.json()) as { url?: string; title?: string };
  if (!body.url || !body.title) {
    return Response.json({ error: "Missing: url, title" }, { status: 400 });
  }
  const bookmark: Bookmark = {
    id: crypto.randomUUID().slice(0, 8),
    url: body.url,
    title: body.title,
    createdAt: new Date().toISOString(),
  };
  await env.BOOKMARKS.put(bookmark.id, JSON.stringify(bookmark));
  return Response.json(bookmark, { status: 201 });
}

async function getBookmark(id: string, env: Env): Promise<Response> {
  const bookmark = await env.BOOKMARKS.get<Bookmark>(id, "json");
  if (!bookmark) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(bookmark);
}

async function deleteBookmark(id: string, env: Env): Promise<Response> {
  const existing = await env.BOOKMARKS.get(id);
  if (!existing) return Response.json({ error: "Not found" }, { status: 404 });
  await env.BOOKMARKS.delete(id);
  return Response.json({ message: "Bookmark deleted" });
}`;

export default function KVFullCodeSlide() {
  return (
    <SlideFrame className="flex flex-col p-8">
      <PatternBackground className="opacity-20" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-white bg-cf-orange px-3 py-1 rounded-full">
          Step 3 - Full Code
        </span>
        <img src="/logos/cloudflare.svg" alt="Cloudflare" className="h-8" />
      </div>

      <h1 className="relative z-10 text-3xl font-bold text-cf-text mb-1">
        Complete KV Implementation
      </h1>
      <p className="relative z-10 text-sm text-cf-text-muted mb-3">
        Replace the entire contents of{" "}
        <code className="font-mono">src/index.ts</code> with this. Copy the full
        code using the button in the top-right corner.
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
