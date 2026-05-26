"use client";

import React, { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export interface LogoItem {
  node?: React.ReactNode;
  src?: string;
  alt?: string;
  title?: string;
  href?: string;
}

interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number; // duration in seconds
  direction?: "left" | "right" | "up" | "down";
  logoHeight?: number;
  gap?: number;
  hoverSpeed?: number;
  scaleOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  ariaLabel?: string;
  useCustomRender?: boolean;
}

export default function LogoLoop({
  logos,
  speed = 40,
  direction = "left",
  logoHeight = 40,
  gap = 60,
  scaleOnHover = true,
  fadeOut = true,
  fadeOutColor = "var(--background)",
  ariaLabel = "Technology partners & tools",
}: LogoLoopProps) {
  // Triple the list to ensure seamless looping without whitespace gaps
  const doubledLogos = [...logos, ...logos, ...logos];

  const containerStyle: CSSProperties = {
    "--gap": `${gap}px`,
    "--speed": `${speed}s`,
    "--height": `${logoHeight}px`,
  } as CSSProperties;

  const isVertical = direction === "up" || direction === "down";

  return (
    <div
      role="region"
      aria-label={ariaLabel}
      className={cn(
        "relative w-full overflow-hidden flex",
        isVertical ? "flex-col h-full py-4" : "flex-row items-center py-6"
      )}
      style={containerStyle}
    >
      {/* CSS Styles for custom animations and variable-based loops */}
      <style jsx global>{`
        @keyframes loop-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        @keyframes loop-right {
          0% { transform: translateX(-33.3333%); }
          100% { transform: translateX(0); }
        }
        @keyframes loop-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-33.3333%); }
        }
        @keyframes loop-down {
          0% { transform: translateY(-33.3333%); }
          100% { transform: translateY(0); }
        }

        .logo-loop-track-horizontal {
          display: flex;
          width: max-content;
          gap: var(--gap);
          animation: loop-left var(--speed) linear infinite;
        }

        .logo-loop-track-horizontal.dir-right {
          animation-name: loop-right;
        }

        .logo-loop-track-vertical {
          display: flex;
          flex-direction: column;
          height: max-content;
          gap: var(--gap);
          animation: loop-up var(--speed) linear infinite;
        }

        .logo-loop-track-vertical.dir-down {
          animation-name: loop-down;
        }

        /* Hover pauses / slows animation */
        .logo-loop-container:hover .logo-loop-track {
          animation-play-state: paused;
        }
      `}</style>

      {/* Main Track Wrapper */}
      <div
        className={cn(
          "logo-loop-container flex w-full h-full",
          isVertical ? "flex-col justify-center" : "items-center"
        )}
      >
        <div
          className={cn(
            "logo-loop-track",
            isVertical
              ? cn(
                  "logo-loop-track-vertical",
                  direction === "down" && "dir-down"
                )
              : cn(
                  "logo-loop-track-horizontal",
                  direction === "right" && "dir-right"
                )
          )}
        >
          {doubledLogos.map((logo, idx) => {
            const content = logo.node ? (
              logo.node
            ) : logo.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logo.src}
                alt={logo.alt || logo.title || "Logo"}
                style={{ height: `${logoHeight}px` }}
                className="object-contain"
              />
            ) : null;

            const element = logo.href ? (
              <a
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                title={logo.title}
                className={cn(
                  "flex items-center justify-center transition-all duration-300 select-none cursor-pointer",
                  scaleOnHover && "hover:scale-110 hover:text-white"
                )}
                style={{ height: `${logoHeight}px` }}
              >
                {content}
              </a>
            ) : (
              <div
                title={logo.title}
                className={cn(
                  "flex items-center justify-center transition-all duration-300 select-none",
                  scaleOnHover && "hover:scale-110 hover:text-white"
                )}
                style={{ height: `${logoHeight}px` }}
              >
                {content}
              </div>
            );

            return (
              <div
                key={idx}
                className="flex items-center justify-center"
                style={isVertical ? { height: `${logoHeight}px` } : undefined}
              >
                {element}
              </div>
            );
          })}
        </div>
      </div>

      {/* Fade Gradients */}
      {fadeOut && !isVertical && (
        <>
          <div
            className="absolute top-0 left-0 bottom-0 w-24 pointer-events-none z-10"
            style={{
              background: `linear-gradient(to right, ${fadeOutColor}, transparent)`,
            }}
          />
          <div
            className="absolute top-0 right-0 bottom-0 w-24 pointer-events-none z-10"
            style={{
              background: `linear-gradient(to left, ${fadeOutColor}, transparent)`,
            }}
          />
        </>
      )}

      {fadeOut && isVertical && (
        <>
          <div
            className="absolute top-0 left-0 right-0 h-16 pointer-events-none z-10"
            style={{
              background: `linear-gradient(to bottom, ${fadeOutColor}, transparent)`,
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-10"
            style={{
              background: `linear-gradient(to top, ${fadeOutColor}, transparent)`,
            }}
          />
        </>
      )}
    </div>
  );
}
