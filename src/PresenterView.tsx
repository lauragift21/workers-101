import { useState, useEffect, useCallback } from "react";
import { slides } from "./slides";
import { speakerNotes } from "./speakerNotes";
import { SLIDE_WIDTH, SLIDE_HEIGHT } from "./components";

/** Channel name shared between presentation window and presenter view. */
const CHANNEL = "presenter-sync";

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function getSlideFromHash(): number {
  const hash = window.location.hash.slice(1);
  const num = parseInt(hash, 10);
  if (!isNaN(num) && num >= 1 && num <= slides.length) {
    return num - 1;
  }
  return 0;
}

export default function PresenterView() {
  const [currentSlide, setCurrentSlide] = useState(getSlideFromHash);
  const [elapsed, setElapsed] = useState(0);
  const [startTime] = useState(() => Date.now());
  const [notesFontSize, setNotesFontSize] = useState(14);

  // Listen for slide changes from the main presentation window
  useEffect(() => {
    const bc = new BroadcastChannel(CHANNEL);
    bc.onmessage = (event) => {
      if (typeof event.data?.slide === "number") {
        setCurrentSlide(event.data.slide);
      }
    };
    return () => bc.close();
  }, []);

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  // Keyboard nav (so you can also drive from the presenter window)
  const navigate = useCallback((direction: 1 | -1) => {
    setCurrentSlide((prev) => {
      const next = Math.max(0, Math.min(prev + direction, slides.length - 1));
      const bc = new BroadcastChannel(CHANNEL);
      bc.postMessage({ slide: next });
      bc.close();
      return next;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        navigate(1);
      } else if (e.key === "ArrowLeft") {
        navigate(-1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  // Derived values
  const currentId = slides[currentSlide].id;
  const nextSlide = currentSlide + 1 < slides.length ? currentSlide + 1 : null;
  const notes = speakerNotes[currentId] || "No notes for this slide.";
  const CurrentComponent = slides[currentSlide].component;
  const NextComponent = nextSlide !== null ? slides[nextSlide].component : null;

  const mins = Math.floor(elapsed / 60);

  // Progress
  const progress = ((currentSlide + 1) / slides.length) * 100;

  // Scale for the preview thumbnails
  const previewScale = 0.55;
  const nextPreviewScale = 0.25;

  return (
    <div className="w-screen h-screen bg-gray-950 text-white flex flex-col overflow-hidden">
      {/* Progress bar */}
      <div className="h-1 bg-gray-800 shrink-0">
        <div
          className="h-full bg-cf-orange transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-2.5 bg-gray-900 border-b border-gray-800 shrink-0">
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-cf-orange uppercase tracking-wider">
            Presenter View
          </span>
          <span className="text-sm text-gray-400">
            Slide {currentSlide + 1} / {slides.length}
          </span>
          <span className="text-xs text-gray-500 font-mono">{currentId}</span>
        </div>

        {/* Timer */}
        <span
          className={`text-lg font-mono font-bold ${
            mins >= 130
              ? "text-red-400"
              : mins >= 120
                ? "text-amber-400"
                : "text-green-400"
          }`}
        >
          {formatTime(elapsed)}
        </span>
      </div>

      {/* Main content */}
      <div className="flex-1 flex min-h-0">
        {/* Left: Current slide + Up Next beneath it */}
        <div className="w-[60%] flex flex-col p-4 gap-3">
          {/* Current slide preview */}
          <div className="flex-1 flex items-center justify-center">
            <div
              className="border-2 border-cf-orange rounded-lg overflow-hidden shadow-lg"
              style={{
                width: SLIDE_WIDTH * previewScale,
                height: SLIDE_HEIGHT * previewScale,
              }}
            >
              <div
                style={{
                  transform: `scale(${previewScale})`,
                  transformOrigin: "top left",
                  width: SLIDE_WIDTH,
                  height: SLIDE_HEIGHT,
                }}
              >
                <CurrentComponent />
              </div>
            </div>
          </div>

          {/* Next slide preview - aligned to the right */}
          {NextComponent && (
            <div className="shrink-0 flex flex-col items-end">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1.5">
                Up Next
              </p>
              <div
                className="border border-gray-700 rounded-lg overflow-hidden opacity-70"
                style={{
                  width: SLIDE_WIDTH * nextPreviewScale,
                  height: SLIDE_HEIGHT * nextPreviewScale,
                }}
              >
                <div
                  style={{
                    transform: `scale(${nextPreviewScale})`,
                    transformOrigin: "top left",
                    width: SLIDE_WIDTH,
                    height: SLIDE_HEIGHT,
                  }}
                >
                  <NextComponent />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Speaker notes */}
        <div className="w-[40%] border-l border-gray-800 flex flex-col">
          <div className="px-5 py-3 border-b border-gray-800 shrink-0 flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-300">Speaker Notes</h2>
            {/* Font size controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setNotesFontSize((s) => Math.max(10, s - 2))}
                className="w-7 h-7 rounded bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-gray-200 flex items-center justify-center text-xs font-bold transition-colors"
                title="Decrease font size"
              >
                A-
              </button>
              <span className="text-xs text-gray-600 w-8 text-center font-mono">
                {notesFontSize}
              </span>
              <button
                onClick={() => setNotesFontSize((s) => Math.min(24, s + 2))}
                className="w-7 h-7 rounded bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-gray-200 flex items-center justify-center text-xs font-bold transition-colors"
                title="Increase font size"
              >
                A+
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <pre
              className="text-gray-200 leading-relaxed whitespace-pre-wrap font-sans"
              style={{ fontSize: notesFontSize }}
            >
              {notes}
            </pre>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-6 py-2 bg-gray-900 border-t border-gray-800 shrink-0">
        <p className="text-xs text-gray-500 text-center">
          Arrow keys to navigate &middot; Changes sync with the presentation
          window
        </p>
      </div>
    </div>
  );
}
