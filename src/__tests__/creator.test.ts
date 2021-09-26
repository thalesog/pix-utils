import { createDynamicPix, createStaticPix } from '../create';

import { DYNAMIC_TEST_EMV, STATIC_TEST_EMV } from './parser.test';

describe('EMV Code Creation', () => {
  it('should be able to create a static pix from mandatory fields', () => {
    const staticPixFn = createStaticPix({
      merchantName: 'Thales Ogliari',
      merchantCity: 'SC',
      pixKey: 'thalesog@me.com',
      infoAdicional: 'Pedido 123',
      txid: '',
      transactionAmount: 10,
    });

    expect(staticPixFn.toBRCode()).toBe(STATIC_TEST_EMV);
  });

  it('should be able to create a dynamic pix from mandatory fields', () => {
    const dynamicPixFn = createDynamicPix({
      merchantName: 'Pix',
      merchantCity: 'BRASILIA',
      url: 'qr-h.sandbox.pix.bcb.gov.br/rest/api/v2/cfe8166acaff4a62a18b7b766ef57c70',
    });
    expect(dynamicPixFn.toBRCode()).toBe(DYNAMIC_TEST_EMV);
  });
});
