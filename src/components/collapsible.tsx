"use client";

import React, { useState } from "react";

interface CollapsibleProps {
  title: string | React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function Collapsible({
  title,
  children,
  defaultOpen = false,
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="collapsible-wrapper">
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
