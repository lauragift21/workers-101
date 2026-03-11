import { SlideFrame, PatternBackground, CodeBlock } from "../components";

const interfaceCode = `interface Bookmark {
  id: string;
  url: string;
  title: string;
  createdAt: string;
}

// In-memory store
const bookmarks = new Map<string, Bookmark>();`;

const routerCode = `export default {
  async fetch(request, env, ctx): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Route: GET /bookmarks
    if (path === "/bookmarks" && request.method === "GET") {
      return listBookmarks();
    }
    // Route: POST /bookmarks
    if (path === "/bookmarks" && request.method === "POST") {
      return createBookmark(request);
    }
    // Route: GET /bookmarks/:id
    const match = path.match(/^\\/bookmarks\\/([a-zA-Z0-9_-]+)$/);
    if (match && request.method === "GET") {
      return getBookmark(match[1]);
    }
    // Route: DELETE /bookmarks/:id
    if (match && request.method === "DELETE") {
      return deleteBookmark(match[1]);
    }

    if (path === "/") {
      return Response.json({
        name: "Bookmark API",
        endpoints: ["GET /bookmarks", "POST /bookmarks",
          "GET /bookmarks/:id", "DELETE /bookmarks/:id"]
      });
    }

    return Response.json({ error: "Not Found" }, { status: 404 });
  },
} satisfies ExportedHandler<Env>;`;

export default function Step2HttpHandlingSlide() {
  return (
    <SlideFrame className="flex flex-col p-8">
      <PatternBackground className="opacity-20" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-white bg-cf-orange px-3 py-1 rounded-full">
          Step 2 - HTTP Handling
        </span>
        <img src="/logos/cloudflare.svg" alt="Cloudflare" className="h-8" />
      </div>

      <h1 className="relative z-10 text-3xl font-bold text-cf-text mb-1">
        Build a REST API
      </h1>
      <p className="relative z-10 text-sm text-cf-text-muted mb-4">
        Define a data model, an in-memory store, and URL-based routing for CRUD
        operations.
      </p>

      <div className="relative z-10 flex-1 grid grid-cols-[1fr_1.3fr] gap-4 items-start">
        <div className="flex flex-col gap-3">
          <CodeBlock
            code={interfaceCode}
            language="typescript"
            filename="Data Model"
            showLineNumbers={false}
          />
          <div className="bg-white rounded-lg border border-cf-border px-4 py-3">
            <p className="text-xs font-bold text-cf-text mb-2">
              4 CRUD Endpoints
            </p>
            <div className="space-y-1.5">
              {[
                ["GET", "/bookmarks", "List all"],
                ["POST", "/bookmarks", "Create new"],
                ["GET", "/bookmarks/:id", "Get one"],
                ["DELETE", "/bookmarks/:id", "Remove"],
              ].map(([method, path, desc]) => (
                <div
                  key={`${method}-${path}`}
                  className="flex items-center gap-2"
                >
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${method === "GET" ? "bg-green-100 text-green-700" : method === "POST" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"}`}
                  >
                    {method}
                  </span>
                  <code className="text-[11px] font-mono text-cf-text">
                    {path}
                  </code>
                  <span className="text-[10px] text-cf-text-muted">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <CodeBlock
          code={routerCode}
          language="typescript"
          filename="src/index.ts"
          showLineNumbers
          maxHeight="380px"
        />
      </div>
    </SlideFrame>
  );
}
