import { PixDynamicFn, PixStaticFn } from './pixFunctions';

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

export type PixElements = StaticPixEmvElements | DynamicPixEmvElements;

export type PixStaticObject = StaticPixEmvElements & PixStaticFn;

export type PixDynamicObject = DynamicPixEmvElements & PixDynamicFn;

export type PixObject = PixStaticObject | PixDynamicObject;
