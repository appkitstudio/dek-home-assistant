# dek-home-assistant

Home Assistant integration plugin for DEK. Connects to Home Assistant via the WebSocket API, maintains live entity state, and provides components for controlling and displaying smart home devices.

## Setup

### 1. Get a Long-Lived Access Token

In Home Assistant: Profile → Long-Lived Access Tokens → Create Token

### 2. Create an Integration

Configure with:

| Key | Description | Example |
|---|---|---|
| `haUri` | Home Assistant WebSocket URL | `ws://homeassistant.local:8123/api/websocket` |
| `haAccessToken` | Long-lived access token | `eyJ0eX...` |

### 3. Development

```bash
npm install
npm run dev
```

## Components

| Key | Description |
|---|---|
| `toggle-card` | Card to toggle a switch/light on and off |
| `weather-view` | Current weather from a Home Assistant weather entity |
| `sensor-card` | Displays sensor readings (temperature, humidity, etc.) |
| `media-card` | Play/pause media player control |
| `media-view` | Rich media player view with artwork and track info |

See [docs/components.md](docs/components.md) for schema details.

## Screens

| Path | Description |
|---|---|
| `/entities` | Browse all Home Assistant entities |

## Header Widget

This plugin registers a `dek-homeassistant-weather` header widget in the `header-widgets` collection, showing current weather in the board header.

## API

See [docs/api.md](docs/api.md) for the `useEntities` and `useEntity` hooks.
