"use client";

import React from "react";
import { WobbleCard } from "./wobble-card";
import { Pointer } from "./pointer";
import { Code, Zap, Shield, Calculator, Files, Palette } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto w-full relative z-20 bg-background text-foreground">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-silver-matte bg-clip-text">
          Engineered for Native Control
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
          Unlike cloud spreadsheets, XL.MCP controls the actual Microsoft Excel process running on your local desktop.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        {/* Card 1: COM Integration */}
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-2 h-full bg-emerald-950/80 min-h-[400px] lg:min-h-[300px] border border-emerald-500/20"
          className=""
        >
          <Pointer>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-full shadow-2xl text-white text-xs font-semibold backdrop-blur-md">
              <Code className="w-3.5 h-3.5 text-emerald-400" />
              <span>COM Server</span>
            </div>
          </Pointer>
          <div className="max-w-md">
            <h3 className="text-left text-balance text-2xl md:text-3xl font-bold tracking-tight text-white">
              Direct COM Automation Server
            </h3>
            <p className="mt-4 text-left text-base/6 text-emerald-200/80 font-light">
              XL.MCP establishes a local COM socket server on Windows. Harness the full power of xlwings and pywin32 to execute spreadsheet actions without cloud dependencies.
            </p>
          </div>
          <div className="absolute -right-4 lg:-right-[10%] -bottom-10 opacity-30 pointer-events-none select-none">
            <div className="w-[300px] h-[300px] bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-full blur-3xl" />
          </div>
        </WobbleCard>

        {/* Card 2: No context switching */}
        <WobbleCard 
          containerClassName="col-span-1 min-h-[300px] bg-zinc-950/90 border border-neutral-800"
        >
          <Pointer>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-full shadow-2xl text-white text-xs font-semibold backdrop-blur-md">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero Latency</span>
            </div>
          </Pointer>
          <h3 className="max-w-80 text-left text-balance text-2xl font-bold tracking-tight text-white">
            Native Zero-Latency Link
          </h3>
          <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-400 font-light">
            Instantly formats cell styles, applies intricate formulas, updates cell ranges, and generates real-time charts directly in your open Excel workbook.
          </p>
        </WobbleCard>

        {/* Card 3: Deep Security */}
        <WobbleCard 
          containerClassName="col-span-1 lg:col-span-3 bg-neutral-950 border border-neutral-800 min-h-[350px] lg:min-h-[300px]"
        >
          <Pointer>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-full shadow-2xl text-white text-xs font-semibold backdrop-blur-md">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Local</span>
            </div>
          </Pointer>
          <div className="max-w-xl">
            <h3 className="text-left text-balance text-2xl md:text-3xl font-bold tracking-tight text-white">
              Secure Local Execution
            </h3>
            <p className="mt-4 text-left text-base/6 text-neutral-400 font-light">
              Your financial models, customer spreadsheets, and secret metrics stay fully local. XL.MCP never uploads workbook data to external servers, securing your business compliance requirements.
            </p>
          </div>
          <div className="absolute -right-10 md:-right-[10%] -bottom-10 opacity-20 pointer-events-none select-none">
            <div className="w-[400px] h-[250px] bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full blur-3xl" />
          </div>
        </WobbleCard>

        {/* Card 4: Dynamic Formula Compiler */}
        <WobbleCard 
          containerClassName="col-span-1 min-h-[300px] bg-zinc-950/90 border border-neutral-800"
        >
          <Pointer>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-full shadow-2xl text-white text-xs font-semibold backdrop-blur-md">
              <Calculator className="w-3.5 h-3.5 text-emerald-400" />
              <span>Formula</span>
            </div>
          </Pointer>
          <h3 className="max-w-80 text-left text-balance text-2xl font-bold tracking-tight text-white">
            Dynamic Formula Compiler
          </h3>
          <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-400 font-light">
            Constructs and verifies complex formulas like nested VLOOKUPs, INDEX/MATCH, and custom calculation chains on the fly, eliminating math syntax errors.
          </p>
        </WobbleCard>

        {/* Card 5: Multi-Workbook Orchestration */}
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-2 h-full bg-blue-950/80 min-h-[400px] lg:min-h-[300px] border border-blue-500/20"
          className=""
        >
          <Pointer>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-full shadow-2xl text-white text-xs font-semibold backdrop-blur-md">
              <Files className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sync Sheet</span>
            </div>
          </Pointer>
          <div className="max-w-md">
            <h3 className="text-left text-balance text-2xl md:text-3xl font-bold tracking-tight text-white">
              Multi-Workbook Orchestration
            </h3>
            <p className="mt-4 text-left text-base/6 text-blue-200/80 font-light">
              Coordinate and transfer datasets across multiple open sheets and workbooks. Perfect for compiling quarterly reviews, syncing registers, and aggregating fragmented data columns.
            </p>
          </div>
          <div className="absolute -right-4 lg:-right-[10%] -bottom-10 opacity-30 pointer-events-none select-none">
            <div className="w-[300px] h-[300px] bg-gradient-to-tr from-blue-500 to-indigo-400 rounded-full blur-3xl" />
          </div>
        </WobbleCard>

        {/* Card 6: Corporate Style Sheets */}
        <WobbleCard 
          containerClassName="col-span-1 lg:col-span-3 bg-neutral-950 border border-neutral-800 min-h-[350px] lg:min-h-[300px]"
        >
          <Pointer>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-full shadow-2xl text-white text-xs font-semibold backdrop-blur-md">
              <Palette className="w-3.5 h-3.5 text-emerald-400" />
              <span>Charting</span>
            </div>
          </Pointer>
          <div className="max-w-xl">
            <h3 className="text-left text-balance text-2xl md:text-3xl font-bold tracking-tight text-white">
              Corporate Style Sheets & Charting
            </h3>
            <p className="mt-4 text-left text-base/6 text-neutral-400 font-light">
              Transform basic data grids into executive-ready dashboards. Control cell background colors, borders, font weights, and render native Excel charts automatically with simple text instructions.
            </p>
          </div>
          <div className="absolute -right-10 md:-right-[10%] -bottom-10 opacity-20 pointer-events-none select-none">
            <div className="w-[400px] h-[250px] bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full blur-3xl" />
          </div>
        </WobbleCard>
      </div>
    </section>
  );
}
