import { WeatherType } from "../../../api/types";
import { Container } from "./WeatherIcon.styled";

import ClearNightIcon from "./assets/clear-night.svg?react";
import CloudyIcon from "./assets/cloudy.svg?react";
import ExceptionalIcon from "./assets/exceptional.svg?react";
import FogIcon from "./assets/fog.svg?react";
import HailIcon from "./assets/hail.svg?react";
import LightningRainingIcon from "./assets/lightning-raining.svg?react";
import LightninIcon from "./assets/lightning.svg?react";
import PartlyCloudyIcon from "./assets/partly-cloudy.svg?react";
import PouringIcon from "./assets/pouring.svg?react";
import RainyIcon from "./assets/rainy.svg?react";
import SnowRainyIcon from "./assets/snowy-rainy.svg?react";
import SnowyIcon from "./assets/snowy.svg?react";
import SunnyIcon from "./assets/sunny.svg?react";
import UnknownIcon from "./assets/unknown.svg?react";
import WindyVariantIcon from "./assets/windy-variant.svg?react";
import WindyIcon from "./assets/windy.svg?react";

type IconInfo = {
  element: React.ReactElement;
  top: number;
  left: number;
};

type Props = {
  type: WeatherType;
};

const WeatherIcon = ({ type }: Props) => {
  const baseTop = 0;
  const baseLeft = -7;
  const getWeatherTypeInfo = (type: WeatherType): IconInfo => {
    switch (type) {
      case "sunny":
        return { element: <SunnyIcon />, top: baseTop, left: baseLeft };
      case "cloudy":
        return { element: <CloudyIcon />, top: baseTop, left: baseLeft };
      case "partlycloudy":
        return { element: <PartlyCloudyIcon />, top: baseTop, left: baseLeft };
      case "clear-night":
        return { element: <ClearNightIcon />, top: baseTop, left: baseLeft };
      case "fog":
        return { element: <FogIcon />, top: baseTop - 6, left: baseLeft };
      case "hail":
        return { element: <HailIcon />, top: baseTop - 3, left: baseLeft };
      case "lightning":
        return { element: <LightninIcon />, top: baseTop - 3, left: baseLeft };
      case "lightning-raining":
        return {
          element: <LightningRainingIcon />,
          top: baseTop - 3,
          left: baseLeft,
        };
      case "pouring":
        return { element: <PouringIcon />, top: baseTop - 3, left: baseLeft };
      case "rainy":
        return { element: <RainyIcon />, top: baseTop - 3, left: baseLeft };
      case "snowy":
        return { element: <SnowyIcon />, top: baseTop - 3, left: baseLeft };
      case "snowy-rainy":
        return { element: <SnowRainyIcon />, top: baseTop - 3, left: baseLeft };
      case "windy":
        return { element: <WindyIcon />, top: baseTop, left: baseLeft };
      case "windy-variant":
        return { element: <WindyVariantIcon />, top: baseTop, left: baseLeft };
      case "exceptional":
        return { element: <ExceptionalIcon />, top: baseTop, left: baseLeft };
      default:
        return { element: <UnknownIcon />, top: baseTop, left: baseLeft };
    }
  };

  const info = getWeatherTypeInfo(type);
  return (
    <Container aria-label="weather-icon" $top={info.top} $left={info.left}>
      {info.element}
    </Container>
  );
};

export default WeatherIcon;
