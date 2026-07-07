"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";

type Field = "name" | "phone" | "date" | "time" | null;

function FieldInput({
  label,
  tag,
  type = "text",
  placeholder,
  fieldId,
  focusedField,
  setFocused,
  required = true,
  isSelect = false,
  children,
}: {
  label: string;
  tag: string;
  type?: string;
  placeholder?: string;
  fieldId: Field;
  focusedField: Field;
  setFocused: (v: Field) => void;
  required?: boolean;
  isSelect?: boolean;
  children?: React.ReactNode;
}) {
  const active = focusedField === fieldId;
  const inputClass = `w-full h-14 bg-transparent border-b text-base font-light text-white placeholder-white/15 focus:outline-none transition-all duration-500 ease-out appearance-none cursor-pointer ${
    active ? "border-[#00E5FF]/60" : "border-white/[0.07] hover:border-white/20"
  }`;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <label className={`text-[9px] font-mono tracking-[0.45em] uppercase transition-colors duration-500 ${active ? "text-[#00E5FF]" : "text-white/30"}`}>
          {label}
        </label>
        <span className={`text-[8px] font-mono tracking-[0.3em] uppercase transition-colors duration-500 ${active ? "text-[#00E5FF]/50" : "text-white/15"}`}>
          {tag}
        </span>
      </div>

      {isSelect ? (
        <select
          required={required}
          onFocus={() => setFocused(fieldId)}
          onBlur={() => setFocused(null)}
          className={`${inputClass} [color-scheme:dark]`}
          defaultValue=""
        >
          {children}
        </select>
      ) : (
        <input
          required={required}
          type={type}
          placeholder={placeholder}
          onFocus={() => setFocused(fieldId)}
          onBlur={() => setFocused(null)}
          className={`${inputClass} ${type === "date" ? "[color-scheme:dark]" : ""}`}
        />
      )}

      {/* Focus underline accent — surgically precise */}
      <div className={`h-[1px] rounded-full transition-all duration-500 ease-out ${active ? "bg-[#00E5FF] opacity-60 shadow-[0_0_8px_rgba(0,229,255,0.5)]" : "bg-transparent"}`} />
    </div>
  );
}

export default function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<Field>(null);

  return (
    <section className="relative z-10 w-full min-h-screen flex items-center px-6 md:px-20 py-40 overflow-hidden">

      {/* Ambient HUD rings — purely decorative */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        {[600, 440, 280].map((size, i) => (
          <motion.div
            key={size}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 60 - i * 10, repeat: Infinity, ease: "linear" }}
            className="absolute rounded-full border border-dashed border-[#00E5FF]/[0.04]"
            style={{ width: size, height: size }}
          />
        ))}
        {/* Cross-hair axes */}
        <div className="absolute w-[800px] h-[0.5px] bg-gradient-to-r from-transparent via-[#00E5FF]/[0.07] to-transparent" />
        <div className="absolute h-[800px] w-[0.5px] bg-gradient-to-b from-transparent via-[#00E5FF]/[0.07] to-transparent" />
      </div>

      <div className="max-w-[600px] w-full mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[10px] text-[#00E5FF] tracking-[0.45em] uppercase font-mono block mb-6"
          >
            // ALIGNMENT_PROTOCOL &nbsp; 07.CHAPTER
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.07 }}
            className="text-[clamp(2.6rem,7vw,5.5rem)] font-display font-thin uppercase leading-[0.9] tracking-[-0.02em] text-white"
          >
            Inizia la<br />
            <span className="text-white/22">tua Analisi.</span>
          </motion.h2>
        </div>

        {/* Card */}
        <GlassCard animate className="px-10 py-12 md:px-14 md:py-14">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="flex flex-col gap-10"
              >
                <FieldInput label="Identificazione" tag="REQUIRED" fieldId="name" focusedField={focused} setFocused={setFocused} placeholder="Nome e Cognome" />
                <FieldInput label="Contatto" tag="SECURE" type="tel" fieldId="phone" focusedField={focused} setFocused={setFocused} placeholder="+39 — — —" />

                <div className="grid grid-cols-2 gap-8">
                  <FieldInput label="Data" tag="LOCAL" type="date" fieldId="date" focusedField={focused} setFocused={setFocused} />
                  <FieldInput label="Fascia" tag="SLOT" fieldId="time" focusedField={focused} setFocused={setFocused} isSelect>
                    <option value="" className="bg-[#070707]" disabled></option>
                    <option value="am" className="bg-[#070707]">09 — 13</option>
                    <option value="pm" className="bg-[#070707]">15 — 19</option>
                  </FieldInput>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.015, boxShadow: "0 0 40px rgba(0,229,255,0.22)" }}
                  whileTap={{ scale: 0.985 }}
                  className="w-full h-[56px] mt-4 rounded-2xl border border-[#00E5FF]/30 text-[#00E5FF] font-mono text-[10px] uppercase tracking-[0.5em] bg-[#00E5FF]/[0.03] hover:bg-[#00E5FF]/[0.08] transition-all duration-500 flex items-center justify-center gap-4"
                >
                  <span className="text-[#00E5FF]/40">▶</span>
                  Avvia Protocollo
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-10 py-12 text-center"
              >
                {/* Pulse target reticle */}
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-[#00E5FF]/20 animate-ping" style={{ animationDuration: "2s" }} />
                  <div className="absolute inset-3 rounded-full border border-[#00E5FF]/35" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] shadow-[0_0_16px_rgba(0,229,255,0.8)]" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-light uppercase tracking-[0.15em] text-white mb-4">Focus Acquisito</h3>
                  <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-white/35 leading-relaxed max-w-[240px] mx-auto">
                    Protocollo registrato.<br />Contatto in 24h.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>

      </div>
    </section>
  );
}
