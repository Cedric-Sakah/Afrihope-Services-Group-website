import { Archivo, Source_Serif_4 } from "next/font/google";

/**
 * Self-hosted via next/font — no external font requests at runtime.
 * Archivo: sans display face for headings and UI chrome.
 * Source Serif 4: serif body face for long-form reading copy.
 */
export const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});
