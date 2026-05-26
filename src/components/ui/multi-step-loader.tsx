"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

export interface LoadingState {
  text: string;
}

export const MultiStepLoader = ({
  loadingStates,
  loading,
  duration = 2000,
  loop = true,
}: {
  loadingStates: LoadingState[];
  loading?: boolean;
  duration?: number;
  loop?: boolean;
}) => {
  const [currentState, setCurrentState] = useState(0);

  useEffect(() => {
    if (!loading) {
      setCurrentState(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentState((prev) => {
        if (prev === loadingStates.length - 1) {
          if (loop) {
            return 0;
          }
          return prev;
        }
        return prev + 1;
      });
    }, duration);

    return () => clearInterval(interval);
  }, [loading, loadingStates.length, duration, loop]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md"
        >
          <div className="relative max-w-md w-full px-6 flex flex-col justify-center">
            {loadingStates.map((state, index) => {
              const isActive = index === currentState;
              const isPast = index < currentState;

              return (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: isActive ? 1 : isPast ? 0.6 : 0.2 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-4 py-3 text-left font-sans"
                >
                  <div className="flex items-center justify-center w-6 h-6">
                    {isPast ? (
                      <svg
                        className="w-5 h-5 text-emerald-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : isActive ? (
                      <div className="w-3.5 h-3.5 rounded-full bg-blue-500 animate-ping" />
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-lg font-medium tracking-tight",
                      isActive
                        ? "text-white"
                        : isPast
                        ? "text-neutral-400 line-through decoration-neutral-500/50"
                        : "text-neutral-600"
                    )}
                  >
                    {state.text}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
