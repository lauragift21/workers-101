import { StrictMode, useState, useEffect, useCallback, useRef } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { slides } from "./slides";
import { SLIDE_WIDTH, SLIDE_HEIGHT } from "./components";
import Summary from "./Summary";
import PresenterView from "./PresenterView";

const PRESENTER_CHANNEL = "presenter-sync";

function getSlideFromHash(): number {
  const hash = window.location.hash.slice(1);
  const num = parseInt(hash, 10);
  // Hash is 1-based (/#1 = first slide), convert to 0-based index
  if (!isNaN(num) && num >= 1 && num <= slides.length) {
    return num - 1;
  }
  return 0;
}

function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(getSlideFromHash);
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const slideRef = useRef(currentSlide);

  useEffect(() => {
    const resetIdle = () => {
      setIsIdle(false);
      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setIsIdle(true), 3000);
    };

    resetIdle();
    window.addEventListener("mousemove", resetIdle);
    window.addEventListener("mousedown", resetIdle);
    window.addEventListener("touchstart", resetIdle);
    return () => {
      clearTimeout(idleTimer.current);
      window.removeEventListener("mousemove", resetIdle);
      window.removeEventListener("mousedown", resetIdle);
      window.removeEventListener("touchstart", resetIdle);
    };
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const updateScale = useCallback(() => {
    const scaleX = window.innerWidth / SLIDE_WIDTH;
    const scaleY = window.innerHeight / SLIDE_HEIGHT;
    setScale(Math.min(scaleX, scaleY));
  }, []);

  // Keep ref in sync for use in event handlers
  useEffect(() => {
    slideRef.current = currentSlide;
  }, [currentSlide]);

  // Broadcast slide changes to the presenter view
  useEffect(() => {
    window.location.hash = String(currentSlide + 1);
    const bc = new BroadcastChannel(PRESENTER_CHANNEL);
    bc.postMessage({ slide: currentSlide });
    bc.close();
  }, [currentSlide]);

  // Listen for slide changes from the presenter view
  useEffect(() => {
    const bc = new BroadcastChannel(PRESENTER_CHANNEL);
    bc.onmessage = (event) => {
      if (typeof event.data?.slide === "number") {
        setCurrentSlide(event.data.slide);
      }
    };
    return () => bc.close();
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentSlide(getSlideFromHash());
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === "ArrowLeft") {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      } else if (e.key === "s" || e.key === "S") {
        window.location.href = "/summary";
      } else if (e.key === "g" || e.key === "G") {
        window.open(
          `/presenter#${slideRef.current + 1}`,
          "presenter",
          "width=1200,height=800",
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleFullscreen]);

  useEffect(() => {
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [updateScale]);

  // Touch navigation: swipe and tap
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      const deltaY = e.changedTouches[0].clientY - touchStartY;

      // Only handle horizontal swipes (ignore vertical scroll attempts)
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX < 0) {
          setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
        } else {
          setCurrentSlide((prev) => Math.max(prev - 1, 0));
        }
        return;
      }

      // Tap zones: left 25% = back, right 25% = forward
      if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
        const tapX = e.changedTouches[0].clientX;
        const screenWidth = window.innerWidth;
        if (tapX < screenWidth * 0.25) {
          setCurrentSlide((prev) => Math.max(prev - 1, 0));
        } else if (tapX > screenWidth * 0.75) {
          setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const CurrentSlideComponent = slides[currentSlide].component;

  return (
    <div
      className={`w-full h-full flex items-center justify-center ${isFullscreen ? "bg-black" : "bg-cf-bg-page"}`}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        <CurrentSlideComponent />
      </div>

      {/* Fullscreen button */}
      {!isFullscreen && (
        <button
          onClick={toggleFullscreen}
          className={`fixed bottom-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${isIdle ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          title="Press 'F' to toggle fullscreen"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
          </svg>
          Present (F)
        </button>
      )}

      {/* Slide counter */}
      <div className="fixed bottom-4 left-4 z-50 text-sm font-medium px-3 py-1 rounded bg-black/10 text-black/50">
        {currentSlide + 1} / {slides.length}
      </div>

      {/* Summary link - hidden in fullscreen mode */}
      {!isFullscreen && (
        <a
          href="/summary"
          className="fixed top-4 right-4 z-50 bg-black/30 hover:bg-black/50 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
        >
          Summary (S)
        </a>
      )}
    </div>
  );
}

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const isSummary = currentPath === "/summary";
  const isPresenter = currentPath === "/presenter";

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Toggle summary mode on html, body, and root
  useEffect(() => {
    const targets = [
      document.documentElement,
      document.body,
      document.getElementById("root"),
    ];
    if (isSummary) {
      targets.forEach((el) => el?.classList.add("summary-mode"));
    } else {
      targets.forEach((el) => el?.classList.remove("summary-mode"));
    }
  }, [isSummary]);

  if (isPresenter) {
    return <PresenterView />;
  }

  if (isSummary) {
    return <Summary />;
  }

  return <Presentation />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
