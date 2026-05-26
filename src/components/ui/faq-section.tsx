"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, Shield, Zap, RefreshCw } from "lucide-react";

interface FaqItemProps {
  question: string;
  answer: React.ReactNode;
  icon?: React.ReactNode;
}

function FaqItem({ question, answer, icon }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-neutral-800 bg-neutral-950/40 rounded-xl overflow-hidden transition-all duration-300 hover:border-neutral-700/60">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left font-semibold text-white hover:bg-neutral-900/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon && <div className="text-emerald-400 shrink-0">{icon}</div>}
          <span className="text-sm md:text-base tracking-tight">{question}</span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-neutral-500 transition-transform duration-300 shrink-0 ${
            isOpen ? "rotate-180 text-emerald-400" : ""
          }`}
        />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[500px] border-t border-neutral-900" : "max-h-0"
        }`}
      >
        <div className="p-6 text-sm text-neutral-400 font-light leading-relaxed space-y-3 bg-neutral-950/20">
          {answer}
        </div>
      </div>
    </div>
  );
}

export function FaqSection() {
  return (
    <section className="py-24 px-4 max-w-4xl mx-auto w-full relative z-20 bg-background text-foreground">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-silver-matte">
          Technical FAQ
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto font-light">
          Deep-dive troubleshooting, security policies, and performance tuning configurations for Excel power developers.
        </p>
      </div>

      <div className="space-y-4">
        <FaqItem
          icon={<Shield className="w-5 h-5" />}
          question="How does XL.MCP guarantee zero data exfiltration?"
          answer={
            <>
              <p>
                Unlike standard cloud-based extensions, XL.MCP's server is executed <strong>entirely on your local user space</strong>. It binds exclusively to the local loopback address (<code>127.0.0.1</code>) and refuses all external incoming requests.
              </p>
              <p>
                No workbook metrics, data columns, or cell contents are ever sent to remote services. You can audit the entire bridge process or run the Python COM handler in a local container or firewall-blocked desktop context.
              </p>
            </>
          }
        />

        <FaqItem
          icon={<RefreshCw className="w-5 h-5" />}
          question="How are pywin32 process and file locks resolved during long operations?"
          answer={
            <>
              <p>
                Excel COM operations run synchronously by default, which can cause process locking when background tasks execute concurrently. XL.MCP utilizes <code>pythoncom.CoInitialize()</code> and thread-safe dispatch wrappers to prevent memory locks.
              </p>
              <p>
                If a sheet becomes unresponsive due to a modal window or active cell edit (which halts the COM message pump), the server automatically buffers incoming instructions and dispatches them as soon as Excel exits edit mode.
              </p>
            </>
          }
        />

        <FaqItem
          icon={<Zap className="w-5 h-5" />}
          question="How can I optimize writing performance for large datasets?"
          answer={
            <>
              <p>
                Direct cell-by-cell manipulation creates substantial COM overhead due to marshalling. To achieve sub-second execution times for thousands of rows:
              </p>
              <ul className="list-disc list-inside space-y-1.5 mt-2 pl-2">
                <li>Write data in blocks using multi-dimensional arrays (e.g. <code>range.value = data_matrix</code>) rather than cell-by-cell loops.</li>
                <li>Ensure <code>Application.ScreenUpdating = False</code> and <code>Application.Calculation = xlCalculationManual</code> are set during bulk updates. XL.MCP triggers these automatically during transactional tool runs.</li>
              </ul>
            </>
          }
        />

        <FaqItem
          icon={<HelpCircle className="w-5 h-5" />}
          question="Why do I get a DCOM 'Access Denied' (0x80070005) permission error?"
          answer={
            <>
              <p>
                This error occurs when the calling agent process runs under a different privilege level (e.g., Administrator vs. Standard User) than the active Excel instance.
              </p>
              <p>
                To resolve this, ensure both your AI client terminal and Microsoft Excel are running within the <strong>same user security context</strong>. Do not launch your developer environment as administrator unless Excel is also running as administrator.
              </p>
            </>
          }
        />
      </div>
    </section>
  );
}
