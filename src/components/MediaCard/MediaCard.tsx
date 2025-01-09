import { ButtonVariant, CardButton } from "@appkit/dek-ui";
import { useEffect, useState } from "react";
import { mediaPlayerSetState } from "../../api";
import transformMediaData from "../../api/transforms/transformMediaData";
import useEntities from "../../hooks/useEntities";

type Props = {
  entityId: string;
  title?: string;
  variant?: ButtonVariant;
  square?: boolean;
};

const MediaCard = ({
  entityId,
  title = "Media",
  variant,
  square = true,
}: Props) => {
  const entities = useEntities();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState("");

  const entity = transformMediaData(entities[entityId]);

  useEffect(() => {
    setState(entity.state);
  }, [entity.state]);

  const handleStateToggle = async () => {
    if (!entity || loading) {
      return;
    }
    setLoading(true);
    const newState = entity.state === "playing" ? "paused" : "playing";
    setState(newState);
    await mediaPlayerSetState(entityId, newState);
    setLoading(false);
  };

  const iconName = state === "playing" ? "MdPause" : "MdPlayArrow";
  const disabled = !entity;

  return (
    <CardButton
      variant={variant}
      disabled={loading || disabled}
      title={title}
      onClick={handleStateToggle}
      iconName={iconName}
      loading={loading}
      square={square}
    />
  );
};

export default MediaCard;
