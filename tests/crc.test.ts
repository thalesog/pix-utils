import { describe, expect, it } from 'vitest';
import { computeCRC } from '../src/crc';
import { DYNAMIC_TEST_EMV, STATIC_TEST_EMV } from './emvCodes';

describe('CRC Calculator and Parser', () => {
  it('should be able to calculate crc', () => {
    const calculatedCrc = computeCRC(STATIC_TEST_EMV);

    expect(calculatedCrc).toEqual('0DC6');
  });

  it('should be able to replace wrong crc calculation', () => {
    const brCodeWithWrongCRC = DYNAMIC_TEST_EMV.replace('42C5', 'ABCD');
    const calculatedCrc = computeCRC(brCodeWithWrongCRC);

    expect(calculatedCrc).toEqual('42C5');
  });
});
