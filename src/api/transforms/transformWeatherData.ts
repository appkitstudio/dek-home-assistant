import { WeatherData } from '../types';

function transformWeatherData(data: any): WeatherData {
  if (!data) {
    return {
      type: 'unknown',
      temperature: 0,
    };
  }
  return {
    type: data.state,
    temperature: data.attributes.temperature,
  };
}

export default transformWeatherData;
