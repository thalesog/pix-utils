import { Buffer } from 'buffer'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { PIXPayload } from '../types/PIXPayload'

export type PIXFetchResults = {
  jwsString: string
  jws: {
    hdr: Uint8Array
    payload: Uint8Array
    signature: Uint8Array
  }
  header: any
  payload: PIXPayload
}

export type PIXFetchParams = {
  url: string
  DPP?: string
  codMun?: string
}

export default async function fetchPayload({
  url,
  DPP,
  codMun,
}: PIXFetchParams): Promise<PIXFetchResults> {
  const axiosOptions: AxiosRequestConfig = {
    headers: {
      //accept: 'x/y',
      //mode: 'no-cors',
    },
    params: {
      DPP,
      codMun,
    },
  }
  return axios
    .get('https://' + url, axiosOptions)
    .then(({ data, status }: AxiosResponse) => {
      if (status !== 200) throw new Error('HTTP ' + status)
      return data
    })
    .then((jws: string) => {
      const parts = jws.split('.').map((b64) => Buffer.from(b64, 'base64'))
      const pixFetch: PIXFetchResults = {
        jwsString: jws,
        jws: {
          hdr: parts[0],
          payload: parts[1],
          signature: parts[2],
        },
        header: JSON.parse(parts[0].toString()),
        payload: JSON.parse(parts[1].toString()) as PIXPayload,
      }
      return pixFetch
    })
    .catch((error) => {
      console.log(error)
      throw error
    })
}
