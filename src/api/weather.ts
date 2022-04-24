import type { Weather } from "@/types";
import axios, { Axios } from "axios";
import { addDays, subDays, isBefore, isAfter, isSameDay } from "date-fns";

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
  async get(
    lat: number,
    lon: number,
    date: Date
  ): Promise<Weather | undefined> {
    const today = new Date();
    const pastDay = subDays(new Date(), 6);
    const lastDay = addDays(new Date(), 7);

    if (isBefore(date, pastDay) || isAfter(date, lastDay)) {
      return undefined;
    }

    if (isSameDay(date, today) || isAfter(date, today)) {
      /**
       * I didn't find the weather history for free to get specific days
       * So, I used this api which returns weather for the current week
       */
      const { data } = await this.api.get("/data/2.5/onecall", {
        params: {
          lat,
          lon,
          units: "metric",
          exclude: "alerts,minutely,hourly",
          appid: this.apiKey,
        },
      });

      const result = data.daily.find((item: WeatherResult) =>
        isSameDay(new Date(item.dt * 1000), date)
      );

      if (!result) {
        return undefined;
      }

      return {
        temp: {
          day: Math.trunc(result.temp.day),
          max: Math.trunc(result.temp.max),
          min: Math.trunc(result.temp.min),
        },
        description: result.weather[0].description,
        icon: result.weather[0].icon,
        humidity: result.humidity,
        wind_speed: result.wind_speed,
        uvi: result.uvi,
      };
    } else {
      const { data } = await this.api.get("/data/2.5/onecall/timemachine", {
        params: {
          lat,
          lon,
          dt: date.valueOf() / 1000,
          units: "metric",
          appid: this.apiKey,
        },
      });

      if (!data.current) {
        return undefined;
      }

      return {
        temp: {
          day: Math.trunc(data.current.temp),
          max: null,
          min: null,
        },
        description: data.current.weather[0].description,
        icon: data.current.weather[0].icon,
        humidity: data.current.humidity,
        wind_speed: data.current.wind_speed,
        uvi: data.current.uvi,
      };
    }
  }
}
