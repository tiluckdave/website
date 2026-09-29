"use client";

import React, { useState, useEffect } from "react";

interface CollapsibleProps {
  title: string | React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export default function Collapsible({
  title,
  children,
  defaultOpen = false,
  className = "",
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isRoadRash =
    typeof title === "string" &&
    (/road/i.test(title) || /rash/i.test(title) || /game/i.test(title));

  useEffect(() => {
    setMounted(true);
    const mql = window.matchMedia("(min-width: 1100px)");
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  // On mobile screens (< 1100px), do not render the RoadRash collapsible at all
  if (isRoadRash && mounted && !isDesktop) {
    return null;
  }

  return (
    <div
      className={`collapsible-wrapper ${
        isRoadRash ? "collapsible-roadrash desktop-only" : ""
      } ${className}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="collapsible-trigger"
        aria-expanded={isOpen}
      >
        <span className={`collapsible-arrow ${isOpen ? "open" : ""}`}>▶</span>
        <span className="collapsible-title">{title}</span>
      </button>
      {isOpen && <div className="collapsible-content">{children}</div>}
    </div>
  );
}
