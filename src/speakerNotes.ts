/**
 * Speaker notes keyed by slide ID (matching the `id` field in slides/index.ts).
 * Displayed in the Presenter View window (press G to open).
 */
export const speakerNotes: Record<string, string> = {
  title: `Hey everyone! So today we're going to build something together -- an actual API on Workers, from scratch. This is hands-on, so you'll be writing code alongside me the whole time. By the end you'll have a working API deployed to production. The goal is that after this, you'll know how the pieces fit together and feel confident building on Workers. Let's get into it.`,

  "training-goals": `So here's the plan. We're starting from zero -- literally a Hello World -- and we're going to layer things on step by step. Storage, database, AI, deployment. The whole thing. Each step builds on the previous one, so you'll see how the products connect. That's really the point of this -- by building it yourself, you'll understand the full journey of creating an API on Workers.`,

  "what-we-are-building": `Okay, so this is our roadmap. We're building a Bookmark API -- think of it as a simple service where you can save, retrieve, and manage bookmarks. Each step here introduces a new Cloudflare product. You can see the rough timings on the right, but honestly we'll go at whatever pace makes sense. If something takes longer, that's fine. I have all the resource for you reference after.`,

  "what-are-workers": `Alright, before we start coding, let's make sure we're all on the same page about what Workers actually are. Workers use V8 isolates instead of containers, which is why there's basically zero cold start -- a huge differentiator compared to Lambda. They run in over 300 cities automatically, no region selection needed. And the pricing is per-request, not per-server-hour. The entry point is a fetch handler instead of something like app.listen. That's the mental shift.`,

  "worker-anatomy": `This is the part I really want you to internalize. Every Worker has this same shape -- it exports a fetch handler with three parameters. Request is just the incoming HTTP request, nothing surprising there. Env is the interesting one -- that's how you access everything on the platform. KV, D1, AI, all of it. It's all just... there, injected through bindings. And then ctx gives you things like waitUntil for doing background work after you've already sent a response.`,

  prerequisites: `Quick checkpoint before we dive in. You'll need Node 20 or higher -- if you're not sure, run node --version in your terminal. You should all have Cloudflare accounts already, but if for some reason you don't, go to dash.cloudflare.com and get one set up real quick. Let me know when everyone's good to go.`,

  "step-1-getting-started": `Alright, here we go -- first hands-on step. Three commands and you'll have a running Worker. First, wrangler login to authenticate. Then create the project, and start the dev server. The create command gives you everything you need out of the box. Once it's running, hit localhost:8787 and you should see Hello World in the browser. Go ahead and try it.
[Give people 3-4 minutes. Walk around, check for any issues with wrangler login.]`,

  "project-structure": `Let's look at what got generated. Two files matter right now: src/index.ts where our code lives, and wrangler.jsonc which is the config for our Worker.`,

  "step-2-http-handling": `Now we're going to turn our Hello World into an actual API. We'll define a Bookmark type, use a plain JavaScript Map for storage for now -- just to keep things simple -- and set up routing based on the URL and HTTP method. We're building four endpoints: list all bookmarks, create one, get one by ID, and delete one.`,

  "crud-handlers": `Here are the actual handler functions. A few things to notice -- we're using crypto.randomUUID() to generate IDs, which is built right into the Workers runtime. For reading the request body, it's just request.json(). And we're being good citizens with our status codes: 201 when something's created, 404 when it's not found, 400 for bad input. All of this is standard web platform stuff, nothing Cloudflare-specific.`,

  "testing-step-2": `Okay, let's actually test this thing. Use curl or whatever HTTP client you like. Create a couple of bookmarks, list them, try getting one by ID, delete one. Play around with it. But here's the catch -- try restarting your dev server and then list your bookmarks again. They're gone, right? That's because we're storing everything in memory. It disappears the moment the process stops. And that's exactly what we're going to fix next.
[Give people 3-4 minutes to test.]`,

  "what-is-kv": `So our first real storage solution is Workers KV. Think of it like a global key-value store -- the mental model is Redis but built into the platform. The API is dead simple: get, put, delete, list. That's basically it. One important thing to know -- KV is eventually consistent. Writes take up to about 60 seconds to propagate everywhere. So it's ideal for high-read, low-write workloads. If you need strong consistency, that's where Durable Objects come in, which we'll touch on later.`,

  "step-3-kv-setup": `Migrating to KV is two steps. Create the namespace using the CLI -- which automatically adds the binding to wrangler.jsonc for you -- and then swap out the Map operations for KV calls in your code. The code changes are pretty minimal -- where we had bookmarks.get(id), it becomes env.BOOKMARKS.get(id, 'json'). Oh, and one thing -- after the CLI updates wrangler.jsonc, run npx wrangler types so TypeScript picks up the new binding. Otherwise you'll get red squiggles everywhere.
[Give people 5 minutes to migrate.]`,

  "step-3-full-code": `Here's the full code for the KV version. There's a copy button up in the top-right corner -- just grab the whole thing and replace your src/index.ts. The big difference from before: the in-memory Map is completely gone. Every handler now goes through env.BOOKMARKS. Here's how you can verify it's working -- create a bookmark, stop the dev server, start it back up, and list your bookmarks. They should still be there. That's persistence.
[Give people 2-3 minutes to paste and test.]`,

  "step-4-d1-intro": `Now things get interesting. We're adding a proper database. D1 is our SQL database, built on SQLite, so anyone who knows SQL can use it right away. Look at the comparison here -- KV is great for fast reads, but you can only look things up by key. D1 gives you full SQL. JOINs, WHERE clauses, filtering, all of it. So what we're going to do is use both together: D1 as our source of truth and KV as a fast read cache in front of it. This is actually a really common architectural pattern.`,

  "d1-setup": `Same pattern as before -- create the database from the CLI, which auto-adds the binding to wrangler.jsonc, write a schema file, and apply it. Notice we've added a tags column to our schema. That's going to let us do things like "show me all bookmarks tagged with 'dev-tools'" -- which would be impossible with just KV. And please, always use parameterized queries with .bind(). Don't concatenate user input into SQL strings. Let's walk through each step.
[Walk through each step.]`,

  "cache-aside-pattern": `This is probably the most interesting part architecturally. We're implementing a cache-aside pattern. Here's how it works: when someone reads a bookmark, we check KV first. If it's there, great, return it. If not, we query D1, get the data, and then write it to KV for next time. For writes, we save to D1 first, then populate KV. For deletes, we clean up both. I added a _cached field in the response so you can actually see whether you're hitting the cache or not. Try it -- first request will be a D1 hit, second one should come back from KV.`,

  "step-4-full-code": `Here's the complete code with both D1 and KV working together. Same drill -- copy and replace your src/index.ts. What's new compared to the KV-only version: our Bookmark type now has tags and created_at fields, you can filter bookmarks by tag using a query parameter like ?tag=dev-tools, writes go to D1 first then KV, reads check KV first then fall back to D1. Try it out -- create some bookmarks with different tags, filter them, and check for that _cached field to see the caching in action.
[Give people 5-6 minutes to paste, test, and verify caching with the _cached field.]`,

  "step-5-workers-ai": `Okay, this is the fun part. We're adding AI. The pitch is really simple -- one binding, one function call, no external API keys, no separate billing. We're using Llama 3.1 8B to auto-generate a summary when you create a bookmark. Important design choice: if the AI call fails, we still create the bookmark with an empty summary. You never want AI to block core functionality -- that's a good principle for any production system. One heads up -- for this step you need to run npx wrangler dev --remote because the AI models run on Cloudflare's GPUs, not locally.
[Give people 4-5 minutes.]`,

  "step-6-ai-gateway": `This might be the easiest step in the whole session. You add one parameter to the AI.run call and you get caching, analytics, and rate limiting. It's not just inference -- it's observability and cost control built in. Create an AI Gateway in the dashboard first, then add the gateway option to your code. Once it's deployed, you can see every AI call logged with latency, token count, and cache status. Really useful when you need visibility into AI usage and costs.
[Quick 2-3 minute exercise.]`,

  "step-7-deploy": `Alright, the moment of truth -- we're deploying to production. One command: npx wrangler deploy. But before that, we need to apply our D1 schema to the remote database -- same command as before but without the --local flag. Once it's live, wrangler tail gives you real-time logs, and wrangler rollback is there if anything goes sideways. The deploy experience is really smooth.
[Do a live deploy if time allows -- it's a great demo moment.]`,

  "platform-overview": `So we touched five products today, but there's a lot more on the platform. R2 is object storage with zero egress fees -- a big deal if you're comparing to S3. Durable Objects are for real-time stateful workloads like collaboration, gaming, booking systems. And the Agents SDK is for building AI agents that maintain state and call tools. It's good to know where these fit in the stack relative to what we built today.`,

  recap: `Let's take a step back and look at what we just did. We started with a Hello World and ended up with a production API that has a SQL database, a caching layer, AI-powered summaries, and it's deployed to 300+ cities. In about an hour and a half. Everything composes together through bindings, deployment is a single command, and you don't need to stitch together a bunch of third-party services. It's all on one platform.`,

  "next-steps": `So where do you go from here? If you want to keep building on this, Hono is a great next step for cleaner routing. R2 and Queues are there when you need file storage or background processing. Durable Objects for anything real-time. And the Agents SDK if you're exploring the AI side. The Workers docs are a solid resource, and the Cloudflare Discord community is also really active and helpful.`,

  "thank-you": `That's a wrap! Thanks for building along with me. If anything comes up later -- questions, issues, or you just want to go deeper on something -- don't hesitate to reach out. And honestly, the best thing you can do is keep building on what we started. Extend this API, try breaking it, add new features. That's how it sticks. Thanks everyone!`,
};
