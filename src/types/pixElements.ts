import { ValueOf } from './helpers';
import { PixCompositeFn, PixDynamicFn, PixStaticFn } from './pixFunctions';

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
  COMPOSITE = 'COMPOSITE',
  STATIC = 'STATIC',
  INVALID = 'INVALID',
}

export interface DynamicPixEmvElements extends PixEmvBasicElements {
  readonly type: PixElementType.DYNAMIC;
  readonly url: string;
  readonly urlRec: undefined;
}

export interface CompositePixEmvElements extends PixEmvBasicElements {
  readonly type: PixElementType.COMPOSITE;
  readonly url?: string;
  readonly urlRec: string;
}

export interface StaticPixEmvElements extends PixEmvBasicElements {
  readonly type: PixElementType.STATIC;
  readonly transactionAmount?: number; // EL54
  readonly pixKey: string;
  readonly txid?: string;
  readonly infoAdicional?: string;
  readonly fss?: string;
  readonly urlRec?: string;
}

export interface InvalidPixEmvElements {
  readonly type: PixElementType.INVALID;
  readonly details: string;
}

export type PixElement = {
  [PixElementType.DYNAMIC]: DynamicPixEmvElements;
  [PixElementType.STATIC]: StaticPixEmvElements;
  [PixElementType.INVALID]: InvalidPixEmvElements;
  [PixElementType.COMPOSITE]: CompositePixEmvElements;
};
export type PixElements =
  | StaticPixEmvElements
  | DynamicPixEmvElements
  | CompositePixEmvElements;

export type PixObject = {
  [PixElementType.DYNAMIC]: DynamicPixEmvElements;
  [PixElementType.STATIC]: StaticPixEmvElements;
  [PixElementType.INVALID]: InvalidPixEmvElements;
  [PixElementType.COMPOSITE]: CompositePixEmvElements;
};

export type PixObjects = ValueOf<PixObject>;

export type PixStaticObject = StaticPixEmvElements & PixStaticFn;

export type PixDynamicObject = DynamicPixEmvElements & PixDynamicFn;

export type PixCompositeObject = CompositePixEmvElements & PixCompositeFn;
