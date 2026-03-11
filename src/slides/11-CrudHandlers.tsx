import { SlideFrame, PatternBackground, CodeBlock } from "../components";

const handlersCode = `function listBookmarks(): Response {
  const all = Array.from(bookmarks.values());
  return Response.json({ bookmarks: all, count: all.length });
}

async function createBookmark(request: Request): Promise<Response> {
  let body: { url?: string; title?: string };

  try {
    body = await request.json() as { url?: string; title?: string };
  } catch {
    return Response.json(
      { error: "Invalid JSON in request body" },
      { status: 400 }
    );
  }

  if (!body.url || !body.title) {
    return Response.json(
      { error: "Missing required fields: url, title" },
      { status: 400 }
    );
  }

  const id = crypto.randomUUID().slice(0, 8);
  const bookmark: Bookmark = {
    id,
    url: body.url,
    title: body.title,
    createdAt: new Date().toISOString(),
  };

  bookmarks.set(id, bookmark);
  return Response.json(bookmark, { status: 201 });
}

function getBookmark(id: string): Response {
  const bookmark = bookmarks.get(id);
  if (!bookmark) {
    return Response.json({ error: "Bookmark not found" }, { status: 404 });
  }
  return Response.json(bookmark);
}

function deleteBookmark(id: string): Response {
  if (!bookmarks.has(id)) {
    return Response.json({ error: "Bookmark not found" }, { status: 404 });
  }
  bookmarks.delete(id);
  return Response.json({ message: "Bookmark deleted" });
}`;

export default function CrudHandlersSlide() {
  return (
    <SlideFrame className="flex flex-col p-8">
      <PatternBackground className="opacity-20" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-cf-orange bg-cf-orange-light px-3 py-1 rounded-full">
          Step 2
        </span>
        <img src="/logos/cloudflare.svg" alt="Cloudflare" className="h-8" />
      </div>

      <h1 className="relative z-10 text-3xl font-bold text-cf-text mb-1">
        CRUD Handler Functions
      </h1>
      <p className="relative z-10 text-sm text-cf-text-muted mb-4">
        Each handler parses the request, validates input, and returns proper
        status codes. Uses{" "}
        <code className="font-mono">crypto.randomUUID()</code> for IDs.
      </p>

      <div className="relative z-10 flex-1">
        <CodeBlock
          code={handlersCode}
          language="typescript"
          filename="src/index.ts"
          showLineNumbers
          maxHeight="400px"
        />
      </div>
    </SlideFrame>
  );
}
