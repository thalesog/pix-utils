export type PixEmvMandatoryElements = {
  readonly merchantCategoryCode: string; // EL52
  readonly transactionCurrency: string; // EL53
  readonly countryCode: string; // EL58
  readonly merchantName: string; // EL59
  readonly merchantCity: string; // EL60
};

export type PixEmvBasicElements = PixEmvMandatoryElements & {
  readonly oneTime?: boolean; // EL02
  readonly transactionAmount?: number; // EL54
};

export type DynamicPixEmvElements = PixEmvBasicElements & {
  readonly type: 'dynamic';
  readonly url: string;
};

export type StaticPixEmvElements = PixEmvBasicElements & {
  readonly type: 'static';
  readonly pixKey: string;
  readonly txid?: string;
  readonly infoAdicional?: string;
};

export type InvalidPixElements = {
  readonly type: 'invalid';
};

export type PixEmvElements =
  | InvalidPixElements
  | StaticPixEmvElements
  | DynamicPixEmvElements;
