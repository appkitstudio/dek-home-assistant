import {
  DekApi,
  DekPlugin,
  DekPluginComponentItem,
  DekPluginScreenItem,
} from "@appkit/dek-plugin";
import EntitiesScreen from "./screens/EntitiesScreen/EntitiesScreen";
import { connect, disconnect, onEntitiesUpdated } from "./api/ha";
import state from "./api/state";
import WeatherView from "./components/WeatherView/WeatherView";
import SensorCard from "./components/SensorCard/SensorCard";
import ToggleCard from "./components/ToggleCard/ToggleCard";
import MediaCard from "./components/MediaCard/MediaCard";
import MediaView from "./components/MediaView/MediaView";

export type PluginApi = {
  getGreeting: () => string;
};

class Plugin implements DekPlugin {
  readonly config: Record<string, string> = {};
  dekApi: DekApi | null = null;

  constructor(config: Record<string, string>) {
    this.config = config;
  }

  public async load(api: DekApi) {
    this.dekApi = api;
    api.trace(
      `loading '${this.config.integration}' from plugin '${this.config.plugin}@${this.config.version}'`,
      this.config
    );

    const { haUri, haAccessToken } = this.config;
    await connect(haUri, haAccessToken);

    onEntitiesUpdated((entities) => {
      state.entities = entities;
    });
  }

  public async unload() {
    disconnect();
  }

  get components(): DekPluginComponentItem[] {
    return [
      {
        key: "toggle-card",
        description: "Card to toggle an entity on and off",
        element: (props: any) => <ToggleCard {...props} />,
        schema: {
          entityId: {
            type: "string",
            title: "Entity to control",
            default: "",
          },
          title: {
            type: "string",
            title: "Name on card",
            default: "Toggle",
          },
          iconName: {
            type: "string",
            title: "Name to icon to display",
            default: "IoMedicalSharp",
          },
          square: {
            type: "boolean",
            title: "Show a square card",
            default: true,
          },
        },
      },
      {
        key: "weather-view",
        description: "Widget to current weather",
        element: (props: any) => (
          <WeatherView dekApi={this.dekApi} {...props} />
        ),
      },
      {
        key: "sensor-card",
        description: "Card to display sensor data",
        element: (props: any) => <SensorCard {...props} />,
        schema: {
          entityId: {
            type: "string",
            title: "Entity to control",
            default: "",
          },
          title: {
            type: "string",
            title: "Name on card",
            default: "Sensor",
          },
          iconName: {
            type: "string",
            title: "Name to icon to display",
            default: "MdOutlineDeviceThermostat",
          },
          variant: {
            type: "list",
            title: "Type of card to display",
            default: "normal",
            options: [
              { value: "normal", label: "Normal" },
              { value: "clear", label: "Clear" },
            ],
          },
          square: {
            type: "boolean",
            title: "Show a square card",
            default: true,
          },
        },
      },
      {
        key: "media-card",
        description: "Card to play and pause media",
        element: (props: any) => <MediaCard {...props} />,
        schema: {
          entityId: {
            type: "string",
            title: "Entity to control",
            default: "",
          },
          title: {
            type: "string",
            title: "Name on card",
            default: "Media",
          },
          variant: {
            type: "list",
            title: "Type of card to display",
            default: "normal",
            options: [
              { value: "normal", label: "Normal" },
              { value: "clear", label: "Clear" },
            ],
          },
          square: {
            type: "boolean",
            title: "Show a square card",
            default: true,
          },
        },
      },
      {
        key: "media-view",
        description: "Widget to display playing media",
        element: (props: any) => <MediaView {...props} />,
        schema: {
          entityId: {
            type: "string",
            title: "Entity to control",
            default: "",
          },
          showLargeContent: {
            type: "boolean",
            title: "Show a large view",
            default: false,
          },
        },
      },
    ];
  }

  public get screens(): DekPluginScreenItem[] {
    return [
      {
        path: "/entities",
        element: (props: any) => <EntitiesScreen {...props} />,
      },
    ];
  }

  get api(): PluginApi {
    return {
      getGreeting: () => {
        return this.config.greeting || "Hello";
      },
    };
  }
}

export default Plugin;
