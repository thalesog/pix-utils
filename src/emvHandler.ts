import { computeCRC } from './crc';
import { PixElements, PixElementType } from './types/pixElements';
import {
  EmvAdditionalDataSchema,
  EmvMaiSchema,
  EmvSchema,
  ParsedTags,
  TagsWithSubTags,
} from './types/pixEmvSchema';
import { normalizeCity, normalizeName } from './utils/textParser';
import zeroPad from './utils/zeroPad';

function generateEmvElement(elementId: number, value: string) {
  if (!value) return '';
  const parsedElementId = zeroPad(elementId, 2);
  const parsedLength = zeroPad(value.length, 2);
  return `${parsedElementId}${parsedLength}${value}`;
}

function generateMAI(elements: PixElements): string {
  if (elements.type === PixElementType.STATIC) {
    return [
      generateEmvElement(EmvMaiSchema.TAG_MAI_GUI, EmvMaiSchema.BC_GUI),
      generateEmvElement(EmvMaiSchema.TAG_MAI_PIXKEY, elements.pixKey),
      generateEmvElement(EmvMaiSchema.TAG_MAI_INFO_ADD, elements.infoAdicional),
    ].join('');
  } else if (elements.type === PixElementType.DYNAMIC) {
    return [
      generateEmvElement(EmvMaiSchema.TAG_MAI_GUI, EmvMaiSchema.BC_GUI),
      generateEmvElement(EmvMaiSchema.TAG_MAI_URL, elements.url),
    ].join('');
  }
  return undefined;
}

function generateAdditionalData(txid: string) {
  return generateEmvElement(EmvAdditionalDataSchema.TAG_TXID, txid || '***');
}

export function createEmv(elements: PixElements): string {
  if (![PixElementType.STATIC, PixElementType.DYNAMIC].includes(elements.type))
    return 'INVALID';

  const emvElements = [
    generateEmvElement(EmvSchema.TAG_INIT, '01'),
    generateEmvElement(EmvSchema.TAG_ONETIME, elements.oneTime ? '12' : ''),
    generateEmvElement(EmvSchema.TAG_MAI, generateMAI(elements)),
    generateEmvElement(EmvSchema.TAG_MCC, elements.merchantCategoryCode),
    generateEmvElement(
      EmvSchema.TAG_TRANSACTION_CURRENCY,
      elements.transactionCurrency
    ),
    elements.type === PixElementType.STATIC
      ? generateEmvElement(
          EmvSchema.TAG_TRANSACTION_AMOUNT,
          elements.transactionAmount > 0
            ? elements.transactionAmount.toFixed(2)
            : ''
        )
      : '',
    generateEmvElement(EmvSchema.TAG_COUNTRY_CODE, elements.countryCode),
    generateEmvElement(
      EmvSchema.TAG_MERCHANT_NAME,
      normalizeName(elements.merchantName)
    ),
    generateEmvElement(
      EmvSchema.TAG_MERCHANT_CITY,
      normalizeCity(elements.merchantCity)
    ),
    generateEmvElement(
      EmvSchema.TAG_ADDITIONAL_DATA,
      generateAdditionalData(
        elements.type === PixElementType.STATIC ? elements.txid : ''
      )
    ),
    generateEmvElement(EmvSchema.TAG_CRC, '0000'),
  ];
  const generatedEmv = emvElements.join('');
  return generatedEmv.replace(/\w{4}$/, computeCRC(generatedEmv));
}

export function parseEmv({
  emvCode,
  currentIndex = 0,
  currentData = {},
}): ParsedTags {
  const tag = +emvCode.substring(currentIndex, currentIndex + 2);
  const length = Number(emvCode.substring(currentIndex + 2, currentIndex + 4));
  const value = emvCode.substring(currentIndex + 4, currentIndex + 4 + length);

  if (!length || !value.length || length !== value.length) {
    return {
      isValid: false,
      rawTags: currentData,
    };
  }

  const newData = {
    ...currentData,
    [tag]: {
      tag: tag,
      length: length,
      value: value,
      ...(Object.values(TagsWithSubTags).includes(tag)
        ? { subTags: parseEmv({ emvCode: value }) }
        : {}),
    },
  };

  if (currentIndex + 4 + length === emvCode.length) {
    return {
      isValid: true,
      rawTags: newData,
      getTag: (tag: string | number) => newData?.[Number(tag)]?.value,
      getSubTag: (tag: string | number, mainTag: string | number) =>
        newData?.[Number(mainTag)]?.subTags?.getTag(Number(tag)),
    };
  } else {
    return parseEmv({
      emvCode,
      currentIndex: currentIndex + 4 + length,
      currentData: newData,
    });
  }
}
