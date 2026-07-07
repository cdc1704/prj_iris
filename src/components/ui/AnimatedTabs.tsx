"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  {
    id: "miopia",
    title: "Miopia",
    description: "Difficoltà a mettere a fuoco gli oggetti lontani. L'occhio è più lungo del normale o la cornea è troppo curva, causando la focalizzazione dell'immagine davanti alla retina.",
    icon: "O"
  },
  {
    id: "ipermetropia",
    title: "Ipermetropia",
    description: "Fatica nella visione da vicino. L'occhio è più corto del normale, portando le immagini a focalizzarsi teoricamente dietro la retina.",
    icon: "👁️"
  },
  {
    id: "astigmatismo",
    title: "Astigmatismo",
    description: "Visione sfocata a tutte le distanze. Causato da una curvatura irregolare della cornea (a forma di pallone da rugby anziché sferica).",
    icon: "⚯"
  },
  {
    id: "presbiopia",
    title: "Presbiopia",
    description: "Naturale perdita di elasticità del cristallino legata all'età. Rende difficile la messa a fuoco per la lettura e le attività ravvicinate.",
    icon: "📖"
  }
];

export const AnimatedTabs = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const activeContent = tabs.find((t) => t.id === activeTab);

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-8">
      {/* Tab Pills */}
      <div className="flex flex-wrap gap-2 p-1 bg-white/[0.03] border border-white/5 rounded-full relative w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-6 py-2.5 rounded-full text-sm font-mono-ui transition-colors duration-300 z-10 ${
              activeTab === tab.id ? "text-black" : "text-gray-400 hover:text-white"
            }`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab-pill"
                className="absolute inset-0 bg-cyan-400 rounded-full -z-10 shadow-[0_0_15px_rgba(0,229,255,0.4)]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {tab.title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="relative min-h-[160px] p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl opacity-80">{activeContent?.icon}</span>
              <h4 className="font-editorial text-3xl text-white">{activeContent?.title}</h4>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base max-w-xl">
              {activeContent?.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
