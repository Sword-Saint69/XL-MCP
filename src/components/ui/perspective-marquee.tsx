"use client";

import React, { useEffect, useState, useRef } from "react";

export interface PerspectiveMarqueeProps {
  items?: string[];
  fontSize?: number;
  color?: string;
  fontWeight?: number;
  pixelsPerFrame?: number;
  rotateY?: number;
  rotateX?: number;
  perspective?: number;
  fadeColor?: string;
  background?: string;
  speed?: number;
  className?: string;
}

const FONT_FAMILY =
  "var(--font-sans), -apple-system, BlinkMacSystemFont, sans-serif";

const DEFAULT_ITEMS = [
  "SUM",
  "VLOOKUP",
  "SORT",
  "FILTER",
  "CHART",
  "FORMAT",
  "RANGE",
  "COM",
  "PYTHON",
  "XLWINGS",
];

export function PerspectiveMarquee({
  items = DEFAULT_ITEMS,
  fontSize = 84,
  color = "#fafafa",
  fontWeight = 700,
  pixelsPerFrame = 2,
  rotateY = -28,
  rotateX = 8,
  perspective = 1200,
  fadeColor = "var(--background)",
  background = "transparent",
  speed = 1,
  className,
}: PerspectiveMarqueeProps) {
  const [frame, setFrame] = useState(0);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1280);

  useEffect(() => {
    let animationId: number;
    const tick = () => {
      setFrame((prev) => prev + 1);
      animationId = requestAnimationFrame(tick);
    };
    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Dynamically measure container width to calculate screen center perfectly
  useEffect(() => {
    if (!marqueeRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    resizeObserver.observe(marqueeRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const currentFrame = frame * speed;
  const itemPadding = fontSize * 1.2; // Extra padding for larger dynamic scale space
  
  // Calculate item width dynamically
  const approxItemWidth = items.reduce(
    (acc, item) => acc + item.length * fontSize * 0.6 + itemPadding,
    0,
  );

  const offset = -((currentFrame * pixelsPerFrame) % approxItemWidth);
  const rendered = [...items, ...items, ...items];
  const centerOfScreen = containerWidth / 2;

  return (
    <div
      ref={marqueeRef}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "300px",
        background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        perspective: `${perspective}px`,
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            transform: `translateX(${offset}px)`,
            transformStyle: "preserve-3d",
          }}
        >
          {rendered.map((item, i) => {
            const itemCenter =
              i * (approxItemWidth / items.length) +
              approxItemWidth / items.length / 2 +
              offset;
            
            // Normalize distance based on actual container center
            const norm = (itemCenter - centerOfScreen) / centerOfScreen;
            const distance = Math.min(1, Math.abs(norm));
            
            // High-contrast highlighting parameters
            const blurPx = distance * 10;
            const opacity = 1 - Math.pow(distance, 1.4) * 0.85; // Drop side text opacity to ~15%
            const scale = 1.25 - distance * 0.25; // Scale center word up to 1.25x

            // Interpolate color towards pure white in the center
            const displayColor = distance < 0.2 
              ? "#ffffff" 
              : color;

            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  fontFamily: FONT_FAMILY,
                  fontSize,
                  fontWeight,
                  color: displayColor,
                  letterSpacing: "-0.03em",
                  paddingRight: itemPadding,
                  filter: `blur(${blurPx}px)`,
                  opacity,
                  transform: `scale3d(${scale}, ${scale}, 1)`,
                  transformStyle: "preserve-3d",
                  transition: "color 0.2s ease, filter 0.1s ease",
                  willChange: "transform, opacity, filter",
                }}
              >
                {item}
              </span>
            );
          })}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `linear-gradient(90deg, ${fadeColor} 0%, transparent 22%, transparent 78%, ${fadeColor} 100%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `linear-gradient(180deg, ${fadeColor} 0%, transparent 25%, transparent 75%, ${fadeColor} 100%)`,
        }}
      />
    </div>
  );
}
