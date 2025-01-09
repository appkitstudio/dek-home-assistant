import { Card, CardVariant, Icon, Text, View } from "@appkit/dek-ui";
import useEntity from "../../hooks/useEntity";

type Props = {
  title: string;
  entityId: string;
  iconName?: string;
  variant?: CardVariant;
  square?: boolean;
};

function tryParseNumber(value: string, defValue?: any) {
  const parsed = parseInt(value);
  return isNaN(parsed) ? defValue : parsed;
}

const SensorCard = ({
  title,
  entityId,
  iconName = "MdOutlineDeviceThermostat",
  variant = "clear",
  square = true,
}: Props) => {
  const entity = useEntity(entityId);
  const state = entity ? tryParseNumber(entity.state) : undefined;
  const value =
    entity && state ? `${state} ${entity.attributes.unit_of_measurement}` : "?";

  return (
    <Card variant={variant} square={square} label="sensor-card">
      <View direction="vert" padding={10} paddingTop={12}>
        <View>
          <Icon name={iconName} size={30} />
        </View>
        <View direction="vert" paddingHorz={4}>
          <Text size="large" weight="xbold">
            {value}
          </Text>
          <Text size="normal" weight="normal">
            {title}
          </Text>
        </View>
      </View>
    </Card>
  );
};

export default SensorCard;
