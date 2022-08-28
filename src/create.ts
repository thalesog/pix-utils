import { generatePixObject } from './assembler';
import {
  DynamicPixEmvElements,
  PixDynamicObject,
  PixElementType,
  PixStaticObject,
  StaticPixEmvElements,
} from './types/pixElements';
import { PixError } from './types/pixError';

type CreateStaticPixParams = {
  readonly merchantName: string;
  readonly merchantCity: string;
  readonly infoAdicional?: string;
  readonly pixKey: string;
  readonly pss?: string;
  readonly txid?: string;
  readonly transactionAmount: number;
  readonly isTransactionUnique?: boolean;
};

type CreateDynamicPixParams = {
  readonly merchantName: string;
  readonly merchantCity: string;
  readonly url: string;

  // Enabled by default in this type of Pix
  // readonly isUnique?: boolean;
};

const defaultPixFields = {
  merchantCategoryCode: '0000',
  transactionCurrency: '986',
  countryCode: 'BR',
};

const defaultStaticFields = {
  ...defaultPixFields,
  isTransactionUnique: false,
  txid: '***',
};

export function createStaticPix(
  params: CreateStaticPixParams
): PixStaticObject | PixError {
  if (params.merchantName.length > 25)
    return {
      error: true,
      message: 'merchantName character limit exceeded (> 25)',
      throwIfError: () => {
        throw new Error('merchantName character limit exceeded (> 25)');
      },
    };

  if (params.merchantCity.length > 15)
    return {
      error: true,
      message: 'merchantCity character limit exceeded (> 15)',
      throwIfError: () => {
        throw new Error('merchantCity character limit exceeded (> 15)');
      },
    };

  if (params.txid.length > 25)
    return {
      error: true,
      message: 'txid character limit exceeded (> 25)',
      throwIfError: () => {
        throw new Error('txid character limit exceeded (> 25)');
      },
    };

  const elements = {
    type: PixElementType.STATIC,
    ...defaultStaticFields,
    ...params,
  } as StaticPixEmvElements;

  return generatePixObject(elements) as PixStaticObject;
}

export function createDynamicPix(
  params: CreateDynamicPixParams
): PixDynamicObject | PixError {
  if (params.merchantName.length > 25)
    return {
      error: true,
      message: 'merchantName character limit exceeded (> 25)',
      throwIfError: () => {
        throw new Error('merchantName character limit exceeded (> 25)');
      },
    };

  if (params.merchantCity.length > 15)
    return {
      error: true,
      message: 'merchantCity character limit exceeded (> 15)',
      throwIfError: () => {
        throw new Error('merchantCity character limit exceeded (> 15)');
      },
    };

  const elements = {
    type: PixElementType.DYNAMIC,
    ...defaultStaticFields,
    ...params,
    merchantCity: params.merchantCity.substr(0, 15).toUpperCase(),
  } as DynamicPixEmvElements;

  return generatePixObject(elements) as PixDynamicObject;
}
