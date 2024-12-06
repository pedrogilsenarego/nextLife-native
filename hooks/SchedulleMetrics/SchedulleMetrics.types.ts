export type MonthGroup = {
  monthLabel: string;
  events: SchedulleEvent[];
  year: number;
  month: number;
};

export type SchedulleEvent = {
  title: string;
  value?: number | null;
  category?: string;
  date: Date;
};
