/**
 * Speaker notes keyed by slide ID (matching the `id` field in slides/index.ts).
 * Displayed in the Presenter View window (press G to open).
 */
export const speakerNotes: Record<string, string> = {
  title: `Welcome everyone! Today we're going to build and deploy a real API on Cloudflare Workers together. This is a practical, hands-on session designed for the Customer Success team. By the end, you'll have a working API running globally on Cloudflare's network.`,

  introduction: `Quick intro about me - I'm Gift, I work as a developer advocate at Cloudflare. That's the 30-second version. Let's keep moving.`,

  "training-goals": `Here's what we'll cover in this session. The important thing is that we'll actually build all of this, not just talk about it. We start simple with a Hello World Worker and progressively add storage, a database, AI features, and then deploy to production.`,

  "what-we-are-building": `This is our roadmap. We're building a Bookmark API, and each step builds on the last. Notice the durations on the right - the whole thing is about 1.5 hours, but we'll adjust pace based on how things go. The key takeaway is that each step introduces a new Cloudflare product.`,

  "what-are-workers": `Let me explain what makes Workers different from traditional servers. The big things to call out: zero cold starts because of V8 isolates (not containers), runs in 300+ cities automatically, and you pay per request instead of paying for an always-running server. The entry point is a fetch handler instead of app.listen.`,

  "worker-anatomy": `This is the core mental model. Every Worker exports a fetch handler that takes three parameters. Request is the incoming HTTP request. Env is how you access all Cloudflare services - KV, D1, AI - no API keys needed, they're injected as bindings. Ctx gives you waitUntil for background work.`,

  prerequisites: `We need Node 20 or higher and a free Cloudflare account. If anyone doesn't have an account yet, go to dash.cloudflare.com now and sign up. It takes 30 seconds. Give me a thumbs up when you're ready.`,

  "step-1-getting-started": `Alright, first hands-on step! Three commands: log in, create the project, start the dev server. The create command scaffolds everything we need - src/index.ts, wrangler.jsonc, package.json. When you visit localhost:8787, you should see Hello World.
[Give people 3-4 minutes. Check for any issues with wrangler login.]`,

  "project-structure": `Let's look at what we got. The key files are src/index.ts where our code lives, and wrangler.jsonc which is our configuration. Notice Workers use the web standard Request/Response APIs, not Express-style req/res. This is important because it means your knowledge transfers to any platform that uses web standards.`,

  "step-2-http-handling": `Now we're building a real API. We define a Bookmark interface, use a Map for temporary storage, and build a URL-based router. No framework needed for this - just URL parsing and method checks. We'll have four endpoints: list, create, get, and delete.`,

  "crud-handlers": `Here are the handler functions. Notice the patterns: crypto.randomUUID() for IDs (built into the runtime), request.json() for body parsing, proper HTTP status codes (201 for created, 404 for not found, 400 for bad input). These are all standard web APIs.`,

  "testing-step-2": `Time to test! Use curl or your browser. Create a couple of bookmarks, list them, get one by ID, delete one. The important thing to notice is that if you restart the dev server, all data is lost. That's because we're using an in-memory Map. We fix that next.
[Give people 3-4 minutes to test.]`,

  "what-is-kv": `Workers KV is our first storage solution. It's a global key-value store - think Redis but built into the platform. The API is simple: get, put, delete, list. The key thing to understand is that it's eventually consistent - writes propagate globally within about 60 seconds. It's perfect for high-read, low-write data.`,

  "step-3-kv-setup": `Three steps to migrate: create the namespace with the CLI, add the binding to wrangler.jsonc, then swap Map operations for KV operations. The code change is straightforward - instead of bookmarks.get(id) we do env.BOOKMARKS.get(id, 'json'). Run npx wrangler types after changing wrangler.jsonc so TypeScript knows about the new binding.
[Give people 5 minutes to migrate.]`,

  "step-3-full-code": `Here's the full KV implementation. Use the copy button in the top-right of the code block to grab the whole thing and replace your src/index.ts. The key changes from Step 2: the in-memory Map is gone, every handler now takes env and uses env.BOOKMARKS for reads and writes. Test it by creating a bookmark, stopping the dev server, restarting, and listing again. The bookmark should still be there.
[Give people 2-3 minutes to paste and test.]`,

  "step-4-d1-intro": `Now we're adding a proper database. D1 is SQLite-based, so if you know SQL, you know D1. The key insight here is the comparison table - KV is great for reads but limited to key-based lookups. D1 gives us full SQL with JOINs, WHERE clauses, and filtering. We'll use both together: D1 as the source of truth, KV as a read cache.`,

  "d1-setup": `Create the database with the CLI, add the binding to wrangler.jsonc, write a schema.sql file, and apply it locally. Notice we added a tags column - this lets us do SQL filtering that would be impossible with KV alone. Always use parameterized queries with .bind() to prevent SQL injection.
[Walk through each step.]`,

  "cache-aside-pattern": `This is the most architecturally interesting part. On reads: try KV first, on miss query D1, then populate KV. On writes: write to D1, then populate KV. On deletes: delete from D1, then invalidate KV. The _cached: true field in responses lets you verify the caching is working. Test it: first request hits D1, second request returns from KV.`,

  "step-4-full-code": `Here's the complete D1 + KV implementation. Copy and replace your entire src/index.ts. The big additions from Step 3: the Bookmark interface now has tags and created_at fields, listBookmarks supports ?tag= filtering with SQL LIKE, createBookmark writes to D1 first then caches in KV, getBookmark checks KV first and falls back to D1, and deleteBookmark cleans up both. Try creating bookmarks with tags and filtering them.
[Give people 5-6 minutes to paste, test, and verify caching with the _cached field.]`,

  "step-5-workers-ai": `One binding in wrangler.jsonc, one function call. We're using Llama 3.1 8B to generate bookmark summaries automatically. The key design decision is graceful failure - if AI fails, the bookmark is still created with an empty summary. Never block core functionality on AI. Important: use npx wrangler dev --remote for this step since AI models run on Cloudflare's GPUs, not locally.
[Give people 4-5 minutes.]`,

  "step-6-ai-gateway": `This is the easiest step. Add one parameter to the AI.run call and you get caching, analytics, and rate limiting for free. Create an AI Gateway in the dashboard first, then add the gateway option. Once deployed, you'll see every AI call logged with latency, tokens, and cache hit/miss in the dashboard.
[Quick 2-3 minute exercise.]`,

  "step-7-deploy": `One command: npx wrangler deploy. But before that, apply the D1 schema to the remote database (without --local). Then set production secrets with wrangler secret put. I'm also showing how to add API key authentication for mutating endpoints. Use wrangler tail for live logs, and wrangler rollback if anything goes wrong.
[Do a live deploy if time allows - it's a great demo moment.]`,

  "platform-overview": `We used 5 products today, but there's a lot more. I want to call out R2 for file storage with zero egress fees, Durable Objects for real-time stateful coordination, and the Agents SDK for building full AI agents. These are natural next steps from what we built today.`,

  recap: `Quick recap of all 7 steps. We went from Hello World to a production API with a SQL database, caching layer, and AI-powered features, deployed globally. That's the power of the platform - everything composes together through bindings, and it all deploys with one command.`,

  "next-steps": `Four directions you can take this. Add Hono for better routing, expand storage with R2 and Queues, go real-time with Durable Objects, or build AI agents with the Agents SDK. The Workers docs and tutorials are the best place to start.`,

  "thank-you": `Thank you for spending this time with me! If you have questions after today, the Discord community and the docs are great resources. And honestly, the best way to learn is to keep building on what we started.`,
};
