export interface EMVQRCodeMandatoryElements {
  merchantCategoryCode: string // EL52
  transactionCurrency: number // EL53
  countryCode: string // EL58
  merchantName: string // EL59
  merchantCity: string // EL60
}

export interface EMVQRCodeBasicElements extends EMVQRCodeMandatoryElements {
  oneTime?: boolean // EL02
  transactionAmount?: number // EL54
}

export interface PIXDynamicElements extends EMVQRCodeBasicElements {
  type: 'dynamic'
  url: string
}

export interface PIXStaticElements extends EMVQRCodeBasicElements {
  type: 'static'
  chave: string
  txid?: string
  infoAdicional?: string
}

export type PIXQRCodeElements = PIXStaticElements | PIXDynamicElements
