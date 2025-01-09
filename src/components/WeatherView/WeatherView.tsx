import { Text, theme, View } from "@appkit/dek-ui";
import React, { useEffect } from "react";
import WeatherIcon from "./WeatherIcon/WeatherIcon";
import transformWeatherData from "../../api/transforms/transformWeatherData";
import { WeatherData } from "../../api/types";
import useEntities from "../../hooks/useEntities";
import { DekApi } from "@appkit/dek-plugin";
import { ThemeProvider } from "styled-components";

type Props = {
  dekApi: DekApi;
};

const WeatherComponent = ({ dekApi }: Props) => {
  const entities = useEntities();
  const [weatherData, setWeatherData] = React.useState<WeatherData>();

  const data = transformWeatherData(entities["weather.forecast_home"]);

  useEffect(() => {
    if (
      data &&
      (!weatherData ||
        data.temperature !== weatherData.temperature ||
        data.type !== weatherData.type)
    ) {
      if (weatherData) {
        dekApi.trace("Weather changed", data);
      }
      setWeatherData(data);
    }
  }, [data, weatherData, dekApi]);

  if (!weatherData) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <View label="weather-view" direction="horz" valign="center">
        {weatherData.type !== undefined && (
          <WeatherIcon type={weatherData.type} />
        )}
        {!!weatherData.temperature && (
          <Text label="temperature" size="xxlarge" color="xsubtle">
            {weatherData.temperature}&deg;
          </Text>
        )}
      </View>
    </ThemeProvider>
  );
};

export default WeatherComponent;
