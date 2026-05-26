"use client";

import React from "react";
import { AgentChat as RealAgentChat } from "../agent-elements/agent-chat";
import type { AgentChatProps as RealAgentChatProps } from "../agent-elements/types";
import { cn } from "@/lib/utils";
import type { UIMessage } from "ai";

export interface AgentMessage {
  id: string;
  role: "user" | "assistant" | "data" | "system";
  content?: string;
  parts?: Array<{ type: string; text?: string; [key: string]: any }>;
  [key: string]: any;
}

export interface AgentChatProps extends Omit<RealAgentChatProps, "messages" | "onSend"> {
  messages: AgentMessage[];
  onSend: (message: { role: "user"; content: string }) => void | Promise<void>;
}

export function AgentChat({ messages, onSend, className, ...props }: AgentChatProps) {
  return (
    <div
      className={cn(
        "flex flex-col h-full w-full rounded-2xl overflow-hidden border backdrop-blur-xl shadow-2xl transition-all duration-300",
        "bg-zinc-950/70 border-zinc-800/80 text-zinc-100",
        className
      )}
      style={{
        "--an-background": "transparent",
        "--an-background-secondary": "rgba(24, 24, 27, 0.5)",
        "--an-background-tertiary": "rgba(9, 9, 11, 0.5)",
        "--an-foreground": "#fafafa",
        "--an-border-color": "rgba(255, 255, 255, 0.08)",
        "--an-user-message-bg": "rgba(37, 99, 235, 0.3)",
        "--an-user-message-text": "#ffffff",
        "--an-input-background": "rgba(9, 9, 11, 0.6)",
        "--an-input-border-color": "rgba(255, 255, 255, 0.08)",
        "--an-input-color": "#ffffff",
        "--an-send-button-bg": "#10B981",
        "--an-send-button-color": "#ffffff",
        "--an-tool-background": "rgba(24, 24, 27, 0.6)",
        "--an-tool-border-color": "rgba(255, 255, 255, 0.08)",
        "--an-tool-color": "#ffffff",
        "--an-max-width": "100%",
      } as React.CSSProperties}
    >
      {/* Header bar mirroring a premium app */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/40 border-b border-white/5 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
          </div>
          <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase ml-2">Session: book1.xlsx</span>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] text-emerald-400 font-extrabold uppercase tracking-wider">Syncing</span>
        </div>
      </div>

      <div className="flex-1 min-h-0 bg-transparent">
        <RealAgentChat
          messages={messages as unknown as UIMessage[]}
          onSend={onSend}
          {...props}
        />
      </div>
    </div>
  );
}
