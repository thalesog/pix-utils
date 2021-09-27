import { parseEmv } from '../emvHandler';
import {
  EmvMaiSchema,
  EmvMandatory,
  EmvSchema,
  ValidTags,
} from '../types/pixEmvSchema';

export const STATIC_TEST_EMV =
  '00020126510014br.gov.bcb.pix0115thalesog@me.com0210Pedido 123520400005303986540510.005802BR5914Thales Ogliari6002SC62070503***6304E5AB';

export const STATIC_TEST_EMV_NUBANK =
  '00020126580014BR.GOV.BCB.PIX0119nubank@thalesog.com0213PIX de Testes52040000530398654041.005802BR5914Thales Ogliari6009SAO PAULO61080540900062070503***6304581E';

export const DYNAMIC_TEST_EMV =
  '00020126940014br.gov.bcb.pix2572qr-h.sandbox.pix.bcb.gov.br/rest/api/v2/cfe8166acaff4a62a18b7b766ef57c705204000053039865802BR5903Pix6008BRASILIA62070503***6304C7D7';

it('should be able to parse mandatory elements from a qrcode', () => {
  const { getTag } = parseEmv({ emvCode: STATIC_TEST_EMV }) as ValidTags;

  // PARSE MAI
  expect(getTag(EmvMandatory.TAG_MCC)).toBe('0000');
  expect(getTag(EmvMandatory.TAG_TRANSACTION_CURRENCY)).toBe('986');
  expect(getTag(EmvMandatory.TAG_COUNTRY_CODE)).toBe('BR');
  expect(getTag(EmvMandatory.TAG_MERCHANT_NAME)).toBe('Thales Ogliari');
  expect(getTag(EmvMandatory.TAG_MERCHANT_CITY)).toBe('SC');
});

it('should be able to parse merchant account information from a static emv code', () => {
  const { getSubTag } = parseEmv({ emvCode: STATIC_TEST_EMV }) as ValidTags;

  // PARSE MAI
  expect(getSubTag(EmvMaiSchema.TAG_MAI_GUI, EmvSchema.TAG_MAI)).toBe(
    'br.gov.bcb.pix'
  );
  expect(getSubTag(EmvMaiSchema.TAG_MAI_PIXKEY, EmvSchema.TAG_MAI)).toBe(
    'thalesog@me.com'
  );
  expect(getSubTag(EmvMaiSchema.TAG_MAI_INFO_ADD, EmvSchema.TAG_MAI)).toBe(
    'Pedido 123'
  );
});

it('should be able to parse merchant account information from a dynamic emv code', () => {
  const { getSubTag } = parseEmv({ emvCode: DYNAMIC_TEST_EMV }) as ValidTags;

  // PARSE MAI
  expect(getSubTag(EmvMaiSchema.TAG_MAI_GUI, EmvSchema.TAG_MAI)).toBe(
    'br.gov.bcb.pix'
  );
  expect(getSubTag(EmvMaiSchema.TAG_MAI_URL, EmvSchema.TAG_MAI)).toBe(
    'qr-h.sandbox.pix.bcb.gov.br/rest/api/v2/cfe8166acaff4a62a18b7b766ef57c70'
  );
});