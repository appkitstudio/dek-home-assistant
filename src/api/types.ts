import { Connection, UnsubscribeFunc } from "home-assistant-js-websocket";

export type ApiResult<T = any> = {
  data?: T;
  success: boolean;
  error?: string;
};

export type HAConnection = {
  instance: Connection | null;
  entitiesSubscription: UnsubscribeFunc | null;
  serverUri: string;
  accessToken: string;
};

export type MediaState = "idle" | "playing" | "paused" | "unknown";

export type MediaData = {
  name: string;
  state: MediaState;
  volume: number;
  albumArtUrl: string;
  duration: number;
  position: number;
  positionUpdatedAt: number;
  title: string;
  artist: string;
  album: string;
  supportedFeatures: number;
};

export type SwitchState = "off" | "on" | "unknown";

export type SwitchData = {
  state: SwitchState;
};

export type WeatherData = {
  type: WeatherType;
  temperature: number;
};

export type WeatherType =
  | "sunny"
  | "cloudy"
  | "partlycloudy"
  | "clear-night"
  | "fog"
  | "hail"
  | "lightning"
  | "lightning-raining"
  | "pouring"
  | "rainy"
  | "snowy"
  | "snowy-rainy"
  | "windy"
  | "windy-variant"
  | "exceptional"
  | "unknown";
