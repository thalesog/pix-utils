import { PIXQRCode } from '../dist'

it('should be able to create a static EMV code from data', () => {
  PIXQRCode.createCode({
    type: 'static',
    chave: 'thalesog@me.com',
    transactionAmount: 1.0,
    merchantCategoryCode: '',
    transactionCurrency: 986,
    countryCode: 'BR',
    merchantName: 'Thales Ogliari',
    merchantCity: 'Sao Miguel do Oeste',
  })

  expect(true).toBe(true)
})

it('should be able to create a static EMV code from data', () => {
  PIXQRCode.createCode({
    type: 'dynamic',
    url: 'http://qrc.thog.me/',
    merchantCategoryCode: '',
    transactionCurrency: 986,
    countryCode: 'BR',
    merchantName: 'Thales Ogliari',
    merchantCity: 'Sao Miguel do Oeste',
  })

  expect(true).toBe(true)
})
