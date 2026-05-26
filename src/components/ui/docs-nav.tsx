"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, BookOpen, GitCommitHorizontal } from "lucide-react";

export function DocsNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/docs", label: "Documentation", icon: <BookOpen className="w-4 h-4" /> },
    { href: "/changelog", label: "Changelog", icon: <GitCommitHorizontal className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/10 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          <Link
            href="/"
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm font-medium border border-neutral-800 rounded-full px-4 py-1.5 bg-neutral-950/50 hover:bg-neutral-900/50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <span className="text-neutral-700 hidden sm:block">|</span>
          <div className="flex items-center gap-2">
            <span className="text-white font-black tracking-tight text-lg">XL.MCP</span>
            <span className="text-xs uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md font-mono font-semibold">v0.0.1</span>
          </div>
          <div className="hidden sm:flex items-center gap-1 ml-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  pathname === item.href
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-900/40 border border-transparent"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View on GitHub"
          className="flex items-center gap-2 text-neutral-500 hover:text-white transition-all duration-200 border border-neutral-800 rounded-full px-3 py-1.5 bg-neutral-950/50 hover:bg-neutral-900/60 hover:border-neutral-700"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
          </svg>
          <span className="text-[11px] font-semibold tracking-wider font-mono">GitHub</span>
        </a>
      </div>
    </header>
  );
}
