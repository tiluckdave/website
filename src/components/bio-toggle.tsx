"use client";

import { useState, useEffect, Suspense, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";

interface BioToggleProps {
  defaultBio?: ReactNode;
  longBio?: ReactNode;
}

function BioToggleInner({ defaultBio, longBio }: BioToggleProps) {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"default" | "long">("default");

  useEffect(() => {
    const tabParam = searchParams?.get("bio") || searchParams?.get("tab");
    const hash = typeof window !== "undefined" ? window.location.hash : "";

    if (
      tabParam === "long" ||
      hash.includes("long") ||
      hash.includes("road") ||
      hash.includes("pune") ||
      hash.includes("taught") ||
      hash.includes("hackathon") ||
      hash.includes("tedx") ||
      hash.includes("experience") ||
      hash.includes("work") ||
      hash.includes("sides") ||
      hash.includes("chasing") ||
      hash.includes("belief") ||
      hash.includes("right-now")
    ) {
      setMode("long");
      if (tabParam && typeof window !== "undefined") {
        window.history.replaceState(null, "", window.location.pathname + window.location.hash);
      }
      if (hash && hash !== "#long") {
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else if (hash === "#long" && typeof window !== "undefined") {
        window.history.replaceState(null, "", window.location.pathname);
      }
    } else if (tabParam === "default") {
      setMode("default");
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", window.location.pathname);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        setMode("long");
        if (hash !== "#long") {
          setTimeout(() => {
            const el = document.querySelector(hash);
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }, 100);
        } else if (typeof window !== "undefined") {
          window.history.replaceState(null, "", window.location.pathname);
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleTabChange = (newMode: "default" | "long") => {
    setMode(newMode);
    if (typeof window !== "undefined" && window.location.search) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + (newMode === "long" ? window.location.hash : "")
      );
    }
  };

  return (
    <section className="bio-section">
      <div className="bio-tabs-header">
        <span className="bio-tab-label">Bio</span>
        <div className="bio-tabs-group" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={mode === "default"}
            onClick={() => handleTabChange("default")}
            className={`bio-tab-btn ${
              mode === "default" ? "bio-tab-btn--active" : ""
            }`}
          >
            Default
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "long"}
            onClick={() => handleTabChange("long")}
            className={`bio-tab-btn ${
              mode === "long" ? "bio-tab-btn--active" : ""
            }`}
          >
            Long
          </button>
        </div>
      </div>

      <div className="bio-text">
        {mode === "default" ? defaultBio : longBio}
      </div>
    </section>
  );
}

export default function BioToggle(props: BioToggleProps) {
  return (
    <Suspense fallback={null}>
      <BioToggleInner {...props} />
    </Suspense>
  );
}
