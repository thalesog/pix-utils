import { describe, expect, it } from 'vitest';
import {
  parsePix,
  PixCompositeObject,
  PixDynamicObject,
  PixStaticObject,
} from '../src';
import { parseEmv } from '../src/emvHandler';
import {
  EmvMaiSchema,
  EmvMandatory,
  EmvSchema,
  ValidTags,
} from '../src/types/pixEmvSchema';
import {
  COMPOSITE_DYNAMIC_UNRESERVED_EMV,
  DYNAMIC_TEST_EMV,
  COMPOSITE_STATIC_UNRESERVED_EMV,
  STATIC_TEST_EMV,
  STATIC_TEST_NO_VALUE_ELEMENT_EMV,
  STATIC_TEST_NO_VALUE_EMV,
  COMPOSITE_DYNAMIC_UNRESERVED_REC,
  STATIC_TEST_WITH_FSS,
} from './emvCodes';

describe('EMV Parser', () => {
  it('should be able to parse mandatory elements from a qrcode', () => {
    const { getTag } = parseEmv({ emvCode: STATIC_TEST_EMV }) as ValidTags;

    // PARSE MAI
    expect(getTag(EmvMandatory.TAG_MCC)).toBe('0000');
    expect(getTag(EmvMandatory.TAG_TRANSACTION_CURRENCY)).toBe('986');
    expect(getTag(EmvMandatory.TAG_COUNTRY_CODE)).toBe('BR');
    expect(getTag(EmvMandatory.TAG_MERCHANT_NAME)).toBe('THALES OGLIARI');
    expect(getTag(EmvMandatory.TAG_MERCHANT_CITY)).toBe('SAO MIGUEL DO O');
  });

  it('should be able to parse additional data from a dynamic emv code', () => {
    const { getTag, getSubTag } = parseEmv({
      emvCode: COMPOSITE_STATIC_UNRESERVED_EMV,
    }) as ValidTags;

    // PARSE UT
    expect(getTag(EmvMandatory.TAG_MCC)).toBe('0000');
    expect(getTag(EmvMandatory.TAG_TRANSACTION_CURRENCY)).toBe('986');
    expect(getTag(EmvMandatory.TAG_COUNTRY_CODE)).toBe('BR');
    expect(getTag(EmvMandatory.TAG_MERCHANT_NAME)).toBe('Pix');
    expect(getTag(EmvMandatory.TAG_MERCHANT_CITY)).toBe('BRASILIA');
    expect(
      getSubTag(EmvMaiSchema.TAG_MAI_URL, EmvSchema.TAG_UNRESERVED_TEMPLATE)
    ).toBe(
      'qr-h.sandbox.pix.bcb.gov.br/rest/api/rec/d7913bcbfc4947c9811669db12b40374'
    );
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
    expect(pix.merchantName).toBe('THALES OGLIARI');
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
    expect(pix.merchantName).toBe('THALES OGLIARI');
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
    expect(pix.merchantName).toBe('THALES OGLIARI');
    expect(pix.merchantCity).toBe('SAO MIGUEL DO O');
    expect(pix.pixKey).toBe('thalesog@me.com');
    expect(pix.transactionAmount).toBe(0);
    expect(pix.infoAdicional).toBe('Pedido 123');
    expect(pix.txid).toBe('***');
  });

  it('should be able to parse a dynamic pix', () => {
    const pix = parsePix(DYNAMIC_TEST_EMV) as PixDynamicObject;

    expect(pix.type).toBe('DYNAMIC');
    expect(pix.merchantCategoryCode).toBe('0000');
    expect(pix.transactionCurrency).toBe('986');
    expect(pix.countryCode).toBe('BR');
    expect(pix.merchantName).toBe('THALES OGLIARI');
    expect(pix.merchantCity).toBe('SAO MIGUEL DO O');
    expect(pix.url).toBe(
      'payload.psp.com/3ec9d2f9-5f03-4e0e-820d-63a81e769e87'
    );
  });

  it('should be able to parse a pix with additional data', () => {
    const pix = parsePix(COMPOSITE_STATIC_UNRESERVED_EMV) as PixStaticObject;

    expect(pix.type).toBe('STATIC');
    expect(pix.merchantCategoryCode).toBe('0000');
    expect(pix.transactionCurrency).toBe('986');
    expect(pix.countryCode).toBe('BR');
    expect(pix.merchantName).toBe('Pix');
    expect(pix.merchantCity).toBe('BRASILIA');
    expect(pix.txid).toBe('80a2d0a923984e8dbb80b4adf');
    expect(pix.urlRec).toBe(
      'qr-h.sandbox.pix.bcb.gov.br/rest/api/rec/d7913bcbfc4947c9811669db12b40374'
    );
  });

  it('should be able to parse a dynamic pix additional data', () => {
    const pix = parsePix(
      COMPOSITE_DYNAMIC_UNRESERVED_EMV
    ) as PixCompositeObject;

    expect(pix.type).toBe('COMPOSITE');
    expect(pix.merchantCategoryCode).toBe('0000');
    expect(pix.transactionCurrency).toBe('986');
    expect(pix.countryCode).toBe('BR');
    expect(pix.merchantName).toBe('FULANO DE TAL');
    expect(pix.merchantCity).toBe('BRASILIA');
    expect(pix.url).toBe(
      'qr-h.sandbox.pix.bcb.gov.br/rest/api/v2/7b2d64c4eb744a2d92a4dd5f8cfc4dfa'
    );
    expect(pix.urlRec).toBe(
      'qr-h.sandbox.pix.bcb.gov.br/rest/api/rec/3d29b94249c54b3f8c533d729f59b5e5'
    );
  });

  it('should be able to parse a pix with rec additional data only', () => {
    const pix = parsePix(
      COMPOSITE_DYNAMIC_UNRESERVED_REC
    ) as PixCompositeObject;

    expect(pix.type).toBe('COMPOSITE');
    expect(pix.merchantCategoryCode).toBe('0000');
    expect(pix.transactionCurrency).toBe('986');
    expect(pix.countryCode).toBe('BR');
    expect(pix.merchantName).toBe('Fulano de Tal');
    expect(pix.merchantCity).toBe('BRASILIA');
    expect(pix.urlRec).toBe(
      'qr-h.sandbox.pix.bcb.gov.br/rest/api/rec/5ee5232ead29422396b44f5eb67180d6'
    );
    expect(pix.url).toBe(undefined);
  });

  it('should be able to parse a static pix with fss', () => {
    const pix = parsePix(STATIC_TEST_WITH_FSS) as PixStaticObject;

    expect(pix.type).toBe('STATIC');
    expect(pix.merchantCategoryCode).toBe('0000');
    expect(pix.transactionCurrency).toBe('986');
    expect(pix.countryCode).toBe('BR');
    expect(pix.merchantName).toBe('Pix');
    expect(pix.merchantCity).toBe('BRASILIA');
    expect(pix.fss).toBe('99999008');
  });
});
