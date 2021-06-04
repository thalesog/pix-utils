export type PIXPayload = {
  revisao: number
  calendario: {
    criacao: string
    apresentacao: string
    expiracao?: number
    vencimento?: string
    diasAposVencimento?: number
  }
  devedor?: {
    cpf?: string
    cnpj?: string
    nome?: string
  }
  valor: {
    original?: string
    final?: string
    juros?: string
    multa?: string
    desconto?: string
    abatimento?: string
    modalidadeAlteracao: number
  }
  chave: string
  txid: string
  solicitacaoPagador?: string
  infoAdicionais: {
    nome: string
    valor: string
  }[]
  status: string
}

export const PayloadExample: PIXPayload = {
  txid: 'fc9a4366-ff3d-4964-b5db-c6c91a8722d3',
  revisao: 3,
  calendario: {
    criacao: '2020-09-15T19:39:54.013Z',
    apresentacao: '2020-04-01T18:00:00Z',
    expiracao: 3600,
  },
  status: 'ATIVA',

  valor: {
    original: '500.00',
    final: '500.00',
    modalidadeAlteracao: 0,
  },

  chave: '7407c9c8-f78b-11ea-adc1-0242ac120002',

  solicitacaoPagador: 'Informar cartão fidelidade',

  infoAdicionais: [{ nome: 'quantidade', valor: '2' }],
}
