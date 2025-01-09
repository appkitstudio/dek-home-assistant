import { ProgressBar, View, useDateTime } from "@appkit/dek-ui";
import { MediaData } from "../../../api/types";

type Props = {
  entity: MediaData;
};

const MediaTrack = ({ entity }: Props) => {
  const dt = useDateTime();

  // calc percentage of track
  // we use the position and duration returned from HA
  // since there's no updates for track position, we calculate it based on
  // the last update time and current time. we only want to do the calc
  // if we're playing though (as indicated by entity.state, not the state
  // variable)
  const secondsDiff =
    entity.state === "playing"
      ? (dt.getTime() - (entity.positionUpdatedAt || 0)) / 1000
      : 0;
  const position = secondsDiff + (entity.position || 1);
  const duration = entity.duration || 1;
  const percentage = Math.floor((position / duration) * 100);

  return (
    <>
      <View
        paddingTop={40}
        paddingBottom={20}
        collapse
        style={{ maxWidth: 600 }}
      >
        <ProgressBar percentage={percentage} width="80%" />
      </View>
    </>
  );
};

export default MediaTrack;
