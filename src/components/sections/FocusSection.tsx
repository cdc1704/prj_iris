"use client";
import { CinematicTitle } from "../ui/CinematicTitle";

export default function FocusSection() {
  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center text-white bg-[#070707] py-24 px-4 md:px-16">
      <div className="max-w-4xl text-center">
         <span className="text-xs text-[#00E5FF] tracking-[0.4em] uppercase font-bold block mb-6">
          Capitolo 03 // La Messa a Fuoco
        </span>
        <CinematicTitle text="Metti a fuoco ciò che conta." />
      </div>
    </section>
  );
}
