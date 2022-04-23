import axios, { Axios } from "axios";

export default class Weather {
  api: Axios;
  apiKey: string;
  constructor() {
    this.api = axios.create({
      baseURL: "http://api.openweathermap.org/",
    });
    this.apiKey = "79c772f1fb4e519778b5982a7ac8991c";
  }

  async geocoding(q: string) {
    return await this.api.get("/geo/1.0/direct", {
      params: {
        q,
        appid: this.apiKey,
      },
    });
  }
}
