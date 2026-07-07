"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

export type IntroPhase = 'veil' | 'pulse' | 'text1' | 'text2' | 'eye' | 'hud' | 'open';

interface ExperienceContextType {
  isEyeOpened: boolean;
  openEye: () => void;
  currentChapter: number;
  setCurrentChapter: (chapter: number) => void;
  introPhase: IntroPhase;
  setIntroPhase: (phase: IntroPhase) => void;
}

const ExperienceContext = createContext<ExperienceContextType | undefined>(undefined);

export const ExperienceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEyeOpened, setIsEyeOpened] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [introPhase, setIntroPhase] = useState<IntroPhase>('veil');

  const openEye = useCallback(() => {
    setIsEyeOpened(true);
    setIntroPhase('open');
  }, []);

  return (
    <ExperienceContext.Provider value={{
      isEyeOpened, openEye,
      currentChapter, setCurrentChapter,
      introPhase, setIntroPhase,
    }}>
      {children}
    </ExperienceContext.Provider>
  );
};

export const useExperience = () => {
  const context = useContext(ExperienceContext);
  if (!context) throw new Error("useExperience deve essere usato dentro ExperienceProvider");
  return context;
};
