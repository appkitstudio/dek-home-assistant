import { HassEntities } from 'home-assistant-js-websocket';
import { proxy } from 'valtio';

export type HomeAssistantState = {
  entities: HassEntities;
};

const state = proxy<HomeAssistantState>({
  entities: {},
});

export default state;
