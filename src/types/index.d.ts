export interface SelectedDate {
  month: number;
  year: number;
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
}

export interface Event {
  date: string;
  time: string;
  reminder: string;
  city: string;
  color: string;
}
