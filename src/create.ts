import { generatePixObject } from './assembler';
import {
  CreateDynamicPixParams,
  CreateStaticPixParams,
} from './types/pixCreate';
import {
  DynamicPixEmvElements,
  PixDynamicObject,
  PixElementType,
  PixStaticObject,
  StaticPixEmvElements,
} from './types/pixElements';
import { PixError } from './types/pixError';
import { generateErrorObject } from './utils/generateErrorObject';

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
    return generateErrorObject('merchantName character limit exceeded (> 25)');

  if (params.txid && params.txid.length > 25)
    return generateErrorObject('txid character limit exceeded (> 25)');

  if (params.merchantCity === '')
    return generateErrorObject('merchantCity is required');

  if (params.merchantCity.length > 15)
    return generateErrorObject('merchantCity character limit exceeded (> 15)');

  params.merchantCity = params.merchantCity
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .substring(0, 15)
    .toUpperCase();

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
    return generateErrorObject('merchantName character limit exceeded (> 25)');

  if (params.merchantCity === '')
    return generateErrorObject('merchantCity is required');

  if (params.merchantCity.length > 15)
    return generateErrorObject('merchantCity character limit exceeded (> 15)');

  params.merchantCity = params.merchantCity
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .substring(0, 15)
    .toUpperCase();

  const elements = {
    type: PixElementType.DYNAMIC,
    ...defaultStaticFields,
    ...params,
  } as DynamicPixEmvElements;

  return generatePixObject(elements) as PixDynamicObject;
}
