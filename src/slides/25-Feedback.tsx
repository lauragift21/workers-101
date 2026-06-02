import { SlideFrame, PatternBackground } from "../components";

export default function FeedbackSlide() {
  const formUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLScU9VxSa8fuCwOwha1Gneo2S7O4C6R5TwFlW30xJ5gajZo8RA/viewform";

  return (
    <SlideFrame className="flex flex-col p-8">
      <PatternBackground className="opacity-20" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-cf-orange bg-cf-orange-light px-3 py-1 rounded-full">
          Feedback
        </span>
        <img src="/logos/cloudflare.svg" alt="Cloudflare" className="h-8" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-cf-text mb-3">How did the session go?</h1>
        <p className="text-lg text-cf-text-muted mb-8 text-center max-w-xl">
          Your feedback helps us improve future sessions. Let us know what
          worked and what we can do better.
        </p>

        <div className="flex flex-col items-center gap-6">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(formUrl)}`}
            alt="Feedback form QR code"
            className="w-40 h-40 rounded-lg border border-cf-border"
          />

          <a
            href={formUrl}
            target="_blank"
            className="text-sm text-cf-orange hover:underline font-mono break-all max-w-lg text-center"
          >
            Feedback Form
          </a>
        </div>
      </div>
    </SlideFrame>
  );
}
