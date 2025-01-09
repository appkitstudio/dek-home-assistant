import axios, { AxiosResponse } from "axios";
import transformWeatherData from "./transforms/transformWeatherData";
import { ApiResult, WeatherData } from "./types";
import tryAsync from "../lib/utils/tryAsync";
import extractErrorMessage from "../lib/utils/extractErrorMessage";
import { activeConnection } from "./ha";

export const getWeather = async (): Promise<ApiResult<WeatherData>> => {
  if (!activeConnection || !activeConnection.instance) {
    throw new Error("No active connection to Home Assistant");
  }

  const { serverUri, accessToken } = activeConnection;

  try {
    const res = await tryAsync<AxiosResponse<any>>(
      () =>
        axios.get(`${serverUri}/api/states/weather.forecast_home`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      "getWeather"
    );
    // console.log('Get Weather', res);
    return {
      data: transformWeatherData(res?.data),
      success: true,
    };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err),
    };
  }
};
