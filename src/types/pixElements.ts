import { PixFnDefault } from './pixFunctions';

export type PixEmvMandatoryElements = {
  readonly merchantCategoryCode: string; // EL52
  readonly transactionCurrency: string; // EL53
  readonly countryCode: string; // EL58
  readonly merchantName: string; // EL59
  readonly merchantCity: string; // EL60
};

export type PixEmvBasicElements = PixEmvMandatoryElements & {
  readonly oneTime?: boolean; // EL02
};

export enum PixElementType {
  DYNAMIC = 'DYNAMIC',
  STATIC = 'STATIC',
  INVALID = 'INVALID',
}

export type DynamicPixEmvElements = PixEmvBasicElements & {
  readonly type: PixElementType.DYNAMIC;
  readonly url: string;
};

export type StaticPixEmvElements = PixEmvBasicElements & {
  readonly type: PixElementType.STATIC;
  readonly transactionAmount?: number; // EL54
  readonly pixKey: string;
  readonly txid?: string;
  readonly infoAdicional?: string;
};

export type InvalidPixElements = {
  readonly type: PixElementType.INVALID;
  readonly details: string;
};

export type ValidPixElements = StaticPixEmvElements | DynamicPixEmvElements;

export type PixEmvElements = ValidPixElements | InvalidPixElements;
export type PixValidObject = ValidPixElements & PixFnDefault;
export type PixObject = PixValidObject | InvalidPixElements;
