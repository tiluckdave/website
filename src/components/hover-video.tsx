"use client";

import { useRef, useState, useEffect } from "react";

interface HoverVideoProps {
  posterSrc?: string;
  videoSrc?: string;
  alt?: string;
  className?: string;
}

export default function HoverVideo({
  posterSrc = "/images/home-poster.jpg",
  videoSrc = "/images/home-animation.mp4",
  alt = "Illustration animation",
  className = "",
}: HoverVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isHovered = useRef(false);
  const [blink, setBlink] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const play = () => {
    isHovered.current = true;
    videoRef.current?.play().catch(() => {});
  };

  const onEnded = () => {
    setBlink(true);
    timer.current = setTimeout(() => {
      const v = videoRef.current;
      if (!v) return;
      v.currentTime = 0;
      if (isHovered.current) v.play().catch(() => {});
      else v.pause();

      timer.current = setTimeout(() => setBlink(false), 90);
    }, 90);
  };

  return (
    <div
      className={`home-artwork-wrapper ${className}`}
      onMouseEnter={play}
      onMouseLeave={() => { isHovered.current = false; }}
      onClick={() => {
        const v = videoRef.current;
        if (v?.paused) {
          isHovered.current = false;
          v.play().catch(() => {});
        }
      }}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        poster={posterSrc}
        preload="metadata"
        muted
        playsInline
        disablePictureInPicture
        disableRemotePlayback
        onEnded={onEnded}
        aria-label={alt}
        className={`home-artwork-image${blink ? " home-artwork-image--blink" : ""}`}
      />
    </div>
  );
}
