import { PIXFetchResults } from '../dynamicPayload';
import {
  PixDynamicObject,
  PixRecurrenceObject,
  PixStaticObject,
} from './pixElements';
import { PixError } from './pixError';

export interface PixFnDefault {
  readonly toBRCode: () => string;
  readonly toImage: () => Promise<string>;
}

export interface PixStaticFn extends PixFnDefault {
  readonly throwIfError: () => PixStaticObject;
  readonly fetchRecPayload?: () => Promise<PIXFetchResults | PixError>;
}

type FetchPayloadParams = {
  DPP: string;
  codMun: number;
};

export interface PixDynamicFn extends PixFnDefault {
  readonly fetchPayload: (
    params: FetchPayloadParams
  ) => Promise<PIXFetchResults | PixError>;
  readonly fetchRecPayload?: () => Promise<PIXFetchResults | PixError>;
  readonly throwIfError: () => PixDynamicObject;
}

export interface PixRecurrenceFn extends PixFnDefault {
  readonly fetchRecPayload: () => Promise<PIXFetchResults | PixError>;
  readonly throwIfError: () => PixRecurrenceObject;
}
