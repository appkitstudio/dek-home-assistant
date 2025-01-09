import { activeConnection, invokeService } from "./ha";
import { MediaState } from "./types";

export async function mediaPlayerSetState(
  entityId: string,
  state: MediaState
): Promise<unknown> {
  const service = state === "playing" ? "media_play" : "media_pause";
  return invokeService("media_player", service, entityId);
}

export async function mediaPlayerPlayNextTrack(
  entityId: string
): Promise<unknown> {
  return invokeService("media_player", "media_next_track", entityId);
}

export async function toggleState(entityId: string): Promise<unknown> {
  if (activeConnection && activeConnection.instance) {
    return await invokeService("homeassistant", "toggle", entityId);
  }
}
