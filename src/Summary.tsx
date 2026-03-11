import { useEffect } from "react";
import { slides } from "./slides";
import { SLIDE_WIDTH, SLIDE_HEIGHT } from "./components";

const THUMBNAIL_WIDTH = 280;
const THUMBNAIL_SCALE = THUMBNAIL_WIDTH / SLIDE_WIDTH;

export default function Summary() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "p" || e.key === "P") {
        window.location.href = "/";
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSlideClick = (index: number) => {
    window.history.pushState({}, "", `/#${index + 1}`);
    window.location.reload();
  };

  const handleStartPresentation = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, "", "/");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-cf-bg-page p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-cf-text">
              Slide Deck Summary
            </h1>
            <p className="text-cf-text-muted mt-1">{slides.length} slides</p>
          </div>
          <a
            href="/"
            onClick={handleStartPresentation}
            className="bg-cf-orange hover:bg-cf-orange/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Start Presentation (P)
          </a>
        </div>
      </div>

      {/* Slide Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {slides.map((slide, index) => {
            const SlideComponent = slide.component;
            return (
              <div
                key={slide.id}
                className="group cursor-pointer"
                onClick={() => handleSlideClick(index)}
              >
                {/* Thumbnail container */}
                <div
                  className="relative rounded-lg overflow-hidden border border-cf-border shadow-sm group-hover:shadow-lg group-hover:border-cf-orange transition-all"
                  style={{
                    width: THUMBNAIL_WIDTH,
                    height: THUMBNAIL_WIDTH * (SLIDE_HEIGHT / SLIDE_WIDTH),
                  }}
                >
                  {/* Scaled slide */}
                  <div
                    style={{
                      width: SLIDE_WIDTH,
                      height: SLIDE_HEIGHT,
                      transform: `scale(${THUMBNAIL_SCALE})`,
                      transformOrigin: "top left",
                      pointerEvents: "none",
                    }}
                  >
                    <SlideComponent />
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>

                {/* Slide info */}
                <div className="mt-2 px-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-cf-text-muted">
                      {index + 1}
                    </span>
                    <span className="text-sm text-cf-text truncate">
                      {slide.id.replace(/-/g, " ")}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
