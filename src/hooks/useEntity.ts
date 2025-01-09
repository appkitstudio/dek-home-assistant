import { useSnapshot } from 'valtio';
import state from '../api/state';

const useEntity = (entityId: string) => {
  const entities = useSnapshot(state).entities;
  if (!entities) {
    return undefined;
  }
  return entities[entityId];
};

export default useEntity;
