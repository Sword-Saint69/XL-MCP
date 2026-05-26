"use client";

import React from "react";
import { AnimatedList } from "./animated-list";
import { cn } from "@/lib/utils";

interface AnnouncementItem {
  title: string;
  description: string;
  time: string;
  tag: string;
  tagColor: string;
}

const ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    title: "XL.MCP v1.0.0 Release",
    description: "Version 1.0.0 is dropping soon with enhanced multi-workbook operations and native speed upgrades.",
    time: "2 hours ago",
    tag: "Upcoming",
    tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
  },
  {
    title: "Claude Desktop Integration",
    description: "Official configuration instructions for Claude Desktop are now live on our GitHub repository.",
    time: "1 day ago",
    tag: "Update",
    tagColor: "bg-blue-500/10 text-blue-400 border-blue-500/20"
  },
  {
    title: "COM Speed Benchmark",
    description: "Achieved a 45% latency reduction in bulk styling and formula compilation loops.",
    time: "3 days ago",
    tag: "Benchmark",
    tagColor: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
  }
];

function AnnouncementCard({ title, description, time, tag, tagColor }: AnnouncementItem) {
  return (
    <div className="w-full max-w-xl mx-auto p-5 rounded-2xl bg-zinc-950/80 border border-neutral-800 backdrop-blur-md flex flex-col gap-2 transition-all duration-300 hover:border-neutral-700">
      <div className="flex items-center justify-between gap-4">
        <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-semibold border", tagColor)}>
          {tag}
        </span>
        <span className="text-xs text-neutral-500">{time}</span>
      </div>
      <h4 className="text-white text-lg font-bold tracking-tight">{title}</h4>
      <p className="text-neutral-400 text-sm font-light leading-relaxed">{description}</p>
    </div>
  );
}

export function Announcements() {
  return (
    <section className="py-20 px-4 max-w-3xl mx-auto w-full relative z-20 bg-background text-foreground">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-2 text-silver-matte bg-clip-text">
          Latest Logs & Announcements
        </h2>
        <p className="text-muted-foreground text-sm font-light">
          Stay updated with current releases, performance benchmarks, and feature roadmaps.
        </p>
      </div>

      <div className="w-full min-h-[380px]">
        <AnimatedList delay={2500}>
          {ANNOUNCEMENTS.map((item, index) => (
            <AnnouncementCard key={index} {...item} />
          ))}
        </AnimatedList>
      </div>
    </section>
  );
}
