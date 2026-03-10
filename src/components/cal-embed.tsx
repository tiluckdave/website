"use client";

import { useEffect } from "react";

// PRD Section 7.3 — Cal.com embed wrapper (vanilla JS approach for compatibility)
// Uses @calcom/embed-core script tag approach
export default function CalEmbed() {
  useEffect(() => {
    type CalFunction = {
      (...args: unknown[]): void;
      loaded?: boolean;
      ns?: Record<string, unknown>;
      q?: unknown[];
    };

    const w = window as typeof window & { Cal?: CalFunction };

    if (!w.Cal) {
      const script = document.createElement("script");
      script.src = "https://app.cal.com/embed/embed.js";
      document.head.appendChild(script);

      w.Cal = function (...args: unknown[]) {
        (w.Cal!.q = w.Cal!.q || []).push(args);
      } as CalFunction;
    }

    const Cal = w.Cal!;

    Cal("init", { origin: "https://cal.com" });

    Cal("inline", {
      elementOrSelector: "#cal-embed",
      // TILAK: Replace with your Cal.com username/event-slug
      calLink: "tiluckdave/discovery",
      config: {
        layout: "month_view",
        theme: "auto",
        brandColor: "#B08A57",
      },
    });

    Cal("ui", {
      styles: { branding: { brandColor: "#B08A57" } },
      hideEventTypeDetails: false,
    });
  }, []);

  return (
    <div
      id="cal-embed"
      style={{
        width: "100%",
        minHeight: "500px",
        overflow: "scroll",
      }}
    />
  );
}
