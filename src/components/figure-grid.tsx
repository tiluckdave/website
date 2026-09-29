import React from "react";

export interface FigureGridProps {
  children: React.ReactNode;
  columns?: number;
  ratio?: string;
  align?: "center" | "start" | "end" | "stretch";
  gap?: number | string;
  caption?: string;
  className?: string;
}

export function FigureGrid({
  children,
  columns,
  ratio,
  align = "center",
  gap = 36,
  caption,
  className = "",
}: FigureGridProps) {
  let gridTemplateColumns: string | undefined = undefined;

  if (ratio) {
    // Parse ratios like "2:1", "3:2", "60:40", "1:1"
    const parts = ratio.split(":").map((p) => p.trim());
    if (parts.length > 1 && parts.every((p) => !isNaN(Number(p)))) {
      gridTemplateColumns = parts.map((p) => `${p}fr`).join(" ");
    } else {
      gridTemplateColumns = ratio;
    }
  } else if (columns) {
    gridTemplateColumns = `repeat(${columns}, 1fr)`;
  } else {
    // Default to 2 columns if not specified
    const childCount = React.Children.count(children);
    gridTemplateColumns = `repeat(${Math.min(childCount || 2, 2)}, 1fr)`;
  }

  const computedGap = typeof gap === "number" ? `${gap}px` : gap;

  return (
    <div className={`figure-grid-wrapper ${className}`.trim()}>
      <div
        className="figure-grid"
        style={{
          gridTemplateColumns,
          gap: computedGap,
          alignItems: align,
        }}
      >
        {children}
      </div>
      {caption && <div className="figure-grid-caption">{caption}</div>}
    </div>
  );
}

export const FigureGroup = FigureGrid;
export default FigureGrid;
