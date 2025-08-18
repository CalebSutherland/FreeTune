import type { Tuning } from "../types/types";

export function isActiveTuning(a: Tuning, b: Tuning) {
  return (
    a.name === b.name && JSON.stringify(a.notes) === JSON.stringify(b.notes)
  );
}
