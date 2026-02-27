# dek-home-assistant Components

## toggle-card

A card for toggling a Home Assistant switch or light on and off.

### Schema

| Field | Type | Default | Description |
|---|---|---|---|
| `entityId` | string | `""` | Home Assistant entity ID (e.g., `switch.living_room_lamp`) |
| `title` | string | `"Toggle"` | Label shown on the card |
| `iconName` | string | `"IoMedicalSharp"` | react-icons icon name |
| `square` | boolean | `true` | Display as a square card |

---

## weather-view

Displays current weather conditions from a Home Assistant weather entity.

No schema — reads the first available weather entity from Home Assistant state.

Also available as a header widget (`dek-homeassistant-weather`).

---

## sensor-card

Displays the current value of a Home Assistant sensor entity.

### Schema

| Field | Type | Default | Description |
|---|---|---|---|
| `entityId` | string | `""` | Sensor entity ID (e.g., `sensor.living_room_temperature`) |
| `title` | string | `"Sensor"` | Label shown on the card |
| `iconName` | string | `"MdOutlineDeviceThermostat"` | react-icons icon name |
| `variant` | list | `"normal"` | Card style: `normal` or `clear` |
| `square` | boolean | `true` | Display as a square card |

---

## media-card

A compact card for controlling a media player entity (play/pause).

### Schema

| Field | Type | Default | Description |
|---|---|---|---|
| `entityId` | string | `""` | Media player entity ID (e.g., `media_player.living_room`) |
| `title` | string | `"Media"` | Label shown on the card |
| `variant` | list | `"normal"` | Card style: `normal` or `clear` |
| `square` | boolean | `true` | Display as a square card |

---

## media-view

Rich media player view with album art, track title, and artist info.

### Schema

| Field | Type | Default | Description |
|---|---|---|---|
| `entityId` | string | `""` | Media player entity ID |
| `showLargeContent` | boolean | `false` | Show large view with full album art |
