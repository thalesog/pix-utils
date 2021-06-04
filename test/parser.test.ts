import { PIXQRCode } from '../dist'
import { PIXStaticElements } from '../dist/types/PIXElements'

it('should be able to parse a static qrcode data', () => {
  const brCode =
    '00020126510014br.gov.bcb.pix0115thalesog@me.com0210Pedido 123520400005303986540510.005802BR5914Thales Ogliari6002SC62070503***6304E5AB'

  const {
    type,
    transactionAmount,
    merchantCity,
    merchantName,
    countryCode,
    txid,
    chave,
    infoAdicional,
    transactionCurrency,
    oneTime,
  } = PIXQRCode.parseCode(brCode, {
    encoding: 'utf8',
  }).extractElements() as PIXStaticElements

  expect(type).toBe('static')
  expect(chave).toBe('thalesog@me.com')
  expect(transactionAmount).toBe(10.0)
  expect(merchantCity).toBe('SC')
  expect(merchantName).toBe('Thales Ogliari')
  expect(countryCode).toBe('BR')
  expect(infoAdicional).toBe('Pedido 123')
  expect(transactionCurrency).toBe(986)
  expect(oneTime).toBe(false)
  expect(txid).toBe('***')
})
