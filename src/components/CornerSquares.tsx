interface CornerSquaresProps {
  size?: "sm" | "md";
  color?: string;
  className?: string;
}

export function CornerSquares({
  size = "md",
  color = "#EBD5C1",
  className = "",
}: CornerSquaresProps) {
  const cornerSize = size === "sm" ? 8 : 14;
  const borderRadius = size === "sm" ? "1.5px" : "3px";
  const offset = -cornerSize / 2;

  const corners = [
    { key: "top-left", top: offset, left: offset },
    { key: "top-right", top: offset, right: offset },
    { key: "bottom-left", bottom: offset, left: offset },
    { key: "bottom-right", bottom: offset, right: offset },
  ];

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-10 select-none ${className}`}
      aria-hidden="true"
    >
      {corners.map((position) => (
        <div
          key={position.key}
          className="absolute bg-[#fffbf5]"
          style={{
            top: position.top,
            left: position.left,
            right: position.right,
            bottom: position.bottom,
            width: cornerSize,
            height: cornerSize,
            border: `1px solid ${color}`,
            borderRadius,
          }}
        />
      ))}
    </div>
  );
}
