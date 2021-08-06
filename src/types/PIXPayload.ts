export enum PixDynamicStatus {
  ATIVA = 'ATIVA',
  CONCLUIDA = 'CONCLUIDA',
  REMOVIDA_PELO_USUARIO_RECEBEDOR = 'REMOVIDA_PELO_USUARIO_RECEBEDOR',
  REMOVIDA_PELO_PSP = 'REMOVIDA_PELO_PSP',
}

type InfoAdicional = {
  nome: string
  valor: string
}

export type PIXPaylodParams = {
  DPP?: string
  codMun?: string
}

export type PIXFuturePayload = {
  revisao: number
  calendario: {
    criacao: string
    apresentacao: string
    dataDeVencimento?: string
    validadeAposVencimento?: number
  }
  devedor?: {
    cpf?: string
    cnpj?: string
    nome?: string
  }
  recebedor?: {
    cpf?: string
    cnpj?: string
    nome: string
    logradouro: string
    cidade: string
    utf: string
    cep: string
  }
  valor: {
    original?: string
    multa?: string
    juros?: string
    abatimento?: string
    desconto?: string
    final: string
  }
  chave: string
  txid: string
  solicitacaoPagador?: string
  infoAdicionais: InfoAdicional[]
  status: PixDynamicStatus
}

export type PIXInstantPayload = {
  revisao: number
  calendario: {
    criacao: string
    apresentacao: string
    expiracao: number
  }
  devedor?: {
    cpf?: string
    cnpj?: string
    nome: string
  }
  valor: {
    original: string
    modalidadeAlteracao?: 0 | 1
    // TODO: Missing retirada object
  }
  chave: string
  txid: string
  solicitacaoPagador?: string
  infoAdicionais?: InfoAdicional[]
  status: PixDynamicStatus
}

export type PIXPayload = PIXInstantPayload | PIXFuturePayload

export const PayloadExample: PIXPayload = {
  txid: 'fc9a4366-ff3d-4964-b5db-c6c91a8722d3',
  revisao: 3,
  calendario: {
    criacao: '2020-09-15T19:39:54.013Z',
    apresentacao: '2020-04-01T18:00:00Z',
    expiracao: 3600,
  },
  status: PixDynamicStatus.ATIVA,

  valor: {
    original: '500.00',
    final: '500.00',
    modalidadeAlteracao: 0,
  },

  chave: '7407c9c8-f78b-11ea-adc1-0242ac120002',

  solicitacaoPagador: 'Informar cartão fidelidade',

  infoAdicionais: [{ nome: 'quantidade', valor: '2' }],
}
