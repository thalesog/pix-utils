import { parsePix } from '../lib-rewrite/main';
import { StaticPixEmvElements } from '../lib-rewrite/types/pixElements';

import { STATIC_TEST_EMV } from './parse.test';

it('should be able to extract basic elements from a static pix', () => {
  const parsedPix = parsePix(STATIC_TEST_EMV) as StaticPixEmvElements;

  // PARSE MAI
  expect(parsedPix.merchantCategoryCode).toBe('0000');
  expect(parsedPix.transactionCurrency).toBe('986');
  expect(parsedPix.countryCode).toBe('BR');
  expect(parsedPix.merchantName).toBe('Thales Ogliari');
  expect(parsedPix.merchantCity).toBe('SC');
});
