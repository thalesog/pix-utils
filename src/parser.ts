import { generatePixObject } from './assembler';
import { computeCRC } from './crc';
import { parseEmv } from './emvHandler';
import {
  PixElements,
  PixElementType,
  PixEmvMandatoryElements,
  PixObject,
} from './types/pixElements';
import {
  EmvAdditionalDataSchema,
  EmvMaiSchema,
  EmvSchema,
  ValidTags,
} from './types/pixEmvSchema';
import { PixError } from './types/pixError';
import { generateErrorObject } from './utils/generateErrorObject';
import { hasElementError, isPix } from './validate';

export function parsePix(brCode: string): PixObject | PixError {
  // Parse EMV Code
  const emvElements = parseEmv({ emvCode: brCode });
  if (!emvElements.isValid) return generateErrorObject('invalid emv code');

  // Validate CRC16
  const crc = computeCRC(brCode);
  if (crc !== emvElements.getTag(EmvSchema.TAG_CRC))
    return generateErrorObject('invalid crc');

  // Extract Elements
  const elements = extractElements(emvElements);

  if (hasElementError(elements)) return generateErrorObject(elements.message);

  return generatePixObject(elements);
}

export function extractMandatoryElements(
  emvElements: ValidTags
): PixEmvMandatoryElements {
  return {
    merchantCategoryCode: emvElements.getTag(EmvSchema.TAG_MCC),
    transactionCurrency: emvElements.getTag(EmvSchema.TAG_TRANSACTION_CURRENCY),
    countryCode: emvElements.getTag(EmvSchema.TAG_COUNTRY_CODE),
    merchantName: emvElements.getTag(EmvSchema.TAG_MERCHANT_NAME),
    merchantCity: emvElements.getTag(EmvSchema.TAG_MERCHANT_CITY),
  };
}

export function extractElements(
  emvElements: ValidTags
): PixElements | PixError {
  const basicElements = extractMandatoryElements(emvElements);
  if (isPix(emvElements, 'static')) {
    const amountNumber = +emvElements.getTag(EmvSchema.TAG_TRANSACTION_AMOUNT);
    const transactionAmount = !isNaN(amountNumber) ? amountNumber : 0;
    return {
      type: PixElementType.STATIC,
      ...basicElements,
      pixKey: emvElements.getSubTag(
        EmvMaiSchema.TAG_MAI_PIXKEY,
        EmvSchema.TAG_MAI
      ),
      transactionAmount,
      infoAdicional: emvElements.getSubTag(
        EmvMaiSchema.TAG_MAI_INFO_ADD,
        EmvSchema.TAG_MAI
      ),
      txid: emvElements.getSubTag(
        EmvAdditionalDataSchema.TAG_TXID,
        EmvSchema.TAG_ADDITIONAL_DATA
      ),
    };
  }
  if (isPix(emvElements, 'dynamic')) {
    return {
      type: PixElementType.DYNAMIC,
      ...basicElements,
      url: emvElements.getSubTag(EmvMaiSchema.TAG_MAI_URL, EmvSchema.TAG_MAI),
    };
  }
  if (!isPix(emvElements, 'pix') || !isPix(emvElements, 'valid'))
    return generateErrorObject('invalid pix');

  return generateErrorObject('error');
}
