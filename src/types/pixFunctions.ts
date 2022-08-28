import { PIXFetchResults } from '../dynamicPayload';
import { PixDynamicObject, PixStaticObject } from './pixElements';
import { PixError } from './pixError';

export interface PixFnDefault {
  readonly toBRCode: () => string;
  readonly toImage: () => Promise<string>;
}

export interface PixStaticFn extends PixFnDefault {
  readonly throwIfError: () => PixStaticObject;
}

type FetchPayloadParams = {
  DPP: string;
  codMun: number;
};

export interface PixDynamicFn extends PixFnDefault {
  readonly fetchPayload: (
    params: FetchPayloadParams
  ) => Promise<PIXFetchResults | PixError>;
  readonly throwIfError: () => PixDynamicObject;
}
