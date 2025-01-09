import {
  HassEntities,
  callService,
  createConnection,
  createLongLivedTokenAuth,
  getStates,
  subscribeEntities,
} from "home-assistant-js-websocket";
import { HAConnection } from "./types";

export let activeConnection: HAConnection | null = null;

export function disconnect() {
  if (activeConnection && activeConnection.instance) {
    if (activeConnection.entitiesSubscription) {
      activeConnection.entitiesSubscription();
      activeConnection.entitiesSubscription = null;
    }

    activeConnection.instance.close();
    activeConnection = null;
  }
}

export async function connect(
  serverUri: string,
  accessToken: string
): Promise<HAConnection> {
  if (activeConnection) {
    throw new Error("HA connection already active");
  }

  const auth = createLongLivedTokenAuth(serverUri, accessToken);
  const instance = await createConnection({ auth });
  const connection = {
    instance,
    serverUri,
    accessToken,
  } as HAConnection;
  activeConnection = connection;
  return connection;
}

export function onEntitiesUpdated(listener: (state: HassEntities) => void) {
  if (!activeConnection) {
    throw new Error("HA no active connection");
  }
  if (!activeConnection.instance) {
    throw new Error("HA connection not open");
  }
  if (activeConnection.entitiesSubscription) {
    throw new Error("HA entities subscriptiojn already set");
  }

  activeConnection.entitiesSubscription = subscribeEntities(
    activeConnection.instance,
    listener
  );
}

export function onEvent(listener: (ev: unknown) => void) {
  if (!activeConnection) {
    throw new Error("HA no active connection");
  }
  if (!activeConnection.instance) {
    throw new Error("HA connection not open");
  }
  if (activeConnection.entitiesSubscription) {
    throw new Error("HA entities subscriptiojn already set");
  }

  activeConnection.instance.subscribeEvents(listener);
}

export function invokeService(
  domain: string,
  service: string,
  entityId: string,
  serviceData?: object
): Promise<unknown> {
  if (!activeConnection) {
    throw new Error("HA no active connection");
  }
  if (!activeConnection.instance) {
    throw new Error("HA connection not open");
  }
  if (!activeConnection.instance.connected) {
    throw new Error("HA connection not connected");
  }

  return callService(activeConnection.instance, domain, service, serviceData, {
    entity_id: entityId,
  });
}

export function getEntityStates(): Promise<unknown> {
  if (!activeConnection) {
    throw new Error("HA no active connection");
  }
  if (!activeConnection.instance) {
    throw new Error("HA connection not open");
  }
  if (!activeConnection.instance.connected) {
    throw new Error("HA connection not connected");
  }

  return getStates(activeConnection.instance);
}
