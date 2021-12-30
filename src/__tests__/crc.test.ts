import { computeCRC } from '../crc';

import { DYNAMIC_TEST_EMV, STATIC_TEST_EMV } from './emvCodes';

describe('CRC Calculator and Parser', () => {
  it('should be able to calculate crc', () => {
    const calculatedCrc = computeCRC(STATIC_TEST_EMV);

    expect(calculatedCrc).toEqual('4367');
  });

  it('should be able to replace wrong crc calculation', () => {
    const brCodeWithWrongCRC = DYNAMIC_TEST_EMV.replace('0C64', 'ABCD');
    const calculatedCrc = computeCRC(brCodeWithWrongCRC);

    expect(calculatedCrc).toEqual('0C64');
  });
});
