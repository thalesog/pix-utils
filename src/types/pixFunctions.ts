import { PIXFetchResults } from '../dynamicPayload';
import {
  PixCompositeObject,
  PixDynamicObject,
  PixStaticObject,
} from './pixElements';
import { PixError } from './pixError';

export interface PixFnDefault {
  readonly toBRCode: () => string;
  readonly toImage: () => Promise<string>;
}

export interface PixStaticFn extends PixFnDefault {
  readonly throwIfError: () => PixStaticObject;
  readonly fetchPayloadRec?: () => Promise<PIXFetchResults | PixError>;
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

export interface PixCompositeFn extends PixFnDefault {
  readonly fetchPayload?: (
    params: FetchPayloadParams
  ) => Promise<PIXFetchResults | PixError>;
  readonly fetchPayloadRec: () => Promise<PIXFetchResults | PixError>;
  readonly throwIfError: () => PixCompositeObject;
}
