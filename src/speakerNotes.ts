/**
 * Speaker notes keyed by slide ID (matching the `id` field in slides/index.ts).
 * Displayed in the Presenter View window (press G to open).
 */
export const speakerNotes: Record<string, string> = {
  title: `Hey everyone! So today we're going to build something together -- an actual API on Workers, from scratch. This is hands-on, so you'll be writing code alongside me the whole time. By the end you'll have a working API deployed to production. The goal is that after this, when a customer asks about Workers, you've actually built something on it and you know how the pieces fit together. Let's get into it.`,

  "training-goals": `So here's the plan. We're starting from zero -- literally a Hello World -- and we're going to layer things on step by step. Storage, database, AI, deployment. The whole thing. Each step builds on the previous one, so you'll see how the products connect. That's really the point of this -- when a customer says "I want to build an API on Workers," you'll know exactly what that journey looks like because you've done it yourself.`,

  "what-we-are-building": `Okay, so this is our roadmap. We're building a Bookmark API -- think of it as a simple service where you can save, retrieve, and manage bookmarks. Each step here introduces a new Cloudflare product. You can see the rough timings on the right, but honestly we'll go at whatever pace makes sense. If something takes longer, that's fine. I have all the resource for you reference after.`,

  "what-are-workers": `Alright, before we start coding, let's make sure we're all on the same page about what Workers actually are. You've probably explained this to customers already, but now you'll feel it firsthand. Workers use V8 isolates instead of containers, which is why there's basically zero cold start -- that's a huge differentiator when customers compare us to Lambda. They run in over 300 cities automatically, no region selection. And the pricing is per-request, not per-server-hour. The entry point is a fetch handler instead of something like app.listen. That's the mental shift.`,

  "worker-anatomy": `This is the part I really want you to internalize. Every Worker has this same shape -- it exports a fetch handler with three parameters. Request is just the incoming HTTP request, nothing surprising there. Env is the interesting one -- that's how you access everything on the platform. KV, D1, AI, all of it. It's all just... there, injected through bindings. And then ctx gives you things like waitUntil for doing background work after you've already sent a response.`,

  prerequisites: `Quick checkpoint before we dive in. You'll need Node 20 or higher -- if you're not sure, run node --version in your terminal. You should all have Cloudflare accounts already, but if for some reason you don't, go to dash.cloudflare.com and get one set up real quick. Let me know when everyone's good to go.`,

  "step-1-getting-started": `Alright, here we go -- first hands-on step. Three commands and you'll have a running Worker. First, wrangler login to authenticate. Then create the project, and start the dev server. The create command gives you everything you need out of the box. Once it's running, hit localhost:8787 and you should see Hello World in the browser. Go ahead and try it.
[Give people 3-4 minutes. Walk around, check for any issues with wrangler login.]`,

  "project-structure": `Let's look at what got generated. Two files matter right now: src/index.ts where our code lives, and wrangler.jsonc which is the config for our Worker.`,

  "step-2-http-handling": `Now we're going to turn our Hello World into an actual API. We'll define a Bookmark type, use a plain JavaScript Map for storage for now -- just to keep things simple -- and set up routing based on the URL and HTTP method. We're building four endpoints: list all bookmarks, create one, get one by ID, and delete one.`,

  "crud-handlers": `Here are the actual handler functions. A few things to notice -- we're using crypto.randomUUID() to generate IDs, which is built right into the Workers runtime. For reading the request body, it's just request.json(). And we're being good citizens with our status codes: 201 when something's created, 404 when it's not found, 400 for bad input. All of this is standard web platform stuff, nothing Cloudflare-specific.`,

  "testing-step-2": `Okay, let's actually test this thing. Use curl or whatever HTTP client you like. Create a couple of bookmarks, list them, try getting one by ID, delete one. Play around with it. But here's the catch -- try restarting your dev server and then list your bookmarks again. They're gone, right? That's because we're storing everything in memory. It disappears the moment the process stops. And that's exactly what we're going to fix next.
[Give people 3-4 minutes to test.]`,

  "what-is-kv": `So our first real storage solution is Workers KV. Think of it like a global key-value store -- if customers ask, the mental model is Redis but built into the platform. The API is dead simple: get, put, delete, list. That's basically it. One thing that comes up a lot in customer conversations -- KV is eventually consistent. Writes take up to about 60 seconds to propagate everywhere. So it's ideal for high-read, low-write workloads. If a customer needs strong consistency, that's where you'd point them toward Durable Objects instead, which we'll touch on later.`,

  "step-3-kv-setup": `Migrating to KV is three steps. Create the namespace using the CLI, add the binding in wrangler.jsonc, and then swap out the Map operations for KV calls in your code. The code changes are pretty minimal -- where we had bookmarks.get(id), it becomes env.BOOKMARKS.get(id, 'json'). Oh, and one thing -- after you update wrangler.jsonc, run npx wrangler types so TypeScript picks up the new binding. Otherwise you'll get red squiggles everywhere.
[Give people 5 minutes to migrate.]`,

  "step-3-full-code": `Here's the full code for the KV version. There's a copy button up in the top-right corner -- just grab the whole thing and replace your src/index.ts. The big difference from before: the in-memory Map is completely gone. Every handler now goes through env.BOOKMARKS. Here's how you can verify it's working -- create a bookmark, stop the dev server, start it back up, and list your bookmarks. They should still be there. That's persistence.
[Give people 2-3 minutes to paste and test.]`,

  "step-4-d1-intro": `Now things get interesting. We're adding a proper database. D1 is our SQL database, built on SQLite, so anyone who knows SQL can use it -- that's a good thing to tell customers who are evaluating it. Look at the comparison here -- KV is great for fast reads, but you can only look things up by key. D1 gives you full SQL. JOINs, WHERE clauses, filtering, all of it. So what we're going to do is use both together: D1 as our source of truth and KV as a fast read cache in front of it. This is actually a really common pattern you'll see customers adopt.`,

  "d1-setup": `Same pattern as before -- create the database from the CLI, add the binding to wrangler.jsonc, write a schema file, and apply it. Notice we've added a tags column to our schema. That's going to let us do things like "show me all bookmarks tagged with 'dev-tools'" -- which would be impossible with just KV. And please, always use parameterized queries with .bind(). Don't concatenate user input into SQL strings. Let's walk through each step.
[Walk through each step.]`,

  "cache-aside-pattern": `This is probably the most interesting part architecturally. We're implementing a cache-aside pattern. Here's how it works: when someone reads a bookmark, we check KV first. If it's there, great, return it. If not, we query D1, get the data, and then write it to KV for next time. For writes, we save to D1 first, then populate KV. For deletes, we clean up both. I added a _cached field in the response so you can actually see whether you're hitting the cache or not. Try it -- first request will be a D1 hit, second one should come back from KV.`,

  "step-4-full-code": `Here's the complete code with both D1 and KV working together. Same drill -- copy and replace your src/index.ts. What's new compared to the KV-only version: our Bookmark type now has tags and created_at fields, you can filter bookmarks by tag using a query parameter like ?tag=dev-tools, writes go to D1 first then KV, reads check KV first then fall back to D1. Try it out -- create some bookmarks with different tags, filter them, and check for that _cached field to see the caching in action.
[Give people 5-6 minutes to paste, test, and verify caching with the _cached field.]`,

  "step-5-workers-ai": `Okay, this is the fun part. We're adding AI. And this is a great one to know for customer conversations because the pitch is really simple -- one binding, one function call, no external API keys, no separate billing. We're using Llama 3.1 8B to auto-generate a summary when you create a bookmark. Important design choice: if the AI call fails, we still create the bookmark with an empty summary. You never want AI to block core functionality, and that's good guidance to pass along to customers too. One heads up -- for this step you need to run npx wrangler dev --remote because the AI models run on Cloudflare's GPUs, not locally.
[Give people 4-5 minutes.]`,

  "step-6-ai-gateway": `This might be the easiest step in the whole session. You add one parameter to the AI.run call and you get caching, analytics, and rate limiting. That's the kind of thing that's really compelling when you're talking to customers about our AI stack -- it's not just inference, it's observability and cost control built in. Create an AI Gateway in the dashboard first, then add the gateway option to your code. Once it's deployed, you can see every AI call logged with latency, token count, and cache status. Really useful for customers who need visibility into their AI usage.
[Quick 2-3 minute exercise.]`,

  "step-7-deploy": `Alright, the moment of truth -- we're deploying to production. One command: npx wrangler deploy. But before that, we need to apply our D1 schema to the remote database -- same command as before but without the --local flag. Once it's live, wrangler tail gives you real-time logs, and wrangler rollback is there if anything goes sideways. The deploy experience is really smooth -- it's one of those things that impresses customers when you show it.
[Do a live deploy if time allows -- it's a great demo moment.]`,

  "platform-overview": `So we touched five products today, but there's a lot more on the platform that you'll hear customers ask about. R2 is object storage with zero egress fees -- that's usually the first thing that gets customers' attention when they're comparing to S3. Durable Objects are for real-time stateful workloads like collaboration, gaming, booking systems. And the Agents SDK is for building AI agents that maintain state and call tools. These come up in customer conversations a lot, so it's good to know where they fit in the stack relative to what we built today.`,

  recap: `Let's take a step back and look at what we just did. We started with a Hello World and ended up with a production API that has a SQL database, a caching layer, AI-powered summaries, and it's deployed to 300+ cities. In about an hour and a half. That's the story you can tell customers too -- everything composes together through bindings, deployment is a single command, and you don't need to stitch together a bunch of third-party services. It's all on one platform.`,

  "next-steps": `So where do you go from here? If you want to keep building on this, Hono is a great next step for cleaner routing. R2 and Queues are there when customers need file storage or background processing. Durable Objects for anything real-time. And the Agents SDK if you're exploring the AI side. The internal developer docs and the public Workers docs are both solid resources. And honestly, if you want to run this same workshop with your own customers or partners, feel free -- that's part of why we structured it this way.`,

  "thank-you": `That's a wrap! Thanks for building along with me. If anything comes up later -- questions, issues, or you just want to go deeper on something -- be sure to send me a dm, I'm always happy to help. And honestly, the best thing you can do is keep building on what we started. Extend this API, try breaking it, add new features. That's how it sticks. Thanks everyone!`,
};
