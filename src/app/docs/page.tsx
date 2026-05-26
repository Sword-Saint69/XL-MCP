"use client";

import React, { useState, useEffect, useRef } from "react";
import { DocsNav } from "@/components/ui/docs-nav";
import {
  BookOpen, Terminal, ShieldAlert, Cpu, Settings,
  Code, Copy, Check, ChevronRight, ArrowUpRight, Zap, FileCode, Database, Globe
} from "lucide-react";

/* ─────────────────── INJECTED STYLES ─────────────────── */
const INJECTED_STYLES = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-16px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes glow-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); }
    50%       { box-shadow: 0 0 20px 2px rgba(16,185,129,0.15); }
  }

  .docs-section {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1);
  }
  .docs-section.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .hero-fade { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both; }
  .hero-fade-2 { animation: fadeUp 0.8s 0.15s cubic-bezier(0.16,1,0.3,1) both; }
  .hero-fade-3 { animation: fadeUp 0.8s 0.3s cubic-bezier(0.16,1,0.3,1) both; }
  .hero-fade-4 { animation: fadeUp 0.8s 0.45s cubic-bezier(0.16,1,0.3,1) both; }

  .shimmer-text {
    background: linear-gradient(
      90deg,
      rgba(255,255,255,0.5) 0%,
      rgba(255,255,255,1)   30%,
      rgba(255,255,255,0.5) 60%,
      rgba(255,255,255,1)   100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s linear infinite;
  }

  .sidebar-link {
    position: relative;
    transition: all 0.2s cubic-bezier(0.16,1,0.3,1);
  }
  .sidebar-link::before {
    content: '';
    position: absolute;
    left: 0; top: 50%;
    transform: translateY(-50%) scaleY(0);
    width: 2px; height: 60%;
    background: #10b981;
    border-radius: 999px;
    transition: transform 0.2s cubic-bezier(0.16,1,0.3,1);
  }
  .sidebar-link.active::before { transform: translateY(-50%) scaleY(1); }

  .stat-card {
    animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both;
    transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease;
  }
  .stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5), 0 0 30px -5px rgba(16,185,129,0.08);
  }

  .tool-card {
    transition: transform 0.3s cubic-bezier(0.16,1,0.3,1),
                box-shadow 0.3s ease,
                border-color 0.3s ease;
  }
  .tool-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 36px -8px rgba(0,0,0,0.6);
  }

  .code-block {
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
  .code-block:hover {
    border-color: rgba(255,255,255,0.08);
    box-shadow: 0 8px 24px -4px rgba(0,0,0,0.4);
  }

  .prereq-card {
    transition: transform 0.25s cubic-bezier(0.16,1,0.3,1),
                border-color 0.25s ease,
                background-color 0.25s ease;
  }
  .prereq-card:hover {
    transform: translateY(-2px);
    border-color: rgba(255,255,255,0.08);
    background-color: rgba(255,255,255,0.02);
  }

  .callout {
    animation: fadeIn 0.5s ease both;
    transition: box-shadow 0.2s ease;
  }
  .callout:hover { box-shadow: 0 4px 20px -4px rgba(0,0,0,0.4); }

  .section-divider {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
    height: 1px;
    border: none;
  }
`;

/* ─────────────────── CODE BLOCK ─────────────────── */
function CodeBlock({ code, language = "bash" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);
  const langColors: Record<string, string> = {
    python: "text-yellow-400/60",
    json: "text-blue-400/60",
    powershell: "text-purple-400/60",
    bash: "text-emerald-400/60",
    text: "text-neutral-500",
  };
  return (
    <div className="code-block relative my-5 rounded-2xl border border-neutral-800/80 bg-[#0a0a0a] overflow-hidden font-mono text-[13px] shadow-xl">
      <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-900 bg-neutral-950/80">
        <div className="flex items-center gap-2.5">
          <span className="w-3 h-3 rounded-full bg-red-500/60 hover:bg-red-500 transition-colors cursor-default" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/60 hover:bg-yellow-500 transition-colors cursor-default" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/60 hover:bg-emerald-500 transition-colors cursor-default" />
          <span className={`ml-3 uppercase text-[10px] tracking-[0.2em] font-bold ${langColors[language] ?? "text-neutral-600"}`}>
            {language}
          </span>
        </div>
        <button
          onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-white transition-all duration-200 py-1 px-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10"
        >
          {copied
            ? <><Check className="w-3 h-3 text-emerald-400" /><span className="text-emerald-400 font-medium">Copied!</span></>
            : <><Copy className="w-3 h-3" /><span>Copy</span></>
          }
        </button>
      </div>
      <pre className="p-5 overflow-x-auto text-neutral-300 leading-[1.8] text-[13px]"><code>{code}</code></pre>
    </div>
  );
}

/* ─────────────────── CALLOUT ─────────────────── */
function Callout({ type = "info", children }: { type?: "info" | "warning" | "tip" | "danger"; children: React.ReactNode }) {
  const cfg = {
    info:    { border: "border-blue-500/30",    bg: "bg-blue-500/5",    text: "text-blue-200",    label: "INFO",    dot: "bg-blue-400" },
    warning: { border: "border-yellow-500/30",  bg: "bg-yellow-500/5",  text: "text-yellow-200",  label: "WARNING", dot: "bg-yellow-400" },
    tip:     { border: "border-emerald-500/30", bg: "bg-emerald-500/5", text: "text-emerald-200", label: "TIP",     dot: "bg-emerald-400" },
    danger:  { border: "border-red-500/30",     bg: "bg-red-500/5",     text: "text-red-200",     label: "DANGER",  dot: "bg-red-400" },
  }[type];
  return (
    <div className={`callout my-5 p-5 rounded-2xl border ${cfg.border} ${cfg.bg} flex gap-4`}>
      <div className="flex flex-col items-center gap-1.5 shrink-0 pt-0.5">
        <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
        <span className={`text-[9px] font-black tracking-[0.2em] uppercase ${cfg.text} opacity-60 [writing-mode:vertical-lr] rotate-180`}>{cfg.label}</span>
      </div>
      <div className={`text-sm font-light leading-relaxed ${cfg.text}`}>{children}</div>
    </div>
  );
}

/* ─────────────────── SECTION HEADING ─────────────────── */
function SectionHeading({ id, number, children }: { id: string; number: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-3">
      <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
        <span className="text-xs font-black text-emerald-400 font-mono">{number}</span>
      </div>
      <h2 id={id} className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">{children}</h2>
    </div>
  );
}

/* ─────────────────── TOOL CARD ─────────────────── */
function ToolCard({ name, method, color, description, payload }: {
  name: string; method: string; color: string; description: string; payload: string;
}) {
  const [open, setOpen] = useState(false);
  const cfgMap: Record<string, { border: string; bg: string; label: string; method: string }> = {
    emerald: { border: "border-emerald-500/20 hover:border-emerald-500/40", bg: "bg-emerald-500/5",  label: "text-emerald-400", method: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30" },
    blue:    { border: "border-blue-500/20 hover:border-blue-500/40",       bg: "bg-blue-500/5",    label: "text-blue-400",    method: "bg-blue-500/10 text-blue-300 border-blue-500/30" },
    purple:  { border: "border-purple-500/20 hover:border-purple-500/40",   bg: "bg-purple-500/5",  label: "text-purple-400",  method: "bg-purple-500/10 text-purple-300 border-purple-500/30" },
    indigo:  { border: "border-indigo-500/20 hover:border-indigo-500/40",   bg: "bg-indigo-500/5",  label: "text-indigo-400",  method: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30" },
    cyan:    { border: "border-cyan-500/20 hover:border-cyan-500/40",       bg: "bg-cyan-500/5",    label: "text-cyan-400",    method: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30" },
    rose:    { border: "border-rose-500/20 hover:border-rose-500/40",       bg: "bg-rose-500/5",    label: "text-rose-400",    method: "bg-rose-500/10 text-rose-300 border-rose-500/30" },
    amber:   { border: "border-amber-500/20 hover:border-amber-500/40",     bg: "bg-amber-500/5",   label: "text-amber-400",   method: "bg-amber-500/10 text-amber-300 border-amber-500/30" },
  };
  const c = cfgMap[color] ?? cfgMap.emerald;
  return (
    <div className={`tool-card border rounded-2xl overflow-hidden ${c.border} ${c.bg} backdrop-blur-sm`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3">
          <code className={`text-base font-bold font-mono ${c.label}`}>{name}</code>
          <span className={`text-[10px] uppercase font-mono font-bold px-2.5 py-0.5 rounded-full border ${c.method}`}>{method}</span>
        </div>
        <ChevronRight className={`w-4 h-4 text-neutral-600 transition-transform duration-300 ${open ? "rotate-90" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? "max-h-[800px]" : "max-h-0"}`}>
        <div className="px-5 pb-5 pt-1 space-y-3 border-t border-white/5">
          <p className="text-xs text-neutral-400 font-light leading-relaxed">{description}</p>
          <CodeBlock code={payload} language="json" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── ANIMATE-IN SECTION ─────────────────── */
function AnimSection({ id, children }: { id: string; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); }
    }, { threshold: 0.06 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <section ref={ref} id={id} className="docs-section scroll-mt-28 space-y-6">{children}</section>;
}

/* ─────────────────── PAGE ─────────────────── */
export default function DocsPage() {
  const [activeId, setActiveId] = useState("intro");

  const sections = [
    { id: "intro",        label: "Introduction",         icon: <BookOpen className="w-3.5 h-3.5" />,   num: "00" },
    { id: "prereqs",      label: "Prerequisites",        icon: <Cpu className="w-3.5 h-3.5" />,        num: "01" },
    { id: "install",      label: "Installation",         icon: <Terminal className="w-3.5 h-3.5" />,   num: "02" },
    { id: "client-setup", label: "Client Setup",         icon: <Globe className="w-3.5 h-3.5" />,      num: "03" },
    { id: "tools",        label: "Tool Reference",       icon: <Code className="w-3.5 h-3.5" />,       num: "04" },
    { id: "advanced",     label: "Advanced Usage",       icon: <Zap className="w-3.5 h-3.5" />,        num: "05" },
    { id: "config",       label: "DCOM & Python",        icon: <Settings className="w-3.5 h-3.5" />,   num: "06" },
    { id: "security",     label: "Security Model",       icon: <Database className="w-3.5 h-3.5" />,   num: "07" },
    { id: "api",          label: "Python API",           icon: <FileCode className="w-3.5 h-3.5" />,   num: "08" },
    { id: "trouble",      label: "Troubleshooting",      icon: <ShieldAlert className="w-3.5 h-3.5" />,num: "09" },
  ];

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => { for (const e of entries) { if (e.isIntersecting) setActiveId(e.target.id); } },
      { rootMargin: "-15% 0% -70% 0%", threshold: 0 }
    );
    sections.forEach(({ id }) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-emerald-500/20 relative">
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />

      {/* Ambient backgrounds */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/[0.025] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/[0.025] rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      </div>

      <DocsNav />

      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-10 pb-28 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12 relative">

        {/* ── Sidebar ── */}
        <aside className="hidden lg:flex flex-col gap-4 lg:sticky lg:top-24 h-fit">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl overflow-hidden shadow-2xl">
            <div className="px-4 py-3 border-b border-white/[0.05]">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-600">Documentation</p>
            </div>
            <nav className="p-2 space-y-0.5">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`sidebar-link flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] transition-all duration-200 select-none pl-5 ${
                    activeId === s.id
                      ? "active bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-semibold"
                      : "text-neutral-500 hover:text-neutral-200 hover:bg-white/[0.04] border border-transparent"
                  }`}
                >
                  <span className={`transition-colors duration-200 ${activeId === s.id ? "text-emerald-400" : "text-neutral-600"}`}>{s.icon}</span>
                  <span>{s.label}</span>
                  <span className={`ml-auto font-mono text-[10px] transition-colors duration-200 ${activeId === s.id ? "text-emerald-500/60" : "text-neutral-700"}`}>{s.num}</span>
                </a>
              ))}
            </nav>
          </div>

          <div className="p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] text-[12px] text-neutral-500 leading-relaxed">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-neutral-300 text-[11px] tracking-wide">127.0.0.1 — Local only</span>
            </div>
            Zero data leaves your device. Air-gapped COM bridge.{" "}
            <a href="https://github.com" className="text-emerald-400 hover:underline inline-flex items-center gap-0.5 mt-1">
              Open issue <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </aside>

        {/* ── Main content ── */}
        <main className="min-w-0 space-y-24">

          {/* ── INTRO ── */}
          <AnimSection id="intro">
            <div className="space-y-3">
              <div className="hero-fade">
                <span className="inline-flex items-center gap-2 text-[11px] font-mono text-emerald-500 uppercase tracking-[0.2em] mb-3">
                  <span className="w-4 h-px bg-emerald-500" />
                  Getting Started
                </span>
                <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
                  <span className="shimmer-text">XL.MCP</span>
                </h1>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight text-neutral-400 leading-none mt-1">Documentation</h1>
              </div>
              <p className="hero-fade-2 text-neutral-400 text-lg font-light leading-relaxed max-w-2xl">
                An open-source <strong className="text-white font-semibold">Model Context Protocol</strong> server that lets any MCP-capable AI client drive a live Microsoft Excel session — through a secure, air-gapped local bridge. Zero cloud. Zero VMs. Zero network exposure.
              </p>
            </div>

            <div className="hero-fade-3 grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
              {[
                { label: "Latency",   value: "< 50ms",    sub: "typical COM round-trip",    delay: "0s" },
                { label: "Protocol",  value: "MCP / stdio", sub: "or HTTP socket",            delay: "0.1s" },
                { label: "Transport", value: "127.0.0.1", sub: "local loopback only",        delay: "0.2s" },
              ].map((stat) => (
                <div key={stat.label} className="stat-card p-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] text-center backdrop-blur-sm" style={{ animationDelay: stat.delay }}>
                  <p className="text-3xl font-black text-white tracking-tight">{stat.value}</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-500 font-bold mt-1">{stat.label}</p>
                  <p className="text-[11px] text-neutral-500 mt-0.5">{stat.sub}</p>
                </div>
              ))}
            </div>

            <Callout type="tip">
              XL.MCP is not an Excel add-in. It bypasses the Excel JavaScript API entirely and talks directly to the Excel <strong>process</strong> via Windows COM — giving it full VBA-level parity with access to every cell, chart, format, and formula.
            </Callout>
          </AnimSection>

          <hr className="section-divider" />

          {/* ── PREREQS ── */}
          <AnimSection id="prereqs">
            <SectionHeading id="prereqs" number="01">System Prerequisites</SectionHeading>
            <p className="text-neutral-400 font-light leading-relaxed">Every dependency below must be satisfied before the COM bridge can dispatch calls reliably.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Windows 10 / 11 / Server", detail: "COM DCOM subsystem only available on Windows NT kernel. macOS and Linux not supported.", color: "emerald" },
                { label: "Python ≥ 3.8 (64-bit)",    detail: "Must match Excel bitness. Use a 64-bit Python installation with Office 365 64-bit.", color: "blue" },
                { label: "Microsoft Excel (Desktop)", detail: "Office 2016, 2019, 2021, or M365 local desktop. Excel Online not supported.", color: "purple" },
                { label: "pywin32 ≥ 306",             detail: "Provides win32com.client dispatch layer that marshalls Python calls into COM method invocations.", color: "indigo" },
                { label: "xlwings ≥ 0.30",            detail: "High-level Python wrapper handling workbook object lifecycle, range helpers, and chart APIs.", color: "cyan" },
                { label: "MCP Client",                detail: "Claude Desktop, Cursor IDE, or any stdio/HTTP client implementing the MCP spec.", color: "rose" },
              ].map((item) => (
                <div key={item.label} className={`prereq-card p-5 border border-${item.color}-500/15 bg-${item.color}-500/5 rounded-2xl space-y-2`}>
                  <p className={`text-xs uppercase font-mono font-bold text-${item.color}-400 tracking-wider`}>{item.label}</p>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </AnimSection>

          <hr className="section-divider" />

          {/* ── INSTALL ── */}
          <AnimSection id="install">
            <SectionHeading id="install" number="02">Installation</SectionHeading>
            <p className="text-neutral-400 font-light">Deploy the local socket gateway using standard Windows command terminals.</p>
            <div className="space-y-8">
              {[
                {
                  step: "1", title: "Install Python dependencies",
                  desc: "Open PowerShell or CMD as your regular user.",
                  code: "pip install pywin32 xlwings", lang: "powershell",
                },
                {
                  step: "2", title: "Run pywin32 post-install",
                  desc: "Registers DCOM type library into the Windows registry.",
                  code: "python -m pywin32_postinstall -install", lang: "powershell",
                  warn: "If a UAC prompt appears, click Yes. This writes to HKLM\\SOFTWARE\\Classes and requires elevation on first run."
                },
                {
                  step: "3", title: "Clone & install XL.MCP",
                  desc: "",
                  code: "git clone https://github.com/your-org/excel-mcp.git\ncd excel-mcp\npip install -e .", lang: "powershell",
                },
                {
                  step: "4", title: "Verify installation",
                  desc: "Excel must be running for the connection test.",
                  code: "# Should print: XL.MCP vX.X.X — COM bridge ready\npython -m excel_mcp --version\n\n# Quick self-test\npython -m excel_mcp.test_connection", lang: "powershell",
                },
              ].map((item) => (
                <div key={item.step} className="relative pl-10">
                  <div className="absolute left-0 top-0 w-7 h-7 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                    <span className="text-[11px] font-black text-neutral-400 font-mono">{item.step}</span>
                  </div>
                  <p className="text-sm font-bold text-white mb-1">{item.title}</p>
                  {item.desc && <p className="text-xs text-neutral-500 mb-1">{item.desc}</p>}
                  <CodeBlock code={item.code} language={item.lang} />
                  {item.warn && <Callout type="warning">{item.warn}</Callout>}
                </div>
              ))}
            </div>
          </AnimSection>

          <hr className="section-divider" />

          {/* ── CLIENT SETUP ── */}
          <AnimSection id="client-setup">
            <SectionHeading id="client-setup" number="03">Client Setup</SectionHeading>
            <p className="text-neutral-400 font-light leading-relaxed">
              XL.MCP ships two transport modes: <strong className="text-white">stdio</strong> (recommended for desktop clients) and <strong className="text-white">HTTP socket</strong> for programmatic integrations.
            </p>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-bold text-white mb-1">Claude Desktop</p>
                <p className="text-xs text-neutral-500 mb-1 font-mono">~/Library/Application Support/Claude/claude_desktop_config.json</p>
                <CodeBlock language="json" code={`{\n  "mcpServers": {\n    "excel-mcp": {\n      "command": "python",\n      "args": ["-m", "excel_mcp.server"],\n      "env": {\n        "EXCEL_MCP_LOG_LEVEL": "INFO",\n        "EXCEL_MCP_TIMEOUT": "30"\n      }\n    }\n  }\n}`} />
              </div>
              <div>
                <p className="text-sm font-bold text-white mb-1">Cursor IDE</p>
                <p className="text-xs text-neutral-500 mb-1 font-mono">.cursor/mcp.json</p>
                <CodeBlock language="json" code={`{\n  "mcpServers": {\n    "excel": {\n      "command": "python",\n      "args": ["-m", "excel_mcp.server", "--transport", "stdio"]\n    }\n  }\n}`} />
              </div>
              <div>
                <p className="text-sm font-bold text-white mb-1">HTTP Socket mode</p>
                <CodeBlock language="powershell" code={`# Start HTTP server\npython -m excel_mcp.server --transport http --port 8000\n\n# Test with curl\ncurl -X POST http://127.0.0.1:8000/tool \\\n  -H "Content-Type: application/json" \\\n  -d '{"tool":"list_sheets","params":{}}'`} />
              </div>
            </div>
          </AnimSection>

          <hr className="section-divider" />

          {/* ── TOOLS ── */}
          <AnimSection id="tools">
            <SectionHeading id="tools" number="04">Tool Reference</SectionHeading>
            <p className="text-neutral-400 font-light">Click any tool to expand its full JSON schema. Parameters marked <code className="text-emerald-400 bg-emerald-500/10 px-1 rounded">*</code> are required.</p>
            <div className="space-y-3">
              <ToolCard name="write_cells" method="WRITE" color="emerald" description="Write a 2-D array of values into a sheet range. Strings, numbers, booleans, and None are accepted."
                payload={`{\n  "sheet_name": "Sheet1",      // * target sheet\n  "range_address": "A1",       // * top-left anchor\n  "values": [                  // * 2-D array\n    ["Product", "Q1",  "Q2" ],\n    ["Widgets",  4200,  5100],\n    ["Gadgets",  3100,  4800]\n  ]\n}`} />
              <ToolCard name="read_cells" method="READ" color="blue" description="Return cell values from a rectangular range as a 2-D JSON array. Merged cells return the top-left value."
                payload={`{\n  "sheet_name": "Sheet1",\n  "range_address": "A1:C3"\n}\n\n// Response\n{\n  "values": [\n    ["Product", "Q1", "Q2"],\n    ["Widgets", 4200, 5100]\n  ]\n}`} />
              <ToolCard name="format_cells" method="FORMAT" color="purple" description="Apply font, fill, alignment, number format, and border styling to a range."
                payload={`{\n  "sheet_name": "Sheet1",\n  "range_address": "A1:C1",\n  "format": {\n    "bold":         true,\n    "font_name":    "Segoe UI",\n    "font_size":    11,\n    "font_color":   "#FFFFFF",\n    "bg_color":     "#1E3A8A",\n    "h_align":      "center",\n    "num_format":   "#,##0.00",\n    "border_style": "thin"\n  }\n}`} />
              <ToolCard name="create_chart" method="WRITE" color="indigo" description="Insert a native Excel chart object linked to a data range, embedded in the same sheet."
                payload={`{\n  "sheet_name":  "Sheet1",\n  "chart_type":  "column_clustered",\n  "source_data": "A1:C4",\n  "chart_title": "Q1-Q2 Performance",\n  "position": { "top": 160, "left": 420, "width": 380, "height": 260 }\n}`} />
              <ToolCard name="apply_formula" method="WRITE" color="cyan" description="Set an Excel formula string into one or more cells. Formula must start with '='."
                payload={`{\n  "sheet_name":    "Sheet1",\n  "range_address": "D2:D10",\n  "formula":       "=SUM(B2:C2)",\n  "fill_down":     true\n}`} />
              <ToolCard name="list_sheets" method="READ" color="rose" description="Return the names and visibility of every worksheet in the active workbook."
                payload={`{}\n\n// Response\n{\n  "sheets": [\n    { "name": "Sheet1", "visible": true, "index": 0 },\n    { "name": "Data",   "visible": true, "index": 1 }\n  ]\n}`} />
              <ToolCard name="add_sheet" method="WRITE" color="amber" description="Insert a new worksheet. Optionally clone an existing sheet."
                payload={`{\n  "name":      "Q3 Summary",\n  "copy_from": "Sheet1",\n  "position":  2\n}`} />
            </div>
          </AnimSection>

          <hr className="section-divider" />

          {/* ── ADVANCED ── */}
          <AnimSection id="advanced">
            <SectionHeading id="advanced" number="05">Advanced Usage</SectionHeading>
            <div className="space-y-8">
              <div>
                <p className="text-sm font-bold text-white mb-2">Batch transactional writes</p>
                <Callout type="tip">Wrap multiple calls in a transaction to suspend screen updates and recalculation — reducing COM round-trips from O(n) to O(1).</Callout>
                <CodeBlock language="python" code={`from excel_mcp.client import ExcelMCPClient\n\nclient = ExcelMCPClient()\n\nwith client.transaction():\n    client.write_cells("Sheet1", "A1", data_matrix)\n    client.format_cells("Sheet1", "A1:D1", header_fmt)\n    client.apply_formula("Sheet1", "E2:E100", "=B2*C2")\n    client.create_chart("Sheet1", "column_clustered", "A1:D10")\n# Screen repaints once here`} />
              </div>
              <div>
                <p className="text-sm font-bold text-white mb-2">Large dataset optimisation</p>
                <CodeBlock language="python" code={`app.screen_updating = False\napp.calculation     = "manual"\n\nws.range("A1").value = large_2d_list   # single COM call\n\napp.screen_updating = True\napp.calculation     = "automatic"\napp.calculate()`} />
              </div>
            </div>
          </AnimSection>

          <hr className="section-divider" />

          {/* ── CONFIG ── */}
          <AnimSection id="config">
            <SectionHeading id="config" number="06">DCOM & Python Configuration</SectionHeading>
            <CodeBlock language="python" code={`import pythoncom, xlwings as xw\n\ndef com_worker():\n    pythoncom.CoInitialize()\n    try:\n        app   = xw.apps.active\n        wb    = app.books.active\n        sheet = wb.sheets.active\n        # --- operations ---\n    except Exception as exc:\n        print(f"COM error: {exc}")\n    finally:\n        pythoncom.CoUninitialize()`} />
            <div className="overflow-x-auto rounded-2xl border border-white/[0.06] shadow-xl">
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-white/[0.03]">
                    <th className="px-5 py-3.5 text-left text-neutral-400 font-bold tracking-wider">Variable</th>
                    <th className="px-5 py-3.5 text-left text-neutral-400 font-bold tracking-wider">Default</th>
                    <th className="px-5 py-3.5 text-left text-neutral-400 font-bold tracking-wider font-sans">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {[
                    ["EXCEL_MCP_PORT",      "8000",    "HTTP mode listening port"],
                    ["EXCEL_MCP_TIMEOUT",   "30",      "Seconds to wait for COM response"],
                    ["EXCEL_MCP_LOG_LEVEL", "WARNING", "DEBUG | INFO | WARNING | ERROR"],
                    ["EXCEL_MCP_MAX_RETRY", "5",       "COM busy retry attempts"],
                    ["EXCEL_MCP_RETRY_MS",  "500",     "Delay between retries (ms)"],
                    ["EXCEL_MCP_TRANSPORT", "stdio",   "stdio | http"],
                  ].map(([k, v, d]) => (
                    <tr key={k} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-3 text-emerald-400">{k}</td>
                      <td className="px-5 py-3 text-neutral-500">{v}</td>
                      <td className="px-5 py-3 text-neutral-400 font-sans">{d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimSection>

          <hr className="section-divider" />

          {/* ── SECURITY ── */}
          <AnimSection id="security">
            <SectionHeading id="security" number="07">Security Model</SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { t: "Loopback-only",   b: "Listener bound to 127.0.0.1. No external interface is ever opened." },
                { t: "No cloud egress", b: "Zero bytes of workbook data transmitted outside the local process." },
                { t: "User-space only", b: "XL.MCP runs as a standard user process. No administrator rights at runtime." },
                { t: "Payload validation", b: "All parameters validated against JSON Schema before execution." },
                { t: "Audit log",       b: "Every tool call logged (name, timestamp, no cell values) to a local rotating file." },
                { t: "Same-user rule",  b: "Python bridge and Excel must share the same Windows user session." },
              ].map((item) => (
                <div key={item.t} className="prereq-card p-5 border border-white/[0.06] bg-white/[0.02] rounded-2xl space-y-2">
                  <p className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />{item.t}
                  </p>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">{item.b}</p>
                </div>
              ))}
            </div>
          </AnimSection>

          <hr className="section-divider" />

          {/* ── PYTHON API ── */}
          <AnimSection id="api">
            <SectionHeading id="api" number="08">Python API Reference</SectionHeading>
            <p className="text-neutral-400 font-light">Use these helpers directly without going through MCP.</p>
            <CodeBlock language="python" code={`from excel_mcp import bridge\n\nb = bridge.ExcelBridge()                # connect to active Excel\nb = bridge.ExcelBridge("Book1.xlsx")    # connect to named workbook\n\n# ─── Sheets ──────────────────────────────────────────────\nsheets = b.list_sheets()\nb.add_sheet("NewSheet", position=1)\nb.delete_sheet("OldSheet")\nb.rename_sheet("Sheet1", "Sales")\n\n# ─── Cells ───────────────────────────────────────────────\nb.write("Sheet1", "A1", [[1, 2], [3, 4]])\ndata = b.read("Sheet1", "A1:B2")\nb.clear("Sheet1", "A1:Z100")\n\n# ─── Formatting ──────────────────────────────────────────\nb.format("Sheet1", "A1:D1", bold=True, bg_color="#1E3A8A")\nb.auto_fit("Sheet1", "A:D")\n\n# ─── Formulas ────────────────────────────────────────────\nb.formula("Sheet1", "E2", "=SUM(B2:D2)")\nb.fill_down("Sheet1", "E2:E100")\n\n# ─── Charts ──────────────────────────────────────────────\nb.chart("Sheet1", "column_clustered", "A1:D5",\n        title="Sales", top=160, left=400, w=380, h=260)\n\n# ─── Misc ────────────────────────────────────────────────\nb.save()\nb.save_as("C:/output/report.xlsx")\nb.close(save=True)`} />
          </AnimSection>

          <hr className="section-divider" />

          {/* ── TROUBLESHOOTING ── */}
          <AnimSection id="trouble">
            <SectionHeading id="trouble" number="09">Troubleshooting</SectionHeading>
            <div className="space-y-4">
              {[
                {
                  title: "win32com.client.gencache errors after Office update",
                  body:  "Office updates regenerate COM type libraries, invalidating the cached Python dispatch wrappers.",
                  code:  `python -c "import win32com; print(win32com.__gen_path__)"\n# Delete that directory, then restart XL.MCP\n# e.g. del /Q /S C:\\Users\\<You>\\AppData\\Local\\Temp\\gen_py`,
                  lang:  "powershell", border: "border-red-500/20", bg: "bg-red-500/5",
                },
                {
                  title: "0x80070005 — Access Denied (DCOM)",
                  body:  "Excel and the Python process are running under different privilege contexts.",
                  code:  `# Ensure NEITHER process is elevated to Administrator\n# Both should run as the same standard user`,
                  lang:  "text", border: "border-yellow-500/20", bg: "bg-yellow-500/5",
                },
                {
                  title: "0x8001000A — RPC_E_SERVERCALL_RETRYLATER",
                  body:  "Excel is in cell-edit mode. COM calls are blocked until the active cell is committed.",
                  code:  `EXCEL_MCP_MAX_RETRY=10 EXCEL_MCP_RETRY_MS=800 python -m excel_mcp.server`,
                  lang:  "powershell", border: "border-orange-500/20", bg: "bg-orange-500/5",
                },
                {
                  title: "pywintypes.com_error: -2147221005",
                  body:  "Excel COM class is not registered. Missing pywin32 post-install step.",
                  code:  `python -m pywin32_postinstall -install\n# Then reboot to propagate registry changes`,
                  lang:  "powershell", border: "border-red-500/20", bg: "bg-red-500/5",
                },
              ].map((item) => (
                <div key={item.title} className={`tool-card p-5 border ${item.border} ${item.bg} rounded-2xl space-y-2`}>
                  <p className="text-sm font-bold text-white">{item.title}</p>
                  <p className="text-xs text-neutral-400 font-light">{item.body}</p>
                  <CodeBlock code={item.code} language={item.lang} />
                </div>
              ))}
            </div>
          </AnimSection>

        </main>
      </div>
    </div>
  );
}
