import { SlideFrame, PatternBackground } from "../components";

export default function ThankYouSlide() {
  return (
    <SlideFrame className="flex flex-col">
      <PatternBackground className="opacity-20" />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
        <img
          src="/logos/cloudflare.svg"
          alt="Cloudflare"
          className="h-10 mb-8"
        />
        <h1 className="text-6xl font-bold text-cf-text mb-3">Thank You!</h1>
        <p className="text-xl text-cf-text-muted mb-6">
          Now go build something on Workers.
        </p>
        <div className="flex gap-4 text-sm text-cf-text-muted mb-8">
          <a
            href="https://developers.cloudflare.com/workers"
            target="_blank"
            className="hover:text-cf-orange transition-colors"
          >
            Workers Docs
          </a>
          <span>&middot;</span>
          <a
            href="https://discord.cloudflare.com"
            target="_blank"
            className="hover:text-cf-orange transition-colors"
          >
            Discord Community
          </a>
          <span>&middot;</span>
          <a
            href="https://developers.cloudflare.com/workers/tutorials"
            target="_blank"
            className="hover:text-cf-orange transition-colors"
          >
            Tutorials
          </a>
        </div>

        <div className="flex flex-col items-center gap-2">
          <img
            src="/images/qr-workers-101.png"
            alt="Workshop resources"
            className="w-28 h-28 rounded-lg"
          />
        </div>
      </div>
    </SlideFrame>
  );
}
