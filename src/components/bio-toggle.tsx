"use client";

import { useState, useEffect, Suspense, type ReactNode } from "react";
import { useSearchParams, usePathname } from "next/navigation";

interface BioToggleProps {
  defaultBio?: ReactNode;
  longBio?: ReactNode;
}

function BioToggleInner({ defaultBio, longBio }: BioToggleProps) {
  const searchParams = useSearchParams();
  const currentPathname = usePathname();
  const [mode, setMode] = useState<"default" | "long">("default");

  useEffect(() => {
    const tabParam = searchParams?.get("bio") || searchParams?.get("tab");
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const pathname = currentPathname || (typeof window !== "undefined" ? window.location.pathname : "");

    if (
      tabParam === "long" ||
      pathname.includes("who-am-i") ||
      pathname === "/about" ||
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
      if (tabParam && typeof window !== "undefined" && !pathname.includes("who-am-i")) {
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
  }, [searchParams, currentPathname]);



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
        <div
          className={`bio-content-default ${
            mode === "long" ? "bio-content--hidden" : ""
          }`}
          data-bio-mode="default"
          aria-hidden={mode !== "default"}
        >
          {defaultBio}
        </div>
        <div
          className={`bio-content-long ${
            mode === "default" ? "bio-content--hidden" : ""
          }`}
          data-bio-mode="long"
          aria-hidden={mode !== "long"}
        >
          {longBio}
        </div>
      </div>
    </section>
  );
}

export default function BioToggle(props: BioToggleProps) {
  return (
    <Suspense
      fallback={
        <section className="bio-section">
          <div className="bio-tabs-header">
            <span className="bio-tab-label">Bio</span>
            <div className="bio-tabs-group" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={true}
                className="bio-tab-btn bio-tab-btn--active"
              >
                Default
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={false}
                className="bio-tab-btn "
              >
                Long
              </button>
            </div>
          </div>

          <div className="bio-text">
            <div
              className="bio-content-default "
              data-bio-mode="default"
              aria-hidden={false}
            >
              {props.defaultBio}
            </div>
            <div
              className="bio-content-long bio-content--hidden"
              data-bio-mode="long"
              aria-hidden={true}
            >
              {props.longBio}
            </div>
          </div>
        </section>
      }
    >
      <BioToggleInner {...props} />
    </Suspense>
  );
}


