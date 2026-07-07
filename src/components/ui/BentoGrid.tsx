"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MagicCard } from "./MagicCard";
import { ScrambleText } from "./ScrambleText";

const TelemetryGraph = () => {
  return (
    <div className="flex items-end gap-1 h-24 mt-auto opacity-80">
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.div
          key={i}
          className="flex-1 bg-cyan-500"
          initial={{ height: "10%" }}
          animate={{ height: `${Math.random() * 80 + 20}%` }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.05,
          }}
          style={{
            boxShadow: "0 0 10px rgba(0, 229, 255, 0.5)",
          }}
        />
      ))}
    </div>
  );
};

const RadarScan = () => {
  return (
    <div className="relative w-full aspect-square border border-cyan-500/30 rounded-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 rounded-full border border-cyan-500/10 scale-50" />
      <div className="absolute inset-0 rounded-full border border-cyan-500/10 scale-75" />
      <div className="w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_#00E5FF]" />
      
      {/* Radar sweep */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-1/2 h-1/2 origin-top-left"
        style={{
          background: "conic-gradient(from 0deg, rgba(0, 229, 255, 0.4) 0deg, transparent 60deg)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export const BentoGrid = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[280px]">
      
      {/* 1. Main Telemetry (Large) */}
      <MagicCard className="md:col-span-2 row-span-2 flex flex-col p-8 relative overflow-hidden backdrop-blur-xl bg-black/40 border-white/10">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 rounded-full border border-cyan-400/30 flex items-center justify-center bg-cyan-400/5">
            <span className="text-cyan-400 font-mono-ui text-xl">
              <ScrambleText text="TX" delay={100} />
            </span>
          </div>
          <div className="text-right">
            <div className="text-cyan-400 font-mono-ui text-xs tracking-widest mb-1">STATO DI RETE</div>
            <div className="text-white font-mono-ui text-sm"><ScrambleText text="SINCRONIZZATO" delay={300} /></div>
          </div>
        </div>
        
        <h3 className="font-editorial text-4xl mb-2 text-white">Telemetria Neurale</h3>
        <p className="text-gray-400 text-sm max-w-md leading-relaxed font-mono-ui mb-8">
          Flusso di dati ottici in tempo reale. Analisi pattern Wavefront e topografia della cornea stabilizzata.
        </p>

        <TelemetryGraph />
      </MagicCard>

      {/* 2. Biometrics (Standard) */}
      <MagicCard className="md:col-span-1 flex flex-col p-6 backdrop-blur-xl bg-black/40 border-white/10">
        <div className="font-mono-ui text-cyan-400 text-xs tracking-widest mb-4 border-b border-white/10 pb-2">
          BIOMETRIA
        </div>
        <div className="flex flex-col gap-4 mt-auto">
          <div>
            <div className="text-xs text-gray-500 font-mono-ui mb-1">PRESSIONE I.O.</div>
            <div className="text-2xl text-white font-mono-ui"><ScrambleText text="14.2 mmHg" delay={400} /></div>
          </div>
          <div>
            <div className="text-xs text-gray-500 font-mono-ui mb-1">SPESSORE CORNEALE</div>
            <div className="text-2xl text-white font-mono-ui"><ScrambleText text="542 µm" delay={500} /></div>
          </div>
        </div>
      </MagicCard>

      {/* 3. Radar / Target (Standard) */}
      <MagicCard className="md:col-span-1 flex flex-col items-center justify-center p-6 backdrop-blur-xl bg-black/40 border-white/10">
        <div className="absolute top-4 left-4 font-mono-ui text-xs text-cyan-400">TRACKING</div>
        <div className="w-full max-w-[160px] mt-4">
          <RadarScan />
        </div>
      </MagicCard>
      
      {/* 4. Log Stream (Wide) */}
      <MagicCard className="md:col-span-2 min-h-[180px] flex flex-col p-6 backdrop-blur-xl bg-black/40 border-white/10 overflow-hidden">
        <div className="font-mono-ui text-cyan-400 text-xs tracking-widest mb-4">/// EVENT LOGS</div>
        <div className="font-mono-ui text-xs text-green-400/80 flex flex-col gap-2">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>{">"} Inizializzazione OCT 3D... [OK]</motion.div>
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>{">"} Calibrazione aberrometro... [OK]</motion.div>
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>{">"} Scansione mappa epiteliale in corso...</motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>_</motion.div>
        </div>
      </MagicCard>

    </div>
  );
};
