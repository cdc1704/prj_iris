import "@/styles/globals.css";
import { Space_Grotesk, Fraunces } from "next/font/google";
import { ExperienceProvider } from "@/context/ExperienceContext";
import { IRIS_CONFIG } from "@/config/iris.config";
import ErrorBoundary from "@/components/utils/ErrorBoundary";
import { MagnifierCursor } from "@/components/ui/MagnifierCursor";
import IrisAgentChat from "@/components/ui/IrisAgentChat";
import SmoothScroll from "@/components/utils/SmoothScroll";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-editorial", weight: ["300", "400"] });

export const metadata = {
  title: IRIS_CONFIG.brand.name,
  description: IRIS_CONFIG.brand.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${spaceGrotesk.variable} ${fraunces.variable}`}>
      <body className="overflow-x-hidden antialiased font-body">
        <ErrorBoundary>
          <ExperienceProvider>
            <SmoothScroll>
              <MagnifierCursor />
              {children}
            </SmoothScroll>
            <IrisAgentChat />
          </ExperienceProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
