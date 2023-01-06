import { ValueOf } from './helpers';
import { PixDynamicFn, PixStaticFn } from './pixFunctions';

export interface PixEmvMandatoryElements {
  readonly merchantCategoryCode: string; // EL52
  readonly transactionCurrency: string; // EL53
  readonly countryCode: string; // EL58
  readonly merchantName: string; // EL59
  readonly merchantCity: string; // EL60
}

export interface PixEmvBasicElements extends PixEmvMandatoryElements {
  readonly oneTime?: boolean; // EL02
}

export enum PixElementType {
  DYNAMIC = 'DYNAMIC',
  STATIC = 'STATIC',
  INVALID = 'INVALID',
}

export interface DynamicPixEmvElements extends PixEmvBasicElements {
  readonly type: PixElementType.DYNAMIC;
  readonly url: string;
}

export interface StaticPixEmvElements extends PixEmvBasicElements {
  readonly type: PixElementType.STATIC;
  readonly transactionAmount?: number; // EL54
  readonly pixKey: string;
  readonly txid?: string;
  readonly infoAdicional?: string;
  readonly fss?: string;
}

export interface InvalidPixEmvElements {
  readonly type: PixElementType.INVALID;
  readonly details: string;
}

export type PixElement = {
  [PixElementType.DYNAMIC]: DynamicPixEmvElements;
  [PixElementType.STATIC]: StaticPixEmvElements;
  [PixElementType.INVALID]: InvalidPixEmvElements;
};
export type PixElements = StaticPixEmvElements | DynamicPixEmvElements;

export type PixObject = {
  [PixElementType.DYNAMIC]: DynamicPixEmvElements;
  [PixElementType.STATIC]: StaticPixEmvElements;
  [PixElementType.INVALID]: InvalidPixEmvElements;
};
export type PixObjects = ValueOf<PixObject>;

export type PixStaticObject = StaticPixEmvElements & PixStaticFn;

export type PixDynamicObject = DynamicPixEmvElements & PixDynamicFn;
