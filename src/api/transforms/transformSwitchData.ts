import { SwitchData } from '../types';

function transformSwitchData(data: any): SwitchData {
  if (!data) {
    return {
      state: 'unknown',
    };
  }
  return {
    state: data.state,
  };
}

export default transformSwitchData;
