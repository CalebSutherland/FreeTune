export type Tuning = {
  name: string;
  notes: string[];
};

export type Category = {
  name: string;
  tunings: Tuning[];
};

export type Instrument = {
  name: string;
  soundfontName: string;
  img: string;
  left_string_count: number;
  standard: Tuning;
  categories: Category[];
};

export type InstrumentFamily = {
  name: string;
  instruments: Instrument[];
};

export type TunerSettings = {
  bufferSize: number;
  minVolumeDecibels: number;
  minClarityPercent: number;
  minPitch: number;
  maxPitch: number;
};
