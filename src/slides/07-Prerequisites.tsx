import { SlideFrame, PatternBackground, Card } from "../components";

const prerequisites = [
  {
    icon: (
      <svg
        className="w-8 h-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "Node.js v20+",
    desc: "Run node --version to check",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: "Cloudflare Account",
    desc: "Free tier is all we need. Sign up at dash.cloudflare.com",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
    title: "Terminal",
    desc: "VS Code terminal, iTerm, or your preferred shell",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    title: "Basic JS/TS Knowledge",
    desc: "Familiarity with async/await and HTTP concepts",
  },
];

export default function PrerequisitesSlide() {
  return (
    <SlideFrame className="flex flex-col p-8">
      <PatternBackground className="opacity-20" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-cf-orange bg-cf-orange-light px-3 py-1 rounded-full">
          Setup
        </span>
        <img src="/logos/cloudflare.svg" alt="Cloudflare" className="h-8" />
      </div>

      <h1 className="relative z-10 text-4xl font-bold text-cf-text mb-6">
        Prerequisites
      </h1>

      <div className="relative z-10 grid grid-cols-2 gap-5">
        {prerequisites.map((item) => (
          <Card key={item.title} corners={false} className="px-6 py-5">
            <div className="flex items-start gap-4">
              <div className="text-cf-orange shrink-0">{item.icon}</div>
              <div>
                <p className="text-xl font-bold text-cf-text mb-1">
                  {item.title}
                </p>
                <p className="text-sm text-cf-text-muted">{item.desc}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </SlideFrame>
  );
}
