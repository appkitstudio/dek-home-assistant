import axios from 'axios';
import { Buffer } from 'buffer';

async function getImageAsBase64(url: string): Promise<string> {
  const response = await axios.get(url, {
    responseType: 'arraybuffer',
    mode: 'no-cors',
  } as any);

  const contentType = response.headers['content-type'];
  return `data:${contentType};base64,${Buffer.from(
    response.data,
    'binary',
  ).toString('base64')}`;
}

export default getImageAsBase64;
