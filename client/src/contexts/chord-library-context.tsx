import { createContext, useContext } from "react";

import type { ChordLibraryContextType } from "@/types/chord-types";

export const ChordLibraryContext =
  createContext<ChordLibraryContextType | null>(null);

export function useChordLibrary() {
  const ctx = useContext(ChordLibraryContext);
  if (!ctx)
    throw new Error("useChordLibrary must be used within ChordLibraryProvider");
  return ctx;
}
