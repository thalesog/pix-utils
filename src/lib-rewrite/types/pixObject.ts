import { PixEmvElements } from './pixElements';

type PixFnDefault = {
  readonly toEmvCode: () => string;
  readonly toImage: () => string;
  readonly isValid: () => boolean;
};

type PixDynamicFn = PixFnDefault & {
  readonly fetchPayload: () => string;
};

export type PixObject = PixEmvElements & (PixFnDefault | PixDynamicFn);
