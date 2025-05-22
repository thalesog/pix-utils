import { generatePixObject } from './assembler';
import { computeCRC } from './crc';
import { parseEmv } from './emvHandler';
import {
  PixElements,
  PixElementType,
  PixEmvMandatoryElements,
  PixObjects,
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

export function parsePix(brCode: string): PixObjects | PixError {
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

  return generatePixObject(elements) as PixObjects;
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
  const isComposite = isPix(emvElements, 'composite');
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
      fss: emvElements.getSubTag(EmvMaiSchema.TAG_MAI_FSS, EmvSchema.TAG_MAI),
      urlRec: isComposite
        ? emvElements.getSubTag(
            EmvMaiSchema.TAG_MAI_URL,
            EmvSchema.TAG_UNRESERVED_TEMPLATE
          )
        : undefined,
    };
  }

  if (isPix(emvElements, 'dynamic')) {
    if (isComposite) {
      return {
        type: PixElementType.COMPOSITE,
        ...basicElements,
        url: emvElements.getSubTag(EmvMaiSchema.TAG_MAI_URL, EmvSchema.TAG_MAI),
        urlRec: emvElements.getSubTag(
          EmvMaiSchema.TAG_MAI_URL,
          EmvSchema.TAG_UNRESERVED_TEMPLATE
        ),
      };
    }

    return {
      type: PixElementType.DYNAMIC,
      ...basicElements,
      url: emvElements.getSubTag(EmvMaiSchema.TAG_MAI_URL, EmvSchema.TAG_MAI),
      urlRec: undefined,
    };
  }

  if (isComposite) {
    return {
      type: PixElementType.COMPOSITE,
      ...basicElements,
      urlRec: emvElements.getSubTag(
        EmvMaiSchema.TAG_MAI_URL,
        EmvSchema.TAG_UNRESERVED_TEMPLATE
      ),
    };
  }

  if (!isPix(emvElements, 'pix') || !isPix(emvElements, 'valid'))
    return generateErrorObject('invalid pix');

  return generateErrorObject('error');
}
