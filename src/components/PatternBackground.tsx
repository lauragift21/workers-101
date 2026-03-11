interface PatternBackgroundProps {
  className?: string;
}

export function PatternBackground({ className = "" }: PatternBackgroundProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle, rgba(82, 16, 0, 0.15) 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
      }}
      aria-hidden="true"
    />
  );
}
