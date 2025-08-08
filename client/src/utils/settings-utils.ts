export function isPowerOfTwo(n: number): boolean {
  return n > 0 && (n & (n - 1)) === 0;
}

type Validator = (value: number) => string | null;
export const validators: { [key: string]: Validator } = {
  buffer: (value) => {
    if (!isPowerOfTwo(value) || value < 32 || value > 32768) {
      return "Buffer size must be a power of 2 between 32 and 32768.";
    }
    return null;
  },
  minVolume: (value) => {
    if (value > 0) {
      return "Min volume must be less than or equal to 0.";
    }
    return null;
  },
  clarity: (value) => {
    if (value < 1 || value > 100) {
      return "Min clarity must be between 1 and 100.";
    }
    return null;
  },
  minPitch: (value) => {
    if (value < 0 || value > 99999) {
      return "Min pitch must be between 0 and 99999.";
    }
    return null;
  },
  maxPitch: (value) => {
    if (value < 0 || value > 99999) {
      return "Max pitch must be between 0 and 99999.";
    }
    return null;
  },
};
