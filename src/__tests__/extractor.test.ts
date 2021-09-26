import { parsePix } from '../main';
import {
  DynamicPixEmvElements,
  PixElementType,
  StaticPixEmvElements,
} from '../types/pixElements';

import { DYNAMIC_TEST_EMV, STATIC_TEST_EMV } from './parser.test';

describe('EMV Data Extractor', () => {
  it('should be able to extract basic elements from a static pix', () => {
    const parsedPix = parsePix(STATIC_TEST_EMV) as StaticPixEmvElements;

    // PARSE MAI
    expect(parsedPix.type).toBe(PixElementType.STATIC);
    expect(parsedPix.merchantCategoryCode).toBe('0000');
    expect(parsedPix.transactionCurrency).toBe('986');
    expect(parsedPix.countryCode).toBe('BR');
    expect(parsedPix.merchantName).toBe('Thales Ogliari');
    expect(parsedPix.merchantCity).toBe('SC');
    expect(parsedPix.pixKey).toBe('thalesog@me.com');
  });

  it('should be able to extract basic elements from a dynamic pix', () => {
    const parsedPix = parsePix(DYNAMIC_TEST_EMV) as DynamicPixEmvElements;

    // PARSE MAI
    expect(parsedPix.type).toBe(PixElementType.DYNAMIC);
    expect(parsedPix.merchantCategoryCode).toBe('0000');
    expect(parsedPix.transactionCurrency).toBe('986');
    expect(parsedPix.countryCode).toBe('BR');
    expect(parsedPix.merchantName).toBe('Pix');
    expect(parsedPix.merchantCity).toBe('BRASILIA');
    expect(parsedPix.url).toBe(
      'qr-h.sandbox.pix.bcb.gov.br/rest/api/v2/cfe8166acaff4a62a18b7b766ef57c70'
    );
  });
});
