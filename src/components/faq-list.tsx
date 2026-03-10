"use client";

import { useState } from "react";

interface Faq {
  q: string;
  a: string;
}

export default function FaqList({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ background: "var(--bg-secondary)", borderRadius: "8px", overflow: "hidden" }}>
      {faqs.map((faq, i) => (
        <div key={i} style={{ borderBottom: i < faqs.length - 1 ? "1px solid var(--border)" : "none" }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: "100%",
              textAlign: "left",
              background: "transparent",
              border: "none",
              padding: "16px 20px",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "15px",
              fontWeight: 500,
              color: "var(--text-primary)",
              fontFamily: "var(--font-sans)",
              gap: "12px",
            }}
            aria-expanded={open === i}
          >
            <span>{faq.q}</span>
            <span
              style={{
                fontSize: "20px",
                color: "var(--accent)",
                flexShrink: 0,
                lineHeight: 1,
              }}
            >
              {open === i ? "−" : "+"}
            </span>
          </button>
          {open === i && (
            <div
              style={{
                padding: "0 20px 16px",
                color: "var(--text-secondary)",
                fontSize: "15px",
                lineHeight: 1.7,
              }}
            >
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
