import { describe, expect, it } from 'vitest';
import { parsePix, PixElementType } from '../src';
import { hasError, isDynamicPix, isStaticPix } from '../src/validate';
import { DYNAMIC_TEST_EMV, STATIC_TEST_EMV } from './emvCodes';

describe('EMV Data Extractor', () => {
  it('should be able to extract basic elements from a static pix', () => {
    const parsedPix = parsePix(STATIC_TEST_EMV);

    expect(hasError(parsedPix)).toBe(false);
    if (hasError(parsedPix)) return;

    expect(isStaticPix(parsedPix)).toBe(true);
    if (!isStaticPix(parsedPix)) return;

    // PARSE MAI
    expect(parsedPix.type).toBe(PixElementType.STATIC);
    expect(parsedPix.merchantCategoryCode).toBe('0000');
    expect(parsedPix.transactionCurrency).toBe('986');
    expect(parsedPix.countryCode).toBe('BR');
    expect(parsedPix.merchantName).toBe('Thales Ogliari');
    expect(parsedPix.merchantCity).toBe('SAO MIGUEL DO O');
    expect(parsedPix.pixKey).toBe('thalesog@me.com');
  });

  it('should be able to extract basic elements from a dynamic pix', () => {
    const parsedPix = parsePix(DYNAMIC_TEST_EMV);

    expect(hasError(parsedPix)).toBe(false);
    if (hasError(parsedPix)) return;

    expect(isDynamicPix(parsedPix)).toBe(true);
    if (!isDynamicPix(parsedPix)) return;

    expect(parsedPix.type).toBe(PixElementType.DYNAMIC);
    expect(parsedPix.merchantCategoryCode).toBe('0000');
    expect(parsedPix.transactionCurrency).toBe('986');
    expect(parsedPix.countryCode).toBe('BR');
    expect(parsedPix.merchantName).toBe('Thales Ogliari');
    expect(parsedPix.merchantCity).toBe('SAO MIGUEL DO O');
    expect(parsedPix.url).toBe(
      'payload.psp.com/3ec9d2f9-5f03-4e0e-820d-63a81e769e87'
    );
  });
});
