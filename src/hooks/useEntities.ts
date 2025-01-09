import { useSnapshot } from 'valtio';
import state from '../api/state';

const useEntities = () => {
  return useSnapshot(state).entities;
};

export default useEntities;
