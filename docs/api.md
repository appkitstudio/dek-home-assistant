# dek-home-assistant API Reference

The plugin exposes hooks for reactive access to Home Assistant entity state.

## useEntities

Returns all entity states from Home Assistant, updating reactively as states change.

```typescript
import { useEntities } from '../hooks/useEntities';

function MyComponent() {
  const entities = useEntities();
  // entities: HaEntity[]
}
```

Access via the plugin API:
```typescript
const haApi = api.integration('my-ha-integration').api;
// Note: hooks are used via the internal hooks module, not the api getter
```

### HaEntity type

```typescript
type HaEntity = {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed: string;
  last_updated: string;
};
```

---

## useEntity

Returns a single entity's state by ID, updating reactively.

```typescript
import { useEntity } from '../hooks/useEntity';

function SensorDisplay({ entityId }: { entityId: string }) {
  const entity = useEntity(entityId);
  if (!entity) return <div>Loading...</div>;
  return <div>{entity.state}</div>;
}
```

---

## WebSocket Connection

The plugin connects to Home Assistant using the `connect(uri, token)` function from `src/api/ha.ts`:

```typescript
// Called in plugin.load():
await connect(haUri, haAccessToken);

// Receives entity updates:
onEntitiesUpdated((entities) => {
  state.entities = entities;  // Updates Valtio state store
});

// Called in plugin.unload():
disconnect();
```

The Valtio state store (`src/api/state.ts`) holds the latest entity states and drives the reactive hooks.

---

## State Store

Entity state is held in a Valtio proxy:

```typescript
// src/api/state.ts
const state = proxy({
  entities: [] as HaEntity[],
});
```

Components use `useSnapshot(state)` from Valtio to re-render when entities update.
