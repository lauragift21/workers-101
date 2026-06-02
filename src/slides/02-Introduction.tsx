import { SlideFrame, PatternBackground, Card } from "../components";

export default function IntroductionSlide() {
  return (
    <SlideFrame className="flex flex-col p-8">
      <PatternBackground className="opacity-20" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-cf-orange bg-cf-orange-light px-3 py-1 rounded-full">
          About Me
        </span>
        <img src="/logos/cloudflare.svg" alt="Cloudflare" className="h-8" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="flex gap-14 items-center w-full">
          {/* Left: Avatar */}
          <div className="flex-shrink-0">
            <div className="w-72 h-72 rounded-2xl border-2 border-cf-border overflow-hidden shadow-lg">
              <img
                src="/images/gift-egwuenu.jpeg"
                alt="Gift Egwuenu"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex-1">
            <h1 className="text-6xl font-bold text-cf-text mb-3">
              Gift Egwuenu
            </h1>
            <p className="text-3xl text-cf-orange font-medium mb-8">
              Senior Developer Advocate
            </p>

            {/* Social links */}
            <div className="flex gap-5">
              <Card corners={false} className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-6 h-6 text-cf-text"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span className="text-xl text-cf-text font-medium">
                    @lauragift_
                  </span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
