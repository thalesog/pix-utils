import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Buffer } from 'buffer';
import { PIXPayload } from './types/pixDynamicPayload';
import { PixError } from './types/pixError';
import { generateErrorObject } from './utils/generateErrorObject';
import zeroPad from './utils/zeroPad';

export type PIXFetchResults = {
  readonly jwsString: string;
  readonly jws: {
    readonly hdr: Uint8Array;
    readonly payload: Uint8Array;
    readonly signature: Uint8Array;
  };
  readonly header: Record<string, unknown>;
  readonly payload: PIXPayload;
};

export type PIXFetchParams = {
  readonly url: string;
  readonly DPP?: string;
  readonly codMun?: number;
};

export default async function fetchPayload({
  url,
  DPP = new Date().toISOString().substr(0, 10),
  codMun = 5300108,
}: PIXFetchParams): Promise<PIXFetchResults | PixError> {
  const axiosOptions: AxiosRequestConfig = {
    params: {
      DPP,
      codMun: zeroPad(codMun, 7),
    },
  };
  return axios
    .get('https://' + url, axiosOptions)
    .then(({ data, status }: AxiosResponse) => {
      if (status !== 200) return generateErrorObject('Status != 200');
      return data;
    })
    .then((jws: string) => {
      const parts = jws.split('.').map((b64) => Buffer.from(b64, 'base64'));
      const pixFetch: PIXFetchResults = {
        jwsString: jws,
        jws: {
          hdr: parts[0],
          payload: parts[1],
          signature: parts[2],
        },
        header: JSON.parse(parts[0].toString()),
        payload: JSON.parse(parts[1].toString()) as PIXPayload,
      };
      return pixFetch;
    })
    .catch((error) => {
      return generateErrorObject(error.message);
    });
}
