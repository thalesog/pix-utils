import { PIXPayload } from '../types/PIXPayload';
export declare type PIXFetchResults = {
    jwsString: string;
    jws: {
        hdr: Uint8Array;
        payload: Uint8Array;
        signature: Uint8Array;
    };
    header: any;
    payload: PIXPayload;
};
export declare type PIXFetchParams = {
    url: string;
    DPP?: string;
    codMun?: string;
};
export default function fetchPayload({ url, DPP, codMun, }: PIXFetchParams): Promise<PIXFetchResults>;
