"use client";

import { useState, Children } from "react";

interface CodeTabsUIProps {
  tabs: string[];
  children: React.ReactNode;
}

export default function CodeTabsUI({ tabs, children }: CodeTabsUIProps) {
  const [activeTab, setActiveTab] = useState(0);
  const childArray = Children.toArray(children);

  return (
    <div style={{ margin: "24px 0" }}>
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid var(--border)",
          background: "var(--bg-code)",
          borderRadius: "0.5rem 0.5rem 0 0",
          overflow: "hidden",
        }}
      >
        {tabs.map((label, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            style={{
              padding: "8px 16px",
              fontSize: "13px",
              fontFamily: "var(--font-mono)",
              background: "transparent",
              border: "none",
              borderBottom: activeTab === i ? `2px solid var(--accent)` : "2px solid transparent",
              color: activeTab === i ? "var(--text-primary)" : "var(--text-muted)",
              cursor: "pointer",
              marginBottom: "-1px",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="codetabs-content">
        {childArray.map((child, i) => (
          <div key={i} style={{ display: activeTab === i ? "block" : "none" }}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
