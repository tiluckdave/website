"use client";

import React, { useState } from "react";

function PlayIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      aria-hidden="true"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}

function RotateCcwIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

function MaximizeIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
    </svg>
  );
}

function MinimizeIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
    </svg>
  );
}

export default function RoadRash() {
  const [hasStarted, setHasStarted] = useState(false);
  const [gameKey, setGameKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const reloadGame = () => {
    if (!hasStarted) {
      setHasStarted(true);
    } else {
      setGameKey((prev) => prev + 1);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      className={`road-rash-direct-container ${
        isFullscreen ? "road-rash-fullscreen-mode" : ""
      }`}
    >
      <div className="road-rash-viewport">
        {!hasStarted ? (
          <div className="road-rash-start-overlay">
            <button
              type="button"
              onClick={() => setHasStarted(true)}
              className="road-rash-start-center-btn"
            >
              <PlayIcon />
              <span>Start Game</span>
            </button>
          </div>
        ) : (
          <iframe
            key={gameKey}
            src={`/games/roadrash/index.html?v=${gameKey}_3`}
            className="road-rash-game-iframe"
            allow="autoplay; fullscreen; gamepad; focus-without-user-activation"
            allowFullScreen
            loading="lazy"
            scrolling="no"
            title="RoadRash Arcade Game"
          />
        )}
      </div>

      <div className="road-rash-controls-bar">
        <div className="road-rash-ctrl-group">
          <span className="road-rash-ctrl-tag">Steer / Move</span>
          <span className="road-rash-ctrl-key">Arrows</span>
        </div>
        <div className="road-rash-ctrl-group">
          <span className="road-rash-ctrl-tag">Punch</span>
          <span className="road-rash-ctrl-key">C</span>
        </div>
        <div className="road-rash-ctrl-group">
          <span className="road-rash-ctrl-tag">Kick</span>
          <span className="road-rash-ctrl-key">X</span>
        </div>
        <div className="road-rash-ctrl-actions">
          <button
            type="button"
            onClick={reloadGame}
            className="road-rash-action-btn"
            title="Restart Game"
          >
            <RotateCcwIcon />
            <span>Restart</span>
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            className="road-rash-action-btn"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? (
              <>
                <MinimizeIcon />
                <span>Exit</span>
              </>
            ) : (
              <>
                <MaximizeIcon />
                <span>Fullscreen</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="road-rash-credit-line">
        Originally built by{" "}
        <a
          href="https://github.com/nicolasbize/roadkill"
          target="_blank"
          rel="noopener noreferrer"
          className="road-rash-author-link"
        >
          Nicolas Bize
        </a>
      </div>
    </div>
  );
}


