import { describe, expect, it } from 'vitest';
import { createDynamicPix, createStaticPix, hasError } from '../src';
import {
  DYNAMIC_TEST_EMV,
  STATIC_TEST_EMV,
  STATIC_TEST_NO_VALUE_EMV,
} from './emvCodes';

describe('EMV Code Creation', () => {
  it('should be able to create a static pix from mandatory fields', () => {
    const staticPixFn = createStaticPix({
      merchantName: 'Thales Ogliari',
      merchantCity: 'SAO MIGUEL DO OESTE'.substr(0, 15),
      pixKey: 'thalesog@me.com',
      infoAdicional: 'Pedido 123',
      transactionAmount: 10,
    });

    expect(hasError(staticPixFn)).toBe(false);
    if (hasError(staticPixFn)) return;

    expect(staticPixFn.toBRCode()).toBe(STATIC_TEST_EMV);
  });

  it('should be able to create a static pix from mandatory fields and empty txid', () => {
    const staticPixFn = createStaticPix({
      merchantName: 'Thales Ogliari',
      merchantCity: 'SAO MIGUEL DO OESTE'.substr(0, 15),
      pixKey: 'thalesog@me.com',
      infoAdicional: 'Pedido 123',
      txid: '',
      transactionAmount: 10,
    });

    expect(hasError(staticPixFn)).toBe(false);
    if (hasError(staticPixFn)) return;

    expect(staticPixFn.toBRCode()).toBe(STATIC_TEST_EMV);
  });

  it('should be able to create a static pix from mandatory fields with no amount defined', () => {
    const staticPixFn = createStaticPix({
      merchantName: 'Thales Ogliari',
      merchantCity: 'SAO MIGUEL DO OESTE'.substr(0, 15),
      pixKey: 'thalesog@me.com',
      infoAdicional: 'Pedido 123',
      txid: '',
      transactionAmount: 0,
    });

    expect(hasError(staticPixFn)).toBe(false);
    if (hasError(staticPixFn)) return;

    expect(staticPixFn.toBRCode()).toBe(STATIC_TEST_NO_VALUE_EMV);
  });

  it('should be able to create a dynamic pix from mandatory fields', () => {
    const dynamicPixFn = createDynamicPix({
      merchantName: 'Thales Ogliari',
      merchantCity: 'SAO MIGUEL DO OESTE'.substr(0, 15),
      url: 'payload.psp.com/3ec9d2f9-5f03-4e0e-820d-63a81e769e87',
    });

    expect(hasError(dynamicPixFn)).toBe(false);
    if (hasError(dynamicPixFn)) return;

    expect(dynamicPixFn.toBRCode()).toBe(DYNAMIC_TEST_EMV);
  });
});
