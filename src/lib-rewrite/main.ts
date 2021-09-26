import { computeCRC } from './crc';
import { parseEmv } from './parse';
import {
  PixElementType,
  PixEmvElements,
  PixEmvMandatoryElements,
  PixObject,
} from './types/pixElements';
import { EmvMaiSchema, EmvSchema, ValidTags } from './types/pixEmvSchema';
import { isDynamicPix, isInvalid, isPIX, isStaticPix } from './validate';

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

  // CHECK IF STATIC/DYNAMIC

  // MAKE RETURN OBJECT

  return {
    ...elements,
    isStatic: () => isStaticPix(elements),
    isDynamic: () => isDynamicPix(elements),
    toImage: () => {
      return 'Not implemented';
    },
    toEmvCode: () => {
      return 'Not implemented';
    },
  };
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

  if (isPIX(emvElements, 'static')) {
    return {
      type: PixElementType.STATIC,
      ...basicElements,
      pixKey: emvElements.getSubTag(
        EmvMaiSchema.TAG_MAI_PIXKEY,
        EmvSchema.TAG_MAI
      ),
      infoAdicional: emvElements.getSubTag(
        EmvMaiSchema.TAG_MAI_INFO_ADD,
        EmvSchema.TAG_MAI
      ),
      txid: emvElements.getSubTag(
        EmvSchema.TAG_AD_REF_LABEL,
        EmvSchema.TAG_ADDITIONAL_DATA
      ),
    };
  } else if (isPIX(emvElements, 'dynamic')) {
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
