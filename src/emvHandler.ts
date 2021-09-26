import { computeCRC } from './crc';
import { PixElementType, ValidPixElements } from './types/pixElements';
import {
  EmvAdditionalDataSchema,
  EmvMaiSchema,
  EmvSchema,
} from './types/pixEmvSchema';
import zeroPad from './utils/zeroPad';

function generateEmvElement(elementId: number, value: string) {
  if (!value) return '';
  const parsedElementId = zeroPad(elementId, 2);
  const parsedLength = zeroPad(value.length, 2);
  return `${parsedElementId}${parsedLength}${value}`;
}

function generateMAI(elements: ValidPixElements) {
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

export function assembleEmvCode(elements: ValidPixElements) {
  if (elements.type === PixElementType.STATIC) {
    const generatedEmv = [
      generateEmvElement(EmvSchema.TAG_INIT, '01'),
      generateEmvElement(EmvSchema.TAG_ONETIME, elements.oneTime ? '12' : ''),
      generateEmvElement(EmvSchema.TAG_MAI, generateMAI(elements)),
      generateEmvElement(EmvSchema.TAG_MCC, elements.merchantCategoryCode),
      generateEmvElement(
        EmvSchema.TAG_TRANSACTION_CURRENCY,
        elements.transactionCurrency
      ),
      generateEmvElement(
        EmvSchema.TAG_TRANSACTION_AMOUNT,
        elements.transactionAmount.toFixed(2)
      ),
      generateEmvElement(EmvSchema.TAG_COUNTRY_CODE, elements.countryCode),
      generateEmvElement(EmvSchema.TAG_MERCHANT_NAME, elements.merchantName),
      generateEmvElement(EmvSchema.TAG_MERCHANT_CITY, elements.merchantCity),
      generateEmvElement(
        EmvSchema.TAG_ADDITIONAL_DATA,
        generateAdditionalData(elements.txid)
      ),
      generateEmvElement(EmvSchema.TAG_CRC, '0000'),
    ].join('');

    return generatedEmv.replace(/\w{4}$/, computeCRC(generatedEmv));
  } else if (elements.type === PixElementType.DYNAMIC) {
    const generatedEmv = [
      generateEmvElement(EmvSchema.TAG_INIT, '01'),
      generateEmvElement(EmvSchema.TAG_ONETIME, elements.oneTime ? '12' : ''),
      generateEmvElement(EmvSchema.TAG_MAI, generateMAI(elements)),
      generateEmvElement(EmvSchema.TAG_MCC, elements.merchantCategoryCode),
      generateEmvElement(
        EmvSchema.TAG_TRANSACTION_CURRENCY,
        elements.transactionCurrency
      ),
      generateEmvElement(EmvSchema.TAG_COUNTRY_CODE, elements.countryCode),
      generateEmvElement(EmvSchema.TAG_MERCHANT_NAME, elements.merchantName),
      generateEmvElement(EmvSchema.TAG_MERCHANT_CITY, elements.merchantCity),
      generateEmvElement(
        EmvSchema.TAG_ADDITIONAL_DATA,
        generateAdditionalData('')
      ),
      generateEmvElement(EmvSchema.TAG_CRC, '0000'),
    ].join('');

    return generatedEmv.replace(/\w{4}$/, computeCRC(generatedEmv));
  }
  return 'INVALID';
}
