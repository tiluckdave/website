"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

export interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
}

interface LightboxItem {
  src: string;
  alt: string;
  caption?: string;
}

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function Lightbox({
  items,
  initialIndex,
  onClose,
}: {
  items: LightboxItem[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);

  const prev = useCallback(() => {
    setIndex((prevIdx) => (prevIdx === 0 ? items.length - 1 : prevIdx - 1));
  }, [items.length]);

  const next = useCallback(() => {
    setIndex((prevIdx) => (prevIdx === items.length - 1 ? 0 : prevIdx + 1));
  }, [items.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        prev();
      } else if (e.key === "ArrowRight") {
        next();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose, prev, next]);

  const currentItem = items[index] || items[0];

  return (
    <div
      className="figure-lightbox-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery fullscreen view"
    >
      <div className="figure-lightbox-header">
        {items.length > 1 ? (
          <div className="figure-lightbox-counter">
            {index + 1} / {items.length}
          </div>
        ) : (
          <div />
        )}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="figure-lightbox-close-btn"
          aria-label="Close fullscreen view"
          title="Close (Esc)"
        >
          <CloseIcon />
        </button>
      </div>

      {items.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          className="figure-lightbox-nav-btn figure-lightbox-prev"
          aria-label="Previous image"
          title="Previous (Left arrow)"
        >
          <ChevronLeftIcon />
        </button>
      )}

      <div
        className="figure-lightbox-main"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentItem.src}
          alt={currentItem.alt}
          className="figure-lightbox-img"
        />
        {currentItem.caption && (
          <figcaption className="figure-lightbox-caption">
            {currentItem.caption}
          </figcaption>
        )}
      </div>

      {items.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          className="figure-lightbox-nav-btn figure-lightbox-next"
          aria-label="Next image"
          title="Next (Right arrow)"
        >
          <ChevronRightIcon />
        </button>
      )}
    </div>
  );
}

export function Figure({
  src,
  alt,
  caption,
  width,
  height,
  className = "",
}: FigureProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [galleryItems, setGalleryItems] = useState<LightboxItem[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpen = () => {
    if (typeof document === "undefined") return;

    // Collect all figure images on current page in DOM order
    const figureElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-figure-src]")
    );

    const items: LightboxItem[] = figureElements.map((el) => ({
      src: el.getAttribute("data-figure-src") || "",
      alt: el.getAttribute("data-figure-alt") || "",
      caption: el.getAttribute("data-figure-caption") || undefined,
    }));

    // Find current index
    const foundIdx = items.findIndex((item) => item.src === src);
    const activeIdx = foundIdx !== -1 ? foundIdx : 0;

    setGalleryItems(items.length > 0 ? items : [{ src, alt, caption }]);
    setStartIndex(activeIdx);
    setLightboxOpen(true);
  };

  const computedWidth =
    typeof width === "number" ? `${width}px` : width || "100%";

  return (
    <>
      <figure
        className={`figure-container ${className}`}
        style={{
          width: computedWidth,
          maxWidth: "100%",
        }}
      >
        <div
          className="figure-img-wrapper"
          onClick={handleOpen}
          data-figure-src={src}
          data-figure-alt={alt}
          data-figure-caption={caption || ""}
          title="Click to view full screen"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleOpen();
            }
          }}
        >
          <img
            src={src}
            alt={alt}
            className="figure-img"
            loading="lazy"
          />
        </div>
        {caption && <figcaption className="figure-caption">{caption}</figcaption>}
      </figure>

      {lightboxOpen &&
        mounted &&
        createPortal(
          <Lightbox
            items={galleryItems}
            initialIndex={startIndex}
            onClose={() => setLightboxOpen(false)}
          />,
          document.body
        )}
    </>
  );
}

export default Figure;
