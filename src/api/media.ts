import axios, { AxiosResponse } from "axios";
import transformMediaData from "./transforms/transformMediaData";
import { ApiResult, MediaData, MediaState } from "./types";
import tryAsync from "../lib/utils/tryAsync";
import { activeConnection } from "./ha";

const features: Record<number, string> = {
  1: "Pause",
  2: "Seek",
  4: "Volume Set",
  8: "Volume Mute",
  16: "Previous Track",
  32: "Next Track",
  128: "Turn On",
  256: "Turn Off",
  512: "Play Media",
  1024: "Volume Step",
  2048: "Select Source",
  4096: "Stop",
  8192: "Clear Playlist",
  16384: "Play",
  32768: "Shuffle Set",
  65536: "Select Sound Mode",
  131072: "Browse Media",
  262144: "Repeat Set",
  524288: "Grouping",
};

export function getFeatures(value: number): string[] {
  const featuresArray: string[] = [];
  for (const key in features) {
    if (value & parseInt(key)) {
      featuresArray.push(features[key]);
    }
  }
  return featuresArray;
}

export function hasFeature(value: number, feature: string): boolean {
  for (const key in features) {
    if (features[key] === feature) {
      return !!(value & parseInt(key));
    }
  }
  return false;
}

export const getMedia = async (
  entityId: string
): Promise<ApiResult<MediaData>> => {
  if (!activeConnection || !activeConnection.instance) {
    throw new Error("No active connection to Home Assistant");
  }

  const { serverUri, accessToken } = activeConnection;

  const res = await tryAsync<AxiosResponse<any>>(
    () =>
      axios.get(`${serverUri}/api/states/${entityId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    "getMedia error",
    (msg) => {
      return {
        success: false,
        error: msg,
      };
    }
  );
  return {
    data: transformMediaData(res?.data),
    success: true,
  };
};

export const setMediaPlaybackState = async (
  entityId: string,
  state: MediaState
): Promise<ApiResult<any>> => {
  if (!activeConnection || !activeConnection.instance) {
    throw new Error("No active connection to Home Assistant");
  }

  const { serverUri, accessToken } = activeConnection;

  const cmd = state === "playing" ? "media_play" : "media_pause";
  const res = await tryAsync<AxiosResponse<any>>(
    () =>
      axios.post(
        `${serverUri}/api/services/media_player/${cmd}`,
        {
          entity_id: entityId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ),
    "setMediaPlaybackState error",
    (msg) => {
      return {
        success: false,
        error: msg,
      };
    }
  );
  return {
    data: res?.data,
    success: true,
  };
};

export const setMediaPlaybackNext = async (
  entityId: string
): Promise<ApiResult<any>> => {
  if (!activeConnection || !activeConnection.instance) {
    throw new Error("No active connection to Home Assistant");
  }

  const { serverUri, accessToken } = activeConnection;

  const cmd = "media_next_track";
  const res = await tryAsync<AxiosResponse<any>>(
    () =>
      axios.post(
        `${serverUri}/api/services/media_player/${cmd}`,
        {
          entity_id: entityId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ),
    "setMediaPlaybackNext error",
    (msg) => {
      return {
        success: false,
        error: msg,
      };
    }
  );
  return {
    data: res?.data,
    success: true,
  };
};
