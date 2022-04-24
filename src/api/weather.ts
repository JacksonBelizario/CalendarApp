import axios, { Axios } from "axios";
import { addDays, isBefore, isAfter, isSameDay } from "date-fns";

interface GeocodeResult {
  name: string;
  state: string;
  country: string;
  lat: number;
  lon: number;
}

interface WeatherResult {
  dt: number;
  temp: {
    day: number;
    max: number;
    min: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  humidity: number;
  wind_speed: number;
  uvi: number;
}

export default class WeatherApi {
  api: Axios;
  apiKey: string;

  constructor() {
    this.api = axios.create({
      baseURL: "https://api.openweathermap.org/",
    });
    this.apiKey = "79c772f1fb4e519778b5982a7ac8991c";
  }

  /**
   * https://openweathermap.org/api/geocoding-api
   */
  async geocoding(q: string): Promise<GeocodeResult[]> {
    const { data } = await this.api.get("/geo/1.0/direct", {
      params: {
        q,
        appid: this.apiKey,
      },
    });

    return data;
  }

  /**
   * https://openweathermap.org/api/one-call-api#current
   */
  async current(
    lat: number,
    lon: number,
    date: Date
  ): Promise<WeatherResult | null> {
    const today = new Date();
    const lastDay = addDays(new Date(), 7);
    /**
     * I didn't find the weather history for free to get another days
     * So, I used this api which returns weather for the current week
     */
    if (
      !isSameDay(date, today) &&
      (isBefore(date, today) || isAfter(date, lastDay))
    ) {
      return null;
    }
    const { data } = await this.api.get("/data/2.5/onecall", {
      params: {
        lat,
        lon,
        units: "metric",
        exclude: "alerts,minutely,hourly",
        appid: this.apiKey,
      },
    });

    return data.daily.find((item: WeatherResult) =>
      isSameDay(new Date(item.dt * 1000), date)
    );
  }
}
