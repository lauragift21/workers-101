import type { ReactNode } from "react";

// Twitter optimal image size: 1200x675 (16:9)
export const SLIDE_WIDTH = 1200;
export const SLIDE_HEIGHT = 675;

interface SlideFrameProps {
  children: ReactNode;
  className?: string;
}

export function SlideFrame({ children, className = "" }: SlideFrameProps) {
  return (
    <div
      data-slide-container
      className={`relative bg-cf-bg-content overflow-hidden ${className}`}
      style={{
        width: SLIDE_WIDTH,
        height: SLIDE_HEIGHT,
      }}
    >
      {children}
    </div>
  );
}
