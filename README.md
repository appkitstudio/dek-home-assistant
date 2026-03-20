# dek-home-assistant

Brings your Home Assistant smart home into DEK. Connects via the Home Assistant WebSocket API and keeps entity state live — so your cards and widgets always reflect the current state of your devices.

## Configuration

You'll need a long-lived access token from Home Assistant:
**Profile → Long-Lived Access Tokens → Create Token**

| Setting | Description | Example |
|---|---|---|
| Home Assistant URI | WebSocket URL for your Home Assistant instance | `ws://homeassistant.local:8123/api/websocket` |
| Access Token | Long-lived access token | `eyJ0eX...` |

## Components

### `toggle-card`
A card that shows the current state of a switch or light and lets you toggle it on and off. Configure the entity ID, display name, and icon.

### `weather-view`
Displays current weather conditions from a Home Assistant weather entity. Also appears automatically in the board header as a compact weather widget.

### `sensor-card`
Shows a live reading from any sensor entity — temperature, humidity, energy usage, and more. Supports normal and clear card styles.

### `media-card`
A compact play/pause control for a media player entity. Shows the current playback state and lets you control it directly from your board.

### `media-view`
A rich media player widget with artwork, track info, and playback controls. Great for a dedicated music or media zone.

## Screens

### `/entities`
Browse and inspect all entities in your Home Assistant instance.
