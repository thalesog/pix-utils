import { generatePixObject } from './assembler';
import { computeCRC } from './crc';
import { parseEmv } from './parse';
import {
  PixElementType,
  PixEmvElements,
  PixEmvMandatoryElements,
  PixObject,
} from './types/pixElements';
import {
  EmvAdditionalDataSchema,
  EmvMaiSchema,
  EmvSchema,
  ValidTags,
} from './types/pixEmvSchema';
import { isInvalid, isPix } from './validate';

export function newPix(params: PixEmvElements) {
  return params;
}

export function parsePix(brCode: string): PixObject {
  // Parse EMV Code
  const emvElements = parseEmv({ emvCode: brCode });
  if (!emvElements.isValid)
    return { type: PixElementType.INVALID, details: 'invalid emv code' };

  // Validate CRC16
  const crc = computeCRC(brCode);
  if (crc !== emvElements.getTag(EmvSchema.TAG_CRC))
    return { type: PixElementType.INVALID, details: 'invalid crc' };

  // Extract Elements
  const elements = extractElements(emvElements);
  if (isInvalid(elements))
    return { type: PixElementType.INVALID, details: 'invalid pix' };

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

export function extractElements(emvElements: ValidTags): PixEmvElements {
  const basicElements = extractMandatoryElements(emvElements);

  if (isPix(emvElements, 'static')) {
    return {
      type: PixElementType.STATIC,
      ...basicElements,
      pixKey: emvElements.getSubTag(
        EmvMaiSchema.TAG_MAI_PIXKEY,
        EmvSchema.TAG_MAI
      ),
      transactionAmount: Number(
        emvElements.getTag(EmvSchema.TAG_TRANSACTION_AMOUNT)
      ),
      infoAdicional: emvElements.getSubTag(
        EmvMaiSchema.TAG_MAI_INFO_ADD,
        EmvSchema.TAG_MAI
      ),
      txid: emvElements.getSubTag(
        EmvAdditionalDataSchema.TAG_TXID,
        EmvSchema.TAG_ADDITIONAL_DATA
      ),
    };
  } else if (isPix(emvElements, 'dynamic')) {
    return {
      type: PixElementType.DYNAMIC,
      ...basicElements,
      url: emvElements.getSubTag(EmvMaiSchema.TAG_MAI_URL, EmvSchema.TAG_MAI),
    };
  }
  return { type: PixElementType.INVALID, details: '' };
}

export function fetchPayload() {
  return;
}
