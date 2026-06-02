import { SlideFrame, PatternBackground } from "../components";

export default function IsolatesVisualSlide() {
  return (
    <SlideFrame className="flex flex-col p-8">
      <PatternBackground className="opacity-20" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-cf-orange bg-cf-orange-light px-3 py-1 rounded-full">
          Core Concepts
        </span>
        <img src="/logos/cloudflare.svg" alt="Cloudflare" className="h-8" />
      </div>

      <h1 className="relative z-10 text-3xl font-bold text-cf-text mb-1">
        Isolates vs. Containers
      </h1>
      <p className="relative z-10 text-sm text-cf-text-muted mb-6">
        Workers are built on a unique architecture called isolates. Isolates
        are an order of magnitude more lightweight, which means they can easily
        and quickly scale up and down to meet your needs.
      </p>

      {/* Centered compact diagram */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="flex items-center gap-6">
          {/* Left: Traditional */}
          <div className="flex flex-col items-center gap-2.5">
            <div className="grid grid-cols-2 gap-1.5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg border-2 border-dashed border-cf-border p-2 flex flex-col items-center gap-1.5"
                  style={{ width: "84px", height: "100px" }}
                >
                  {/* User code */}
                  <div className="border border-dashed border-cf-orange/50 rounded flex items-center justify-center w-[34px] h-[28px]">
                    <span className="text-cf-orange font-mono text-[10px] font-bold leading-none select-none">
                      &lt;/&gt;
                    </span>
                  </div>
                  {/* Process overhead */}
                  <div style={{ animation: `spin 4s linear ${i * 0.6}s infinite` }}>
                    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                      <circle cx="16" cy="16" r="14" stroke="#c4b8a8" strokeWidth="1.5" strokeDasharray="4 3" />
                      <path d="M22 16C22 12.686 19.314 10 16 10C13.55 10 11.43 11.47 10.51 13.56M10 16C10 19.314 12.686 22 16 22C18.45 22 20.57 20.53 21.49 18.44" stroke="#908070" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M20.5 11L22 13.5H19L20.5 11Z" fill="#908070" />
                      <path d="M11.5 21L10 18.5H13L11.5 21Z" fill="#908070" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-xs font-medium text-cf-text-muted">
                Traditional architecture
              </p>
              <p className="text-[10px] text-cf-text-muted/50 mt-0.5">
                1 process per container
              </p>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-cf-orange/40">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Right: Workers */}
          <div className="flex flex-col items-center gap-2.5">
            <div className="bg-white rounded-lg border-2 border-dashed border-cf-orange/30 p-2 flex flex-col items-center justify-center gap-2" style={{ width: "172px", height: "146px" }}>
              {/* 9 isolates */}
              <div className="grid grid-cols-3 gap-1.5">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="border border-dashed border-cf-orange/50 rounded flex items-center justify-center w-[34px] h-[28px]"
                    style={{ animation: `fadeInOut 2s ease-in-out ${i * 0.12}s infinite` }}
                  >
                    <span className="text-cf-orange font-mono text-[10px] font-bold leading-none select-none">
                      &lt;/&gt;
                    </span>
                  </div>
                ))}
              </div>
              {/* Single process icon */}
              <div style={{ animation: "spin 3s linear infinite" }}>
                <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="14" stroke="#ff4801" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
                  <path d="M22 16C22 12.686 19.314 10 16 10C13.55 10 11.43 11.47 10.51 13.56M10 16C10 19.314 12.686 22 16 22C18.45 22 20.57 20.53 21.49 18.44" stroke="#ff4801" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                  <path d="M20.5 11L22 13.5H19L20.5 11Z" fill="#ff4801" opacity="0.7" />
                  <path d="M11.5 21L10 18.5H13L11.5 21Z" fill="#ff4801" opacity="0.7" />
                </svg>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs font-medium text-cf-orange">
                Workers V8 isolates
              </p>
              <p className="text-[10px] text-cf-text-muted/50 mt-0.5">
                Isolates share one process
              </p>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-4 pl-3">
            <div className="flex items-center gap-2">
              <div className="border border-dashed border-cf-orange/50 rounded flex items-center justify-center w-8 h-6 shrink-0">
                <span className="text-cf-orange font-mono text-[9px] font-bold leading-none select-none">
                  &lt;/&gt;
                </span>
              </div>
              <div>
                <p className="text-[11px] font-bold text-cf-text leading-tight">User code</p>
                <p className="text-[9px] text-cf-text-muted leading-tight">Your JavaScript</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-6 shrink-0">
                <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="14" stroke="#c4b8a8" strokeWidth="1.5" strokeDasharray="4 3" />
                  <path d="M22 16C22 12.686 19.314 10 16 10C13.55 10 11.43 11.47 10.51 13.56M10 16C10 19.314 12.686 22 16 22C18.45 22 20.57 20.53 21.49 18.44" stroke="#908070" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M20.5 11L22 13.5H19L20.5 11Z" fill="#908070" />
                  <path d="M11.5 21L10 18.5H13L11.5 21Z" fill="#908070" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-bold text-cf-text leading-tight">Process overhead</p>
                <p className="text-[9px] text-cf-text-muted leading-tight">OS + runtime</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom explainer */}
      <div className="relative z-10 mt-4 bg-cf-orange/5 border border-cf-orange/20 rounded-lg px-4 py-3 max-w-2xl mx-auto">
        <p className="text-xs text-cf-text leading-relaxed text-center">
          A traditional container bundles your code with a full OS and runtime —
          one heavy process per container. A V8 isolate is just a JavaScript
          context: your code <em>inside</em> the V8 engine, with nothing else.
          Many isolates share a single process, which is why Workers deploy
          globally with zero cold starts.
        </p>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 1; }
        }
      `}</style>
    </SlideFrame>
  );
}
