import { generatePixObject } from './assembler';
import { PixElementType, ValidPixElements } from './types/pixElements';

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

export function createStaticPix(params: CreateStaticPixParams) {
  const elements = {
    type: PixElementType.STATIC,
    ...defaultStaticFields,
    ...params,
  } as ValidPixElements;

  return generatePixObject(elements);
}

export function createDynamicPix(params: CreateDynamicPixParams) {
  const elements = {
    type: PixElementType.DYNAMIC,
    ...defaultStaticFields,
    ...params,
  } as ValidPixElements;

  return generatePixObject(elements);
}
