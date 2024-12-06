export type MonthGroup = {
  monthLabel: string;
  events: SchedulleEvent[];
  year: number;
  month: number;
};

export type SchedulleEvent = {
  title: string;
  value?: number;
  category?: string;
  date: Date;
};
