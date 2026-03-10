"use client";

import { useState } from "react";

interface CodeBlockProps {
  children: string;
  className?: string;
}

// PRD Section 4.4 — Copy button appears on hover, top-right
export default function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(children).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div style={{ position: "relative" }} className="group">
      <pre className={className}>
        <code>{children}</code>
      </pre>
      <button
        onClick={handleCopy}
        aria-label="Copy code"
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          background: "var(--bg-primary)",
          color: "var(--text-secondary)",
          border: "1px solid var(--border)",
          padding: "4px 8px",
          fontSize: "12px",
          cursor: "pointer",
          opacity: 0,
          transition: "opacity 0.1s",
          fontFamily: "var(--font-mono)",
        }}
        className="group-hover:opacity-100"
      >
        {copied ? "copied" : "copy"}
      </button>
    </div>
  );
}
