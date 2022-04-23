export interface SelectedDate {
  month: number;
  year: number;
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
}
