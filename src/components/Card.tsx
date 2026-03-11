import { CornerSquares } from "./CornerSquares";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  corners?: boolean;
  cornerSize?: "sm" | "md";
  cornerColor?: string;
  variant?: "default" | "orange";
}

export function Card({
  children,
  className = "",
  corners = true,
  cornerSize = "md",
  cornerColor,
  variant = "default",
}: CardProps) {
  const baseStyles = "relative rounded-lg overflow-visible";
  const variantStyles = {
    default: "bg-cf-bg-200 border border-cf-border",
    orange: "bg-cf-orange border border-cf-orange",
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {corners && (
        <CornerSquares
          size={cornerSize}
          color={
            cornerColor || (variant === "orange" ? "#ffffff40" : "#EBD5C1")
          }
        />
      )}
      {children}
    </div>
  );
}
