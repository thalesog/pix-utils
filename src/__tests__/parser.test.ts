import { parsePix, PixDynamicObject, PixStaticObject } from '..';
import { parseEmv } from '../emvHandler';
import {
  EmvMaiSchema,
  EmvMandatory,
  EmvSchema,
  ValidTags,
} from '../types/pixEmvSchema';

import {
  DYNAMIC_TEST_EMV,
  STATIC_TEST_EMV,
  STATIC_TEST_NO_VALUE_ELEMENT_EMV,
  STATIC_TEST_NO_VALUE_EMV,
} from './emvCodes';

describe('EMV Parser', () => {
  it('should be able to parse mandatory elements from a qrcode', () => {
    const { getTag } = parseEmv({ emvCode: STATIC_TEST_EMV }) as ValidTags;

    // PARSE MAI
    expect(getTag(EmvMandatory.TAG_MCC)).toBe('0000');
    expect(getTag(EmvMandatory.TAG_TRANSACTION_CURRENCY)).toBe('986');
    expect(getTag(EmvMandatory.TAG_COUNTRY_CODE)).toBe('BR');
    expect(getTag(EmvMandatory.TAG_MERCHANT_NAME)).toBe('Thales Ogliari');
    expect(getTag(EmvMandatory.TAG_MERCHANT_CITY)).toBe('SAO MIGUEL DO O');
  });

  it('should be able to parse merchant account information from a static emv code', () => {
    const { getSubTag } = parseEmv({ emvCode: STATIC_TEST_EMV }) as ValidTags;

    // PARSE MAI
    expect(getSubTag(EmvMaiSchema.TAG_MAI_GUI, EmvSchema.TAG_MAI)).toBe(
      'br.gov.bcb.pix'
    );
    expect(getSubTag(EmvMaiSchema.TAG_MAI_PIXKEY, EmvSchema.TAG_MAI)).toBe(
      'thalesog@me.com'
    );
    expect(getSubTag(EmvMaiSchema.TAG_MAI_INFO_ADD, EmvSchema.TAG_MAI)).toBe(
      'Pedido 123'
    );
  });

  it('should be able to parse merchant account information from a dynamic emv code', () => {
    const { getSubTag } = parseEmv({ emvCode: DYNAMIC_TEST_EMV }) as ValidTags;

    // PARSE MAI
    expect(getSubTag(EmvMaiSchema.TAG_MAI_GUI, EmvSchema.TAG_MAI)).toBe(
      'br.gov.bcb.pix'
    );
    expect(getSubTag(EmvMaiSchema.TAG_MAI_URL, EmvSchema.TAG_MAI)).toBe(
      'payload.psp.com/3ec9d2f9-5f03-4e0e-820d-63a81e769e87'
    );
  });
  it('should be able to parse a static pix', () => {
    const pix = parsePix(STATIC_TEST_EMV) as PixStaticObject;

    expect(pix.type).toBe('STATIC');
    expect(pix.merchantCategoryCode).toBe('0000');
    expect(pix.transactionCurrency).toBe('986');
    expect(pix.countryCode).toBe('BR');
    expect(pix.merchantName).toBe('Thales Ogliari');
    expect(pix.merchantCity).toBe('SAO MIGUEL DO O');
    expect(pix.pixKey).toBe('thalesog@me.com');
    expect(pix.transactionAmount).toBe(10);
    expect(pix.infoAdicional).toBe('Pedido 123');
    expect(pix.txid).toBe('***');
  });

  it('should be able to parse a static pix with no value', () => {
    const pix = parsePix(STATIC_TEST_NO_VALUE_EMV) as PixStaticObject;

    expect(pix.type).toBe('STATIC');
    expect(pix.merchantCategoryCode).toBe('0000');
    expect(pix.transactionCurrency).toBe('986');
    expect(pix.countryCode).toBe('BR');
    expect(pix.merchantName).toBe('Thales Ogliari');
    expect(pix.merchantCity).toBe('SAO MIGUEL DO O');
    expect(pix.pixKey).toBe('thalesog@me.com');
    expect(pix.transactionAmount).toBe(0);
    expect(pix.infoAdicional).toBe('Pedido 123');
    expect(pix.txid).toBe('***');
  });

  it('should be able to parse a static pix with no value element', () => {
    const pix = parsePix(STATIC_TEST_NO_VALUE_ELEMENT_EMV) as PixStaticObject;

    expect(pix.type).toBe('STATIC');
    expect(pix.merchantCategoryCode).toBe('0000');
    expect(pix.transactionCurrency).toBe('986');
    expect(pix.countryCode).toBe('BR');
    expect(pix.merchantName).toBe('Thales Ogliari');
    expect(pix.merchantCity).toBe('SAO MIGUEL DO O');
    expect(pix.pixKey).toBe('thalesog@me.com');
    expect(pix.transactionAmount).toBe(0);
    expect(pix.infoAdicional).toBe('Pedido 123');
    expect(pix.txid).toBe('***');
  });

  it('should be able to parse a static pix', () => {
    const pix = parsePix(DYNAMIC_TEST_EMV) as PixDynamicObject;

    expect(pix.type).toBe('DYNAMIC');
    expect(pix.merchantCategoryCode).toBe('0000');
    expect(pix.transactionCurrency).toBe('986');
    expect(pix.countryCode).toBe('BR');
    expect(pix.merchantName).toBe('Thales Ogliari');
    expect(pix.merchantCity).toBe('SAO MIGUEL DO O');
    expect(pix.url).toBe(
      'payload.psp.com/3ec9d2f9-5f03-4e0e-820d-63a81e769e87'
    );
  });
});
