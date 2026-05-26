"use client";

import React from "react";
import { DocsNav } from "@/components/ui/docs-nav";
import { ArrowUpRight, CheckCircle, AlertCircle, Wrench } from "lucide-react";

interface Release {
  version: string;
  date: string;
  tag: "major" | "minor" | "patch" | "alpha";
  summary: string;
  added?: string[];
  changed?: string[];
  fixed?: string[];
  breaking?: string[];
}

const RELEASES: Release[] = [
  {
    version: "0.0.1",
    date: "2025-12-01",
    tag: "patch",
    summary: "Project started. Repository initialised, concept validated.",
    added: [
      "Repository created",
      "Initial project structure and README",
      "Proof-of-concept: Python script opens Excel via win32com dispatch",
    ],
  },
];

const TAG_STYLES: Record<Release["tag"], string> = {
  major: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  minor: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  patch: "bg-neutral-800 text-neutral-400 border-neutral-700",
  alpha: "bg-purple-500/15 text-purple-400 border-purple-500/30",
};

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white/10 relative">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.03)_0%,transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-50" />

      <DocsNav />

      <div className="max-w-3xl mx-auto px-4 md:px-6 mt-14 pb-28">
        {/* Hero */}
        <div className="mb-14">
          <span className="text-xs font-mono text-purple-500 uppercase tracking-widest">Release History</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mt-2 leading-none">Changelog</h1>
          <p className="text-neutral-400 font-light text-lg mt-3 leading-relaxed">
            Every release, every change — in one place. Follow{" "}
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline inline-flex items-center gap-0.5">
              GitHub releases <ArrowUpRight className="w-3.5 h-3.5" />
            </a>{" "}
            for automated notifications.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[11px] top-2 bottom-0 w-px bg-neutral-900" />

          <div className="space-y-12">
            {RELEASES.map((release) => (
              <div key={release.version} className="relative pl-8">
                {/* Dot */}
                <div className={`absolute left-0 top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  release.tag === "major"
                    ? "border-emerald-500 bg-emerald-500/20"
                    : release.tag === "alpha"
                    ? "border-purple-500 bg-purple-500/20"
                    : "border-neutral-700 bg-neutral-900"
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${release.tag === "major" ? "bg-emerald-400" : release.tag === "alpha" ? "bg-purple-400" : "bg-neutral-500"}`} />
                </div>

                {/* Card */}
                <div className="border border-neutral-800 bg-neutral-950/40 rounded-2xl p-6 space-y-5 hover:border-neutral-700 transition-colors duration-200">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="text-2xl font-black text-white tracking-tight">v{release.version}</span>
                        <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full border ${TAG_STYLES[release.tag]}`}>
                          {release.tag}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 font-mono mt-1">{release.date}</p>
                    </div>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-neutral-500 hover:text-white border border-neutral-800 px-3 py-1 rounded-full transition-colors flex items-center gap-1.5 hover:border-neutral-600"
                    >
                      View on GitHub <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>

                  <p className="text-sm text-neutral-400 font-light">{release.summary}</p>

                  {/* Breaking */}
                  {release.breaking && (
                    <div className="p-4 rounded-xl border border-red-500/30 bg-red-950/10 space-y-2">
                      <p className="text-xs font-bold text-red-400 uppercase tracking-widest flex items-center gap-2"><AlertCircle className="w-3.5 h-3.5" />Breaking Changes</p>
                      <ul className="space-y-1.5">
                        {release.breaking.map((b) => (
                          <li key={b} className="text-xs text-red-300/80 font-light flex gap-2">
                            <span className="text-red-500 shrink-0 mt-0.5">▸</span>{b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Added */}
                  {release.added && (
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5" />Added</p>
                      <ul className="space-y-1.5">
                        {release.added.map((a) => (
                          <li key={a} className="text-xs text-neutral-400 font-light flex gap-2">
                            <span className="text-emerald-500 shrink-0 mt-0.5">▸</span>{a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Changed */}
                  {release.changed && (
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2"><Wrench className="w-3.5 h-3.5" />Changed</p>
                      <ul className="space-y-1.5">
                        {release.changed.map((c) => (
                          <li key={c} className="text-xs text-neutral-400 font-light flex gap-2">
                            <span className="text-blue-500 shrink-0 mt-0.5">▸</span>{c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Fixed */}
                  {release.fixed && (
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-yellow-400 uppercase tracking-widest flex items-center gap-2"><AlertCircle className="w-3.5 h-3.5" />Fixed</p>
                      <ul className="space-y-1.5">
                        {release.fixed.map((f) => (
                          <li key={f} className="text-xs text-neutral-400 font-light flex gap-2">
                            <span className="text-yellow-500 shrink-0 mt-0.5">▸</span>{f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
