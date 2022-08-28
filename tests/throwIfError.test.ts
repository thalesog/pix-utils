import { describe, expect, it } from 'vitest';
import { createStaticPix } from '../src';

describe('throwIfError', () => {
  it('should be able to return the correct object when no errors are detected', () => {
    const staticPixFn = createStaticPix({
      merchantName: 'Thales Ogliari',
      merchantCity: 'SAO MIGUEL',
      pixKey: 'nubank@thalesog.com',
      infoAdicional: 'Pedido 123',
      txid: '',
      transactionAmount: 10,
    }).throwIfError();

    expect(staticPixFn).toEqual(
      expect.objectContaining({
        ...staticPixFn,
      })
    );
  });

  it('should throw if merchant city is longer than 15 characters', () => {
    const staticPixFn = createStaticPix({
      merchantName: 'Thales Ogliari',
      merchantCity: 'SAO MIGUEL DO OESTE',
      pixKey: 'nubank@thalesog.com',
      infoAdicional: 'Pedido 123',
      txid: '',
      transactionAmount: 10,
    });

    expect(staticPixFn.throwIfError).toThrow(
      'merchantCity character limit exceeded (> 15)'
    );
  });

  it('should throw if merchant name is longer than 25 characters', () => {
    const staticPixFn = createStaticPix({
      merchantName: 'Thales Ogliari Thales Ogliari Thales Ogliari',
      merchantCity: 'SAO MIGUEL',
      pixKey: 'nubank@thalesog.com',
      infoAdicional: 'Pedido 123',
      txid: '',
      transactionAmount: 10,
    });

    expect(staticPixFn.throwIfError).toThrow(
      'merchantName character limit exceeded (> 25)'
    );
  });

  it('should throw if txid is longer than 25 characters', () => {
    const staticPixFn = createStaticPix({
      merchantName: 'Thales Ogliari',
      merchantCity: 'SAO MIGUEL',
      pixKey: 'nubank@thalesog.com',
      infoAdicional: 'Pedido 123',
      txid: 'F2B8073B0A52461997F53FB2A85FE7E8',
      transactionAmount: 10,
    });

    expect(staticPixFn.throwIfError).toThrow(
      'txid character limit exceeded (> 25)'
    );
  });
});
