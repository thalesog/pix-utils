import { computeCRC } from '../lib-rewrite/crc';

describe('CRC Calculator and Parser', () => {
  const brCode =
    '00020126510014br.gov.bcb.pix0115thalesog@me.com0210Pedido 123520400005303986540510.005802BR5914Thales Ogliari6002SC62070503***6304E5AB';

  const brCode2 =
    '00020126510014br.gov.bcb.pix0115thalesog@me.com0210Pedido 123520400005303986540510.005802BR5914Thales Ogliari6002SC62070503***6304';

  it('should be able to calculate crc', () => {
    const calculatedCrc = computeCRC(brCode2);

    expect(calculatedCrc).toEqual('E5AB');
  });

  it('should be able remove prev crc from brcode', () => {
    const calculatedCrc = computeCRC(brCode);

    expect(calculatedCrc).toEqual('E5AB');
  });
});
