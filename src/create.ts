import { generatePixObject } from './assembler';
import {
  CreateDynamicPixParams,
  CreateRecurrencePixParams,
  CreateStaticPixParams,
} from './types/pixCreate';
import {
  DynamicPixEmvElements,
  PixRecurrenceObject,
  PixDynamicObject,
  PixElementType,
  PixStaticObject,
  StaticPixEmvElements,
  RecurrencePixEmvElements,
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

  const elements = {
    type: PixElementType.DYNAMIC,
    ...defaultStaticFields,
    ...params,
  } as DynamicPixEmvElements;

  return generatePixObject(elements) as PixDynamicObject;
}

export function createRecurrencePix(
  params: CreateRecurrencePixParams
): PixRecurrenceObject | PixError {
  if (params.merchantName.length > 25)
    return generateErrorObject('merchantName character limit exceeded (> 25)');

  if (params.merchantCity === '')
    return generateErrorObject('merchantCity is required');

  if (params.merchantCity.length > 15)
    return generateErrorObject('merchantCity character limit exceeded (> 15)');

  const elements = {
    type: PixElementType.RECURRENCE,
    ...defaultStaticFields,
    ...params,
    url: undefined,
  } as RecurrencePixEmvElements;

  return generatePixObject(elements) as PixRecurrenceObject;
}
