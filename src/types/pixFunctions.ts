import { ValidTags } from './pixEmvSchema';

export type PixFnDefault = {
  readonly toBRCode: () => string;
  readonly toImage: () => string;
  readonly isPix: (
    emvElements: ValidTags,
    test: 'pix' | 'valid' | 'static' | 'dynamic'
  ) => boolean;
};

export type PixDynamicFn = PixFnDefault & {
  readonly fetchPayload: () => string;
};
