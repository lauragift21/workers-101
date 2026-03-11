# Workers 101 Presentation

A slide deck for Cloudflare Workers training, built with React and deployed on Cloudflare Workers.

## Tech Stack

- **React 19** with TypeScript
- **Vite** for bundling
- **Tailwind CSS v4** for styling
- **Cloudflare Workers** for deployment (via `@cloudflare/vite-plugin`)
- **Prism React Renderer** for code syntax highlighting

## Getting Started

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Preview with Wrangler (local Workers runtime)
npm run preview

# Deploy to Cloudflare
npm run deploy
```

## Keyboard Shortcuts

| Key                     | Action              |
| ----------------------- | ------------------- |
| `Arrow Right` / `Space` | Next slide          |
| `Arrow Left`            | Previous slide      |
| `F`                     | Toggle fullscreen   |
| `S`                     | Open summary view   |
| `G`                     | Open presenter view |

Touch navigation is also supported (swipe or tap left/right edges).

## Project Structure

```
src/
  main.tsx             # App entry point and slide navigation
  slides/              # Individual slide components (01–24)
  components/          # Shared UI components (CodeBlock, SlideFrame, etc.)
  speakerNotes.ts      # Speaker notes per slide
  Summary.tsx          # Summary view
  PresenterView.tsx    # Presenter view with notes
  styles.css           # Global styles
wrangler.jsonc         # Cloudflare Workers config
vite.config.ts         # Vite + Cloudflare plugin config
```

## Slides

The presentation covers building a Cloudflare Workers application step-by-step, including:

1. What are Workers and their anatomy
2. HTTP request handling and CRUD routes
3. KV storage setup and usage
4. D1 database integration with cache-aside pattern
5. Workers AI integration
6. AI Gateway
7. Deployment
