"use client";

import React from "react";
import LogoLoop, { LogoItem } from "./logo-loop";
import {
  SiPython,
  SiFigma,
  SiGithub,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss
} from "react-icons/si";

// SVG for Microsoft Excel
const ExcelIcon = () => (
  <svg className="w-8 h-8 text-neutral-400 group-hover:text-green-600 transition-colors" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.2 1.5H7.8C6.53 1.5 5.5 2.53 5.5 3.8v16.4c0 1.27 1.03 2.3 2.3 2.3h8.4c1.27 0 2.3-1.03 2.3-2.3V3.8c0-1.27-1.03-2.3-2.3-2.3zm.8 18.7c0 .44-.36.8-.8.8H7.8c-.44 0-.8-.36-.8-.8V3.8c0-.44.36-.8.8-.8h8.4c.44 0 .8.36.8.8v16.4z"/>
    <path d="M9.06 7l2.19 3.58L13.43 7h1.9l-3.15 4.88 3.27 5.12h-1.91l-2.32-3.83-2.33 3.83H7.16l3.39-5.14L7.33 7h1.73z"/>
  </svg>
);

// SVG for Visual Studio Code
const VSCodeIcon = () => (
  <svg className="w-8 h-8 text-neutral-400 group-hover:text-sky-500 transition-colors" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.985 6.809l-3.324-11.233-6.907 4.966-5.263-4.009-8.491 5.928v12.079l8.491 5.928 5.263-4.009 6.907 4.966 3.324-11.233zM3.462 16.923v-9.846l4.923 4.923zm10.769 4.308l-5.846-5.846 1.846-1.846 4 4zm0-6.154l-3.692-3.692 3.692-3.692 3.692 3.692zm0-6.769l-4 4-1.846-1.846 5.846-5.846zm7.231 8.615l-4.923 4.923v-9.846z"/>
  </svg>
);

export function TechStackCarousel() {
  const techLogos: LogoItem[] = [
    {
      node: <div className="flex items-center gap-2 text-neutral-400 group-hover:text-emerald-400 transition-colors group"><SiPython className="w-8 h-8" /><span className="text-sm font-semibold tracking-wider font-mono">Python</span></div>,
      title: "Python",
      href: "https://www.python.org"
    },
    {
      node: <div className="flex items-center gap-2 text-neutral-400 group-hover:text-green-500 transition-colors group"><ExcelIcon /><span className="text-sm font-semibold tracking-wider font-mono">xlwings & COM</span></div>,
      title: "xlwings & COM",
      href: "https://www.xlwings.org"
    },
    {
      node: <div className="flex items-center gap-2 text-neutral-400 group-hover:text-blue-500 transition-colors group"><SiTypescript className="w-8 h-8" /><span className="text-sm font-semibold tracking-wider font-mono">TypeScript</span></div>,
      title: "TypeScript",
      href: "https://www.typescriptlang.org"
    },
    {
      node: <div className="flex items-center gap-2 text-neutral-400 group-hover:text-cyan-400 transition-colors group"><SiReact className="w-8 h-8" /><span className="text-sm font-semibold tracking-wider font-mono">React</span></div>,
      title: "React",
      href: "https://react.dev"
    },
    {
      node: <div className="flex items-center gap-2 text-neutral-400 group-hover:text-white transition-colors group"><SiNextdotjs className="w-8 h-8" /><span className="text-sm font-semibold tracking-wider font-mono">Next.js</span></div>,
      title: "Next.js",
      href: "https://nextjs.org"
    },
    {
      node: <div className="flex items-center gap-2 text-neutral-400 group-hover:text-sky-400 transition-colors group"><SiTailwindcss className="w-8 h-8" /><span className="text-sm font-semibold tracking-wider font-mono">Tailwind CSS</span></div>,
      title: "Tailwind CSS",
      href: "https://tailwindcss.com"
    },
    {
      node: <div className="flex items-center gap-2 text-neutral-400 group-hover:text-orange-400 transition-colors group"><SiFigma className="w-8 h-8" /><span className="text-sm font-semibold tracking-wider font-mono">Figma</span></div>,
      title: "Figma",
      href: "https://figma.com"
    },
    {
      node: <div className="flex items-center gap-2 text-neutral-400 group-hover:text-sky-500 transition-colors group"><VSCodeIcon /><span className="text-sm font-semibold tracking-wider font-mono">VS Code</span></div>,
      title: "VS Code",
      href: "https://code.visualstudio.com"
    },
    {
      node: <div className="flex items-center gap-2 text-neutral-400 group-hover:text-neutral-200 transition-colors group"><SiGithub className="w-8 h-8" /><span className="text-sm font-semibold tracking-wider font-mono">GitHub</span></div>,
      title: "GitHub",
      href: "https://github.com"
    }
  ];

  return (
    <div className="w-full py-8 bg-neutral-950/20 border-y border-neutral-900/60 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 mb-3 flex flex-col md:flex-row md:items-center justify-between gap-2">
        <h4 className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-bold">
          Technology Stack & Toolkit
        </h4>
        <span className="text-[10px] text-neutral-600 font-mono">
          DIRECT MEMORY WIN32 PIPELINE
        </span>
      </div>
      <LogoLoop
        logos={techLogos}
        speed={45}
        direction="left"
        logoHeight={45}
        gap={80}
        scaleOnHover={true}
        fadeOut={true}
        fadeOutColor="var(--background)"
        ariaLabel="Technology stack and development tools"
      />
    </div>
  );
}
