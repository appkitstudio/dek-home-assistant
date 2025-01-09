import { ButtonVariant, CardButton } from "@appkit/dek-ui";
import { useState } from "react";
import { toggleState } from "../../api";
import transformSwitchData from "../../api/transforms/transformSwitchData";
import useEntities from "../../hooks/useEntities";

type Props = {
  title: string;
  entityId: string;
  iconName?: string;
  variant?: ButtonVariant;
  square?: boolean;
};

const ToggleCard = ({
  title,
  entityId,
  iconName = "IoMedicalSharp",
  variant = "toggle",
  square = true,
}: Props) => {
  const entities = useEntities();
  const [loading, setLoading] = useState(false);

  const entity = transformSwitchData(entities[entityId]);

  const handleToggle = async () => {
    setLoading(true);
    await toggleState(entityId);
    setLoading(false);
  };

  const disabled = !entity;
  const active = entity && entity.state === "on";

  return (
    <CardButton
      variant={variant}
      active={active}
      disabled={disabled || loading}
      title={title}
      onClick={handleToggle}
      colorActive="#000"
      backColorActive={"#fff"}
      iconName={iconName}
      iconBackColor={active ? "#ffcc01" : "#ffffff22"}
      iconColor={active ? "#fff" : "#fff"}
      iconColorActive="#fff"
      loading={loading}
      square={square}
    />
  );
};

export default ToggleCard;
