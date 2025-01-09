import { activeConnection } from "../ha";
import { MediaData } from "../types";

function transformUrl(serverUri: string, path?: string): string {
  if (!path) {
    return "";
  }
  return `${serverUri}${path}`;
}

function transformMediaData(data: any): MediaData {
  if (!activeConnection || !activeConnection.instance || !data) {
    return {
      name: "Unknown",
      state: "unknown",
      volume: 0,
      albumArtUrl: "",
      duration: 0,
      position: 0,
      positionUpdatedAt: 0,
      title: "unknown",
      artist: "Unknown",
      album: "Unknown",
      supportedFeatures: 0,
    };
  }
  return {
    state: data.state,
    volume: data.volume_level,
    name: data.attributes.friendly_name,
    albumArtUrl: transformUrl(
      activeConnection.serverUri,
      data.attributes.entity_picture
    ),
    duration: data.attributes.media_duration,
    position: data.attributes.media_position,
    positionUpdatedAt: new Date(
      data.attributes.media_position_updated_at
    ).getTime(),
    title: data.attributes.media_title,
    artist: data.attributes.media_artist,
    album: data.attributes.media_album_name,
    supportedFeatures: data.attributes.supported_features,
  };
}

export default transformMediaData;
