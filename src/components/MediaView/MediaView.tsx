import { DekApi, usePluginState } from "@appkit/dek-plugin";
import { Cell, Grid, IconButton, theme, View } from "@appkit/dek-ui";
import { useEffect, useMemo, useState } from "react";
import { mediaPlayerPlayNextTrack, mediaPlayerSetState } from "../../api";
import transformMediaData from "../../api/transforms/transformMediaData";
import useEntity from "../../hooks/useEntity";
import CoverArt from "./CoverArt/CoverArt";
import MediaTrack from "./MediaTrack/MediaTrack";
import { Album, Artist, ControlSpacer, Title } from "./MediaView.styled";
import { ThemeProvider } from "styled-components";
import { hasFeature } from "../../api/media";

type Props = {
  api: DekApi;
  entityId: string;
  showLargeContent?: boolean;
};

const MediaView = ({ api, entityId, showLargeContent = false }: Props) => {
  const entity = useEntity(entityId);
  const [loading, setLoading] = useState(false);
  const [coverArtUrl, setCoverArtUrl] = useState("");
  const [playingState, setPlayingState] = useState("");
  const [lastAlbumArt, setLastAlbumArt] = usePluginState(
    api,
    "last-album-art",
    ""
  );
  const media = useMemo(() => transformMediaData(entity), [entity]);

  useEffect(() => {
    const albumArtKey = `${entityId}-${media.album}-${media.artist}-${media.title}`;
    const albumArtUrl = media && media.albumArtUrl;

    if (!albumArtUrl && !coverArtUrl) {
      if (lastAlbumArt.startsWith(albumArtKey)) {
        setCoverArtUrl(lastAlbumArt.substring(albumArtKey.length));
      }
    } else if (albumArtUrl && (!coverArtUrl || albumArtUrl !== coverArtUrl)) {
      setCoverArtUrl(albumArtUrl);
      setLastAlbumArt(`${albumArtKey}${albumArtUrl}`);
    }
  }, [
    coverArtUrl,
    entityId,
    media,
    lastAlbumArt,
    playingState,
    setLastAlbumArt,
  ]);

  useEffect(() => {
    setPlayingState(media.state);
  }, [media.state]);

  const handleStateToggle = async () => {
    if (!media || loading) {
      return;
    }
    setLoading(true);
    const newState = media.state === "playing" ? "paused" : "playing";
    setPlayingState(newState);
    await mediaPlayerSetState(entityId, newState);
    setLoading(false);
  };

  const handleNext = async () => {
    if (!media) {
      return;
    }
    setLoading(true);
    await mediaPlayerPlayNextTrack(entityId);
    setLoading(false);
  };

  if (!media) {
    return null;
  }

  const iconName = playingState === "playing" ? "MdPause" : "MdPlayArrow";
  const supportedFeatures = media.supportedFeatures || 0;

  return (
    <ThemeProvider theme={theme}>
      <View label="media-view-2">
        <Grid cols="auto minmax(0, 1fr)">
          <Cell paddingLeft={20}>
            <CoverArt
              url={coverArtUrl}
              showLargeContent={showLargeContent}
              onClick={handleStateToggle}
            />
          </Cell>
          <Cell paddingLeft={20} paddingTop={10}>
            <View direction="vert" collapse width="calc(100% - 50px)">
              <Title $large={showLargeContent}>{media.title}</Title>
              <Artist $large={showLargeContent}>{media.artist}</Artist>
              <Album $large={showLargeContent}>{media.album}</Album>
            </View>
            <MediaTrack entity={media} />
            <View paddingTop={0} collapse>
              {hasFeature(supportedFeatures, "Play Media") &&
                hasFeature(supportedFeatures, "Pause") && (
                  <IconButton
                    variant={"clear"}
                    width={50}
                    height={50}
                    onClick={handleStateToggle}
                    iconName={iconName}
                    loading={false}
                    disabled={loading}
                  />
                )}
              <ControlSpacer></ControlSpacer>
              {hasFeature(supportedFeatures, "Next Track") && (
                <IconButton
                  variant={"clear"}
                  width={50}
                  height={50}
                  onClick={handleNext}
                  iconName={"MdSkipNext"}
                  iconColor="#fff"
                  loading={false}
                  disabled={loading}
                />
              )}
            </View>
          </Cell>
        </Grid>
      </View>
    </ThemeProvider>
  );
};

export default MediaView;
