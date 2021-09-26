import { computeCRC } from '../crc';

import { DYNAMIC_TEST_EMV, STATIC_TEST_EMV } from './parser.test';

describe('CRC Calculator and Parser', () => {
  it('should be able to calculate crc', () => {
    const calculatedCrc = computeCRC(STATIC_TEST_EMV);

    expect(calculatedCrc).toEqual('E5AB');
  });

  it('should be able to replace wrong crc calculation', () => {
    const brCodeWithWrongCRC = DYNAMIC_TEST_EMV.replace('C7D7', 'ABCD');
    const calculatedCrc = computeCRC(brCodeWithWrongCRC);

    expect(calculatedCrc).toEqual('C7D7');
  });
});
