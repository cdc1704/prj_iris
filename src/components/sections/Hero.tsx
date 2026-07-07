"use client";
import { useEffect, useState } from "react";
import { useExperience } from "@/context/ExperienceContext";
import { motion, AnimatePresence } from "framer-motion";
import { IRIS_CONFIG } from "@/config/iris.config";

export default function Hero() {
  const { isEyeOpened, openEye } = useExperience();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (isEyeOpened) return;
    
    // Storyboard dei testi iniziali
    const timer1 = setTimeout(() => setStep(1), 2000); // Mostra "Chiudi gli occhi"
    const timer2 = setTimeout(() => setStep(2), 4500); // Mostra "Ora riaprili" e sblocca l'interazione
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isEyeOpened]);

  return (
    <div className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center font-display select-none">
      <AnimatePresence mode="wait">
        {step === 1 && !isEyeOpened && (
          <motion.h1
            key="text1"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 1.5 }}
            className="text-2xl md:text-4xl text-[#E3F2FD] tracking-[0.2em] uppercase font-light text-center px-4"
          >
            Chiudi gli occhi.
          </motion.h1>
        )}

        {step === 2 && !isEyeOpened && (
          <motion.div
            key="text2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-8 text-center px-4"
          >
            <motion.h1 
              initial={{ filter: "blur(5px)" }}
              animate={{ filter: "blur(0px)" }}
              transition={{ duration: 1 }}
              className="text-3xl md:text-5xl text-white tracking-[0.25em] uppercase font-bold"
            >
              Ora riaprili.
            </motion.h1>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 229, 255, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={openEye}
              className="mt-4 px-8 py-3 rounded-full border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.03)] backdrop-blur-md text-xs tracking-[0.3em] uppercase text-[#00E5FF] transition-all duration-300"
            >
              Entra nell'esperienza
            </motion.button>
          </motion.div>
        )}

        {isEyeOpened && (
          <motion.div
            key="site-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="absolute bottom-16 left-8 md:left-16 max-w-lg pointer-events-none"
          >
            <p className="text-xs text-[#00E5FF] tracking-[0.4em] uppercase font-semibold mb-2">
              {IRIS_CONFIG.brand.name}
            </p>
            <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight leading-none uppercase">
              Every great vision begins with a single look.
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
