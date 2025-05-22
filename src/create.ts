import { generatePixObject } from './assembler';
import {
  CreateCompositePixParams,
  CreateDynamicPixParams,
  CreateStaticPixParams,
} from './types/pixCreate';
import {
  CompositePixEmvElements,
  DynamicPixEmvElements,
  PixCompositeObject,
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
    urlRec: undefined,
    ...defaultStaticFields,
    ...params,
  } as DynamicPixEmvElements;

  return generatePixObject(elements) as PixDynamicObject;
}

export function createCompositePix(
  params: CreateCompositePixParams
): PixCompositeObject | PixError {
  if (params.merchantName.length > 25)
    return generateErrorObject('merchantName character limit exceeded (> 25)');

  if (params.merchantCity === '')
    return generateErrorObject('merchantCity is required');

  if (params.merchantCity.length > 15)
    return generateErrorObject('merchantCity character limit exceeded (> 15)');

  const elements = {
    type: PixElementType.COMPOSITE,
    ...defaultStaticFields,
    ...params,
  } as CompositePixEmvElements;

  return generatePixObject(elements) as PixCompositeObject;
}
