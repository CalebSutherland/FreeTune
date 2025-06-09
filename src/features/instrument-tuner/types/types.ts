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
  img: string;
  string_count: number;
  standard: Tuning;
  categories: Category[];
};
