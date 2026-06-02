/**
 * Speaker notes keyed by slide ID (matching the `id` field in slides/index.ts).
 * Displayed in the Presenter View window (press G to open).
 */
export const speakerNotes: Record<string, string> = {
  title: `Hey everyone! So today we're going to build something together -- an actual API on Workers, from scratch. This is hands-on, so you'll be writing code alongside me the whole time. By the end you'll have a working API deployed to production.

[🎤 ENGAGEMENT] Before we dive in, quick pulse check: drop a 👍 in chat if you've used Cloudflare Workers before, and a 🆕 if this is your first time. I'd love to know where everyone's at so I can calibrate.`,

  "training-goals": `So here's the plan. We're starting from zero -- literally a Hello World -- and we're going to layer things on step by step. Storage, database, AI, deployment. The whole thing. Each step builds on the previous one, so you'll see how the products connect. That's really the point of this -- by building it yourself, you'll understand the full journey of creating an API on Workers.`,

  "what-we-are-building": `Okay, so this is our roadmap. We're building a Bookmark API -- think of it as a simple service where you can save, retrieve, and manage bookmarks. Each step here introduces a new Cloudflare product. The timings on the right add up to about 2 hours of hands-on coding, and we'll have a short break in the middle plus buffer time for questions and troubleshooting. If something takes longer, that's fine -- we have the full 3 hours. I have all the resources for you to reference after.`,

  "what-are-workers": `Alright, before we start coding, let's make sure we're all on the same page about what Workers actually are. Workers use V8 isolates instead of containers, which is why there's basically zero cold start -- a huge differentiator compared to Lambda. They run in over 300 cities automatically, no region selection needed. And the pricing is per-request, not per-server-hour. The entry point is a fetch handler instead of something like app.listen. That's the mental shift.

[🎤 ENGAGEMENT] By show of hands or in chat: who's coming from a traditional server background -- Node.js, Express, maybe deployed on EC2 or a VPS? And who's already done serverless -- Lambda, Vercel, Netlify Functions? Just want to see the room split.`,

  "workers-runtime": `This is the mental model shift. When you write a Worker, you're not in a Node.js environment. There's no filesystem, no process object, no require(). What you get instead is the same Web APIs that run in the browser — fetch, crypto, URL, Headers — plus the env bindings for Cloudflare services. Most importantly: every request runs in a fresh V8 isolate. That means no global variables survive between requests, and there's no server to keep warm. This is why cold starts are basically zero, but it also means you can't rely on module-level state for request data. You'll see this pattern play out when we start building.
[About 3-4 minutes.]`,

  "isolates-visual": `Here's the visual difference. On the left, you've got a traditional container: it's a full OS with your runtime and your app bundled together. When a request comes in, the whole thing has to spin up — that's your cold start. And it's sitting in one region, so users far away get high latency. On the right, Workers use V8 isolates. These are just JavaScript execution contexts — no OS, no runtime overhead. They can spin up instantly, and because they're tiny, Cloudflare can pre-position them across the entire network. That's the zero cold start and the global distribution. The same V8 engine that powers Chrome, running your code at the edge.
[About 2-3 minutes.]`,

  "worker-anatomy": `This is the part I really want you to internalize. Every Worker has this same shape -- it exports a fetch handler with three parameters. Request is just the incoming HTTP request, nothing surprising there. Env is the interesting one -- that's how you access everything on the platform. KV, D1, AI, all of it. It's all just... there, injected through bindings. And then ctx gives you things like waitUntil for doing background work after you've already sent a response.`,

  prerequisites: `Quick checkpoint before we dive in. You'll need Node 20 or higher -- if you're not sure, run node --version in your terminal. You should all have Cloudflare accounts already, but if for some reason you don't, go to dash.cloudflare.com and get one set up real quick.

[🎤 ENGAGEMENT] Type "ready" in chat when you've got Node 20+ and you're logged into Cloudflare. I'll wait until we see a wave of readys before we move on. If anyone's stuck, now's the time to flag it.`,

  "step-1-getting-started": `Alright, here we go -- first hands-on step. Three commands and you'll have a running Worker. First, wrangler login to authenticate. Then create the project, and start the dev server. The create command gives you everything you need out of the box. Once it's running, hit localhost:8787 and you should see Hello World in the browser.

[🎤 ENGAGEMENT] Go ahead and run those three commands now. I'll give you about 4 minutes. As you go, drop a 🎉 in chat the first time you see "Hello World!" in your browser -- I want to celebrate those first wins with you. If you get stuck on wrangler login, that's the most common hitch, so flag it early.`,

  "project-structure": `Let's look at what got generated. Two files matter right now: src/index.ts where our code lives, and wrangler.jsonc which is the config for our Worker.`,

  "step-2-http-handling": `Now we're going to turn our Hello World into an actual API. We'll define a Bookmark type, use a plain JavaScript Map for storage for now -- just to keep things simple -- and set up routing based on the URL and HTTP method. We're building four endpoints: list all bookmarks, create one, get one by ID, and delete one.`,

  "crud-handlers": `Here are the actual handler functions. A few things to notice -- we're using crypto.randomUUID() to generate IDs, which is built right into the Workers runtime. For reading the request body, it's just request.json(). And we're being good citizens with our status codes: 201 when something's created, 404 when it's not found, 400 for bad input. All of this is standard web platform stuff, nothing Cloudflare-specific.`,

  "testing-step-2": `Okay, let's actually test this thing. Use curl or whatever HTTP client you like. Create a couple of bookmarks, list them, try getting one by ID, delete one. Play around with it.

[🎤 ENGAGEMENT] Here's a fun test: create a bookmark, then restart your dev server. List your bookmarks again -- what happened? Drop 😭 in chat if your data disappeared. That's exactly why Step 3 exists. We need real persistence, not just memory.`,

  "what-is-kv": `So our first real storage solution is Workers KV. Think of it like a global key-value store -- the mental model is Redis but built into the platform. The API is dead simple: get, put, delete, list. That's basically it. One important thing to know -- KV is eventually consistent. Writes take up to about 60 seconds to propagate everywhere. So it's ideal for high-read, low-write workloads.

[🎤 ENGAGEMENT] Quick poll in chat: who in here has used Redis or Memcached before? KV is conceptually very similar -- you just don't have to run the server. And who has been bitten by eventual consistency in production? A few war stories are welcome!`,

  "step-3-kv-setup": `Migrating to KV is two steps. Create the namespace using the CLI -- which automatically adds the binding to wrangler.jsonc for you -- and then swap out the Map operations for KV calls in your code. The code changes are pretty minimal -- where we had bookmarks.get(id), it becomes env.BOOKMARKS.get(id, 'json'). Oh, and one thing -- after the CLI updates wrangler.jsonc, run npx wrangler types so TypeScript picks up the new binding. Otherwise you'll get red squiggles everywhere.

[🎤 ENGAGEMENT] I'll give you 5 minutes for the migration. While you're working, a quick question for chat: what's the most annoying part of setting up a database for a new project? Is it provisioning, connection strings, migrations, or something else? I'm curious what pain points you hit in your day-to-day.`,

  "step-3-full-code": `Here's the full code for the KV version. There's a copy button up in the top-right corner -- just grab the whole thing and replace your src/index.ts. The big difference from before: the in-memory Map is completely gone. Every handler now goes through env.BOOKMARKS. Here's how you can verify it's working -- create a bookmark, stop the dev server, start it back up, and list your bookmarks. They should still be there. That's persistence.
[Give people 2-3 minutes to paste and test.]`,

  "testing-step-3": `Alright, time to prove KV actually works. Create a bookmark, then do the real test -- stop your dev server with Ctrl+C, start it back up with npx wrangler dev, and list your bookmarks again. They should still be there. That's the whole point of this step -- unlike the in-memory version, KV persists data. If your data survived the restart, you're good to move on.
[Give people 2-3 minutes to test.]`,

  "step-4-d1-intro": `Now things get interesting. We're adding a proper database. D1 is our SQL database, built on SQLite, so anyone who knows SQL can use it right away. Look at the comparison here -- KV is great for fast reads, but you can only look things up by key. D1 gives you full SQL. JOINs, WHERE clauses, filtering, all of it. So what we're going to do is use both together: D1 as our source of truth and KV as a fast read cache in front of it. This is actually a really common architectural pattern.

[🎤 ENGAGEMENT] Pop quiz in chat: what's the most SQL you've written in the last 6 months? One word answers -- "tons", "some", "zero", or "avoid". No judgment either way! I just want to know how much SQLite nostalgia we're channeling here.`,

  "d1-setup": `Same pattern as before -- create the database from the CLI, which auto-adds the binding to wrangler.jsonc, write a schema file, and apply it. Notice we've added tags and summary columns to our schema. Tags let us filter bookmarks by tag. Summary will be populated by AI in Step 5, but adding the column now means we don't need a separate migration later. And please, always use parameterized queries with .bind(). Don't concatenate user input into SQL strings. Let's walk through each step.
[Walk through each step.]`,

  "cache-aside-pattern": `This is probably the most interesting part architecturally. We're implementing a cache-aside pattern. Here's how it works: when someone reads a bookmark, we check KV first. If it's there, great, return it. If not, we query D1, get the data, and then write it to KV for next time. For writes, we save to D1 first, then populate KV. For deletes, we clean up both. I added a _cached field in the response so you can actually see whether you're hitting the cache or not. Try it -- first request will be a D1 hit, second one should come back from KV.`,

  "step-4-full-code": `Here's the complete code with both D1 and KV working together. Same drill -- copy and replace your src/index.ts. What's new compared to the KV-only version: our Bookmark type now has tags, summary, and created_at fields, you can filter bookmarks by tag using a query parameter like ?tag=dev-tools, writes go to D1 first then KV, reads check KV first then fall back to D1. The summary column will be empty for now -- we'll populate it with AI in the next step. Try it out -- create some bookmarks with different tags, filter them, and check for that _cached field to see the caching in action.
[Give people 5-6 minutes to paste, test, and verify caching with the _cached field.]`,

  "testing-step-4": `Now let's test the D1 + KV cache combo. Create a couple bookmarks with different tags -- try "cloudflare,docs" on one and "framework,dev-tools" on another. Then use the tag filter: curl localhost:8787/bookmarks?tag=dev-tools. GET a bookmark twice and look for the _cached field.

[🎤 ENGAGEMENT] Show me in chat whether your second GET returned _cached: true or not. 🔴 if it hit D1 both times, 🟢 if you saw _cached: true on the second request. If you got a red, don't worry -- the TTL might just need a moment. But green means the cache-aside pattern is working.`,

  "step-5-workers-ai": `Okay, this is the fun part. We're adding AI. The pitch is really simple -- one binding, one function call, no external API keys, no separate billing. We're using Llama 3.1 8B to auto-generate a summary when you create a bookmark. On this slide you'll see two things: the generateSummary function, and the small changes needed inside createBookmark to wire it in. Important design choice: if the AI call fails, we still create the bookmark with an empty summary. You never want AI to block core functionality. One heads up -- for this step you need to run npx wrangler dev --remote.

[🎤 ENGAGEMENT] Quick survey while you're wiring this up: drop 🤖 in chat if you've already built something with an LLM before -- doesn't matter what platform. And drop 🆕 if this is your first time calling an AI model from code. I'm curious about the AI experience split in the room.`,

  "step-6-ai-gateway": `This might be the easiest step in the whole session. You add one parameter to the AI.run call and you get caching, analytics, and rate limiting. It's not just inference -- it's observability and cost control built in. Create an AI Gateway in the dashboard first, then add the gateway option to your code.

[🎤 ENGAGEMENT] Real talk in chat: if you've ever shipped an AI feature to production, what's scarier -- the model saying something weird, or the bill at the end of the month? 😅 No wrong answers. AI Gateway exists because both of those fears are real.`,

  "testing-step-5": `Let's test the AI integration. Important -- you need to restart your dev server with the --remote flag: npx wrangler dev --remote. This is because AI models run on Cloudflare GPUs, not locally. Create a new bookmark and check the response -- you should see a "summary" field with an AI-generated description. If the summary is empty, that's the graceful fallback working -- the AI call might have timed out, but the bookmark still got created. That's by design.
[Give people 3-4 minutes to test.]`,

  "step-7-deploy": `Alright, the moment of truth -- we're deploying to production. Two commands: apply the D1 schema to your remote database with --remote, then deploy the Worker. Once it's live, wrangler tail gives you real-time logs, and wrangler rollback is there if anything goes sideways.

[🎤 ENGAGEMENT] I want to hear some energy! Type 🚀 in chat if you're about to deploy your first production Worker today. Even if you've done it before, type 🚀 anyway -- we're celebrating shipping. And after you deploy, paste your Workers URL in chat if you want -- I'd love to see what we all built together.`,

  "platform-overview": `So we touched five products today, but there's a lot more on the platform. R2 is object storage with zero egress fees -- a big deal if you're comparing to S3. Durable Objects are for real-time stateful workloads like collaboration, gaming, booking systems. And the Agents SDK is for building AI agents that maintain state and call tools.

[🎤 ENGAGEMENT] Of everything we saw today -- Workers, KV, D1, Workers AI, AI Gateway -- which one are you most excited to dig deeper into? Drop the name in chat. Just one word. I'm always curious what lands hardest for people.`,

  "step-5-6-full-code": `Here's the complete integrated code with D1, KV, AI, and AI Gateway all working together. If you've been copy-pasting snippets and something's not quite connecting, this is your source of truth. Copy the whole thing and replace your src/index.ts. Key things to check: the AI binding is in wrangler.jsonc, the gateway ID matches what you created in the dashboard, and you're running npx wrangler dev --remote. Once it's working, create a bookmark and marvel at the AI-generated summary.
[Give people 3-4 minutes to paste and test.]`,

  recap: `Let's take a step back and look at what we just did. We started with a Hello World and in about 3 hours built a production API that has a SQL database, a caching layer, AI-powered summaries, and it's deployed to 300+ cities. Everything composes together through bindings, deployment is a single command, and you don't need to stitch together a bunch of third-party services. It's all on one platform.

[🎤 ENGAGEMENT] Before we get to next steps -- how are you feeling? Drop a 1-5 in chat: 1 = "my brain is full", 5 = "I could build another one right now". No wrong answer. If you're at a 1 or 2, that's totally normal -- this was a lot. The resources and full code are all available so you can revisit at your own pace.`,

  "next-steps": `So where do you go from here? First, observability -- we used wrangler tail today, but there's also Workers Logs for persistent, queryable logs in production. That's the first thing you want when something breaks at 2am. R2 and Queues are there when you need file storage or background processing. Durable Objects for anything real-time. And the Agents SDK if you're exploring the AI side. The Workers docs are a solid resource, and the Cloudflare Discord community is also really active and helpful.`,

  feedback: `Before we wrap up, I'd really appreciate your feedback on how this session went. There's a QR code on the screen and a link in the chat -- please take a minute to fill out the form.

[🎤 ENGAGEMENT] Your honest feedback helps me improve future sessions. What worked well? What was confusing? What would you like to see more of? Please be candid -- it really helps. And if there's someone on your team who would benefit from this workshop, feel free to share the recording link with them.`,

  "thank-you": `That's a wrap! We covered a lot in 3 hours -- from Hello World to a production API with a database, cache, and AI. Thanks for building along with me. If anything comes up later -- questions, issues, or you just want to go deeper on something -- don't hesitate to reach out. And honestly, the best thing you can do is keep building on what we started. Extend this API, try breaking it, add new features. That's how it sticks. Thanks everyone!

[🎤 ENGAGEMENT] One last ask before you go: if you got value from this session, a quick post on X or LinkedIn about what you built would mean the world. Tag me @lauragift_ and @CloudflareDev -- I read every single one. And join us on discord.cloudflare.com if you want to keep the conversation going.`,
};
