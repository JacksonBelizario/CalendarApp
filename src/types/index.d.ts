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
export interface City {
  name: string;
  lat: number;
  lon: number;
}

export interface Weather {
  temp: {
    day: number;
    max: number;
    min: number;
  };
  description: string;
  icon: string;
  humidity: number;
  wind_speed: number;
  uvi: number;
}
export interface Event {
  id: string | null;
  date: string;
  time: string;
  reminder: string;
  city?: City;
  color: Color;
  weather?: Weather;
}
