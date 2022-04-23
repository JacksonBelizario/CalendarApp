export interface SelectedDate {
  month: number;
  year: number;
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
}

type Color = "blue" | "red" | "orange" | "green" | "purple" | "gray";

export interface Event {
  id: string | null;
  date: string;
  time: string;
  reminder: string;
  city: string;
  color: Color;
}
