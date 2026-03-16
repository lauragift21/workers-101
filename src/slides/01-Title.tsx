import { SLIDE_WIDTH, SLIDE_HEIGHT } from "../components";

export default function TitleSlide() {
  return (
    <div
      data-slide-container
      className="relative overflow-hidden"
      style={{
        width: SLIDE_WIDTH,
        height: SLIDE_HEIGHT,
        backgroundColor: "#ff4801",
      }}
    >
      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255, 251, 245, 0.3) 1px, transparent 1px)`,
          backgroundSize: "16px 16px",
        }}
      />

      {/* Sun/glow effect at bottom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(255, 200, 150, 0.6) 0%, rgba(255, 150, 80, 0.3) 30%, transparent 70%)",
        }}
      />

      {/* Cloudflare logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[240px] z-10">
        <img
          src="/logos/cloudflare-white.svg"
          alt="Cloudflare"
          className="h-14"
        />
      </div>

      {/* Main content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div
          className="px-12 py-5 rounded-full mb-6"
          style={{
            backgroundColor: "#fffbf5",
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.1)",
          }}
        >
          <span className="text-3xl font-semibold" style={{ color: "#36180d" }}>
            Cloudflare Workers 101 Workshop
          </span>
        </div>

        <p className="text-xl font-medium mb-2" style={{ color: "#fffbf5" }}>
          Build and Deploy a Bookmark API with Cloudflare Workers
        </p>
      </div>
    </div>
  );
}
