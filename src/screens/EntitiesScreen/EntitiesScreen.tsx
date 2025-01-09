import { Cell, Grid, MenuBar, Screen, TitleBar, View } from "@appkit/dek-ui";
import { useState } from "react";
import useEntities from "../../hooks/useEntities";
import { callService } from "home-assistant-js-websocket";
import { activeConnection } from "../../api/ha";
import { getFeatures } from "../../api/media";

function canToggle(entity: string) {
  return ["switch", "light", "input_boolean"].includes(entity.split(".", 1)[0]);
}

const EntitiesScreen = () => {
  const entities = useEntities();
  const [selectedKey, setSelectedKey] = useState("");

  const menuItems = Object.keys(entities).map((key) => ({
    title: `${entities[key].entity_id} - ${
      entities[key].attributes.friendly_name || "Unknown"
    }${canToggle(entities[key].entity_id) ? " *" : ""}`,
    key,
    id: entities[key].entity_id,
  }));

  const handleMenuSelection = (key: string) => {
    setSelectedKey(key);
  };

  const handleToggle = (key: string) => {
    if (activeConnection && activeConnection.instance) {
      callService(activeConnection.instance, "homeassistant", "toggle", {
        entity_id: entities[key].entity_id,
      });
    }
  };

  return (
    <Screen overlay={false}>
      <Grid fullscreen cols="40% auto" rows="60px auto">
        <Cell colSpan={2}>
          <TitleBar title="Home Assistant Entities" />
        </Cell>
        <View direction="vert" vscroll="auto" hscroll="hidden" padding={15}>
          <MenuBar
            items={menuItems.sort((a, b) => a.title.localeCompare(b.title))}
            onSelect={handleMenuSelection}
            initialKey={selectedKey}
            compact
          />
        </View>
        <View vscroll="auto" hscroll="hidden" padding={15}>
          {selectedKey && canToggle(entities[selectedKey].entity_id) && (
            <button onClick={() => handleToggle(selectedKey)}>Toggle</button>
          )}
          {selectedKey &&
            entities[selectedKey].attributes.supported_features && (
              <div>{`Supported Features: ${getFeatures(
                entities[selectedKey].attributes.supported_features!
              )}`}</div>
            )}
          {selectedKey && (
            <pre style={{ fontSize: 16 }}>
              {JSON.stringify(entities[selectedKey], null, 2)}
            </pre>
          )}
        </View>
      </Grid>
    </Screen>
  );
};

export default EntitiesScreen;
