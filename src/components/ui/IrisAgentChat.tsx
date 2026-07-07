"use client"

import { AgentChat, createAgentChat } from "@21st-sdk/nextjs"
import { useChat } from "@ai-sdk/react"
import theme from "@/app/theme.json"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

const chat = createAgentChat({
  agent: "my-agent",
  tokenUrl: "/api/an-token",
})

export default function IrisAgentChat() {
  const { messages, input, handleInputChange, handleSubmit, status, stop, error } =
    useChat({ chat } as any) as any

  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-[#00E5FF] text-[#070707] flex items-center justify-center shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:shadow-[0_0_50px_rgba(0,229,255,0.6)] transition-shadow duration-500"
        aria-label="Open IRIS Assistant"
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
            <path d="M12 8v1M12 15v1M8 12H7M17 12h-1M9.17 9.17l-.7-.7M15.53 15.53l-.7-.7M9.17 14.83l-.7.7M15.53 8.47l-.7.7"/>
          </svg>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-28 right-8 z-50 w-[400px] h-[600px] rounded-[2rem] overflow-hidden border border-white/[0.06] backdrop-blur-2xl bg-[#070707]/90 shadow-[0_32px_80px_-8px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.04)]"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.05]">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_rgba(0,229,255,0.8)] animate-pulse" />
                <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/60">IRIS // AI Assistant</span>
              </div>
            </div>

            {/* AgentChat component */}
            <div className="h-[calc(100%-57px)]">
              <AgentChat
                messages={messages as any}
                onSend={() => handleSubmit()}
                status={status}
                onStop={stop}
                error={error ?? undefined}
                theme={theme as any}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
