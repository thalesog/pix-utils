import { PIXFetchResults } from '../dynamicPayload';

import { PixError } from './pixError';

export type PixFnDefault = {
  readonly toBRCode: () => string;
  readonly toImage: () => Promise<string>;
};

export type PixStaticFn = PixFnDefault;

export type PixDynamicFn = PixFnDefault & {
  readonly fetchPayload: ({
    DPP,
    codMun,
  }: {
    readonly DPP: string;
    readonly codMun: number;
  }) => Promise<PIXFetchResults | PixError>;
};
