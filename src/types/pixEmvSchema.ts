export enum EmvSchema {
  TAG_INIT = 0,
  TAG_ONETIME = 1,
  TAG_MAI = 26,
  TAG_MCC = 52,
  TAG_TRANSACTION_CURRENCY = 53,
  TAG_TRANSACTION_AMOUNT = 54,
  TAG_COUNTRY_CODE = 58,
  TAG_MERCHANT_NAME = 59,
  TAG_MERCHANT_CITY = 60,
  TAG_POSTAL_CODE = 61,
  TAG_UNRESERVED_TEMPLATE = 80,
  TAG_ADDITIONAL_DATA = 62,
  TAG_CRC = 63,
}

export enum EmvAdditionalDataSchema {
  TAG_TXID = 5,
}

export enum EmvMaiSchema {
  TAG_MAI_GUI = 0,
  TAG_MAI_PIXKEY = 1,
  TAG_MAI_INFO_ADD = 2,
  TAG_MAI_FSS = 3,
  TAG_MAI_URL = 25,
  BC_GUI = 'br.gov.bcb.pix',
}

export enum EmvMandatory {
  TAG_MCC = EmvSchema.TAG_MCC, // EL52
  TAG_TRANSACTION_CURRENCY = EmvSchema.TAG_TRANSACTION_CURRENCY, // EL53
  TAG_COUNTRY_CODE = EmvSchema.TAG_COUNTRY_CODE, //EL58
  TAG_MERCHANT_NAME = EmvSchema.TAG_MERCHANT_NAME, //EL59
  TAG_MERCHANT_CITY = EmvSchema.TAG_MERCHANT_CITY, //EL60
  TAG_POSTAL_CODE = EmvSchema.TAG_POSTAL_CODE, //EL61
}

export enum TagsWithSubTags {
  TAG_MAI = EmvSchema.TAG_MAI, //EL26
  TAG_ADDITIONAL_DATA = EmvSchema.TAG_ADDITIONAL_DATA, //EL62
  TAG_UT = EmvSchema.TAG_UNRESERVED_TEMPLATE, //EL80
}

export type ValidTags = {
  readonly isValid: true;
  readonly [key: number]: {
    readonly tag: number;
    readonly length: number;
    readonly value: string;
  };
  readonly rawTags: {
    readonly [key: number]: {
      readonly tag: number;
      readonly length: number;
      readonly value: string;
    };
  };
  readonly getTag: (tag: number) => string;
  readonly getSubTag: (mainTag: number, tag: number) => string;
};

export type InvalidTags = {
  readonly isValid: false;
  readonly rawTags: {
    readonly [key: number]: {
      readonly tag: number;
      readonly length: number;
      readonly value: string;
    };
  };
};

export type ParsedTags = ValidTags | InvalidTags;
