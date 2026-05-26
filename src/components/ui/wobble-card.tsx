"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BorderBeam } from "./border-beam";

export const WobbleCard = ({
  children,
  containerClassName,
  className,
}: {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY, currentTarget } = event;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / 20;
    const y = (clientY - top - height / 2) / 20;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.section
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovering
          ? `rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg) scale3d(1.01, 1.01, 1.01)`
          : "rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)",
        transition: isHovering ? "none" : "all 0.5s ease",
      }}
      className={cn(
        "mx-auto w-full bg-neutral-900 relative rounded-2xl overflow-hidden [perspective:1000px] [transform-style:preserve-3d]",
        containerClassName
      )}
    >
      {/* Border beam follows the border boundary on hover */}
      {isHovering && (
        <BorderBeam 
          duration={5} 
          size={160} 
          colorFrom="#10b981" 
          colorTo="#3b82f6" 
          borderWidth={1.5}
        />
      )}

      <div
        className="h-full px-6 py-12 sm:px-10"
        style={{
          transform: "translateZ(80px) scale(0.95)",
        }}
      >
        <div className={cn("h-full", className)}>{children}</div>
      </div>
    </motion.section>
  );
};
