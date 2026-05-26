"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { BorderBeam } from "./border-beam";

interface StepCardProps {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  color: "emerald" | "blue" | "purple" | "indigo";
}

function StepCard({ stepNumber, title, subtitle, description, details, color }: StepCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const colorMap = {
    emerald: {
      border: "border-emerald-500/20 hover:border-emerald-500/40",
      bg: "bg-emerald-950/20",
      accent: "text-emerald-400",
      glow: "from-emerald-500/10 to-transparent",
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    },
    blue: {
      border: "border-blue-500/20 hover:border-blue-500/40",
      bg: "bg-blue-950/20",
      accent: "text-blue-400",
      glow: "from-blue-500/10 to-transparent",
      badge: "bg-blue-500/10 text-blue-400 border-blue-500/20"
    },
    purple: {
      border: "border-purple-500/20 hover:border-purple-500/40",
      bg: "bg-purple-950/20",
      accent: "text-purple-400",
      glow: "from-purple-500/10 to-transparent",
      badge: "bg-purple-500/10 text-purple-400 border-purple-500/20"
    },
    indigo: {
      border: "border-indigo-500/20 hover:border-indigo-500/40",
      bg: "bg-indigo-950/20",
      accent: "text-indigo-400",
      glow: "from-indigo-500/10 to-transparent",
      badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
    }
  };

  const selectedColor = colorMap[color];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex flex-col justify-between overflow-hidden rounded-2xl border ${selectedColor.border} ${selectedColor.bg} p-6 backdrop-blur-md transition-all duration-300 hover:shadow-xl group`}
    >
      {isHovered && (
        <BorderBeam size={150} duration={8} delay={0} borderWidth={1.5} colorFrom="var(--color-primary)" colorTo="transparent" />
      )}
      
      {/* Glow effect */}
      <div className={`absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br ${selectedColor.glow} blur-2xl opacity-50 pointer-events-none transition-all duration-500 group-hover:scale-125`} />
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full border ${selectedColor.badge}`}>
            Step {stepNumber}
          </span>
        </div>

        <div className="space-y-1">
          <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">{subtitle}</span>
          <h4 className="text-xl font-bold text-white tracking-tight">{title}</h4>
        </div>

        <p className="text-sm text-neutral-400 font-light mt-3 leading-relaxed">
          {description}
        </p>
      </div>

      <ul className="mt-6 space-y-2 border-t border-neutral-900 pt-4">
        {details.map((detail, idx) => (
          <li key={idx} className="flex items-start text-xs text-neutral-400 font-light">
            <span className={`mr-2 font-mono ${selectedColor.accent}`}>▸</span>
            <span>{detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ArchitectureGrid() {
  const [pulseActive, setPulseActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulseActive((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto w-full relative z-20 bg-background text-foreground overflow-hidden">
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      <div className="text-center mb-16 relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-silver-matte">
          System Architecture
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
          A secure, sandboxed pipeline connecting standard AI clients directly to your local desktop spreadsheet.
        </p>
      </div>

      {/* Visual Pipeline Animation */}
      <div className="hidden lg:flex items-center justify-between px-12 mb-12 relative w-full h-8">
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-neutral-900 -translate-y-1/2 z-0" />
        
        {/* Step Connections */}
        <div className="flex justify-between items-center w-full z-10">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full border-2 transition-all duration-500 ${pulseActive === 0 ? "bg-emerald-400 border-emerald-400 scale-125 shadow-[0_0_10px_#10b981]" : "bg-neutral-800 border-neutral-700"}`} />
            <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">Input</span>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <ArrowRight className={`w-4 h-4 transition-all duration-500 ${pulseActive === 0 ? "text-emerald-400 translate-x-2" : "text-neutral-700"}`} />
          </div>

          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full border-2 transition-all duration-500 ${pulseActive === 1 ? "bg-blue-400 border-blue-400 scale-125 shadow-[0_0_10px_#3b82f6]" : "bg-neutral-800 border-neutral-700"}`} />
            <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">Local Gateway</span>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <ArrowRight className={`w-4 h-4 transition-all duration-500 ${pulseActive === 1 ? "text-blue-400 translate-x-2" : "text-neutral-700"}`} />
          </div>

          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full border-2 transition-all duration-500 ${pulseActive === 2 ? "bg-purple-400 border-purple-400 scale-125 shadow-[0_0_10px_#a855f7]" : "bg-neutral-800 border-neutral-700"}`} />
            <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">Python Engine</span>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <ArrowRight className={`w-4 h-4 transition-all duration-500 ${pulseActive === 2 ? "text-purple-400 translate-x-2" : "text-neutral-700"}`} />
          </div>

          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full border-2 transition-all duration-500 ${pulseActive === 3 ? "bg-indigo-400 border-indigo-400 scale-125 shadow-[0_0_10px_#6366f1]" : "bg-neutral-800 border-neutral-700"}`} />
            <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">Windows COM</span>
          </div>
        </div>
      </div>

      {/* Grid of Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full relative z-10">
        <StepCard
          stepNumber="1"
          subtitle="Client Layer"
          title="AI Client & Prompts"
          description="The user provides high-level text commands to an MCP-capable client (like Claude Desktop or Cursor). The agent converts requirements to standardized spreadsheet JSON tools."
          details={[
            "Accepts natural English inputs",
            "Resolves spreadsheet schemas",
            "Builds request payload packets",
            "Communicates over standard IO"
          ]}
          color="emerald"
        />

        <StepCard
          stepNumber="2"
          subtitle="Security Layer"
          title="Local Windows Socket"
          description="A lightweight, ultra-secure Python socket daemon listening exclusively on localhost. Validates client payloads, handles handshakes, and routes executions securely."
          details={[
            "Restricted to local loopback (127.0.0.1)",
            "Strict input schema validation",
            "Low-latency JSON IPC pipe",
            "Runs inside local User space"
          ]}
          color="blue"
        />

        <StepCard
          stepNumber="3"
          subtitle="Orchestration Layer"
          title="Python & xlwings"
          description="Processes the validated commands through a Python library layer. Evaluates coordinates, dynamically builds complex equations, and maps formulas to the active workbook structure."
          details={[
            "Leverages standard xlwings wrapper",
            "Manages cell ranges & formulas dynamically",
            "Pre-calculates workbook coordinates",
            "Error-handling & workbook locks prevention"
          ]}
          color="purple"
        />

        <StepCard
          stepNumber="4"
          subtitle="Native OS Layer"
          title="Excel COM (win32com)"
          description="Dispatches low-level instructions to Microsoft Excel's native Windows COM interface. Instantly mutates, styles, and repaints cells on the active spreadsheet."
          details={[
            "Direct Windows OS-level interface",
            "Controls real-time open process",
            "Triggers spreadsheet refresh & updates",
            "Fires sheet chart and style events"
          ]}
          color="indigo"
        />
      </div>

      {/* Security & Performance Callouts */}
      <div className="mt-12 p-6 rounded-2xl border border-neutral-800 bg-neutral-950/50 backdrop-blur-sm grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Air-Gapped & Secure</h4>
            <p className="text-xs text-neutral-400 font-light mt-1">
              Your workbook data never leaves your device. The connection is restricted to the machine's local loopback network, keeping financial, medical, and client records completely private.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Direct COM Memory Speed</h4>
            <p className="text-xs text-neutral-400 font-light mt-1">
              No slow HTTP APIs. By communicating directly with Excel via memory using Windows COM pipes, operations are executed in milliseconds for an instant, responsive feel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
