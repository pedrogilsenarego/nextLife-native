export type MonthGroup = {
  monthLabel: string;
  events: SchedulleEvent[];
  year: number;
  month: number;
};

export type SchedulleEvent = {
  title: string;
  value?: number | null | string;
  category?: string;
  date: Date;
  endDate?: Date;
  content?: React.ReactNode;
};
