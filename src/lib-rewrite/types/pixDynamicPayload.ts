export enum PixDynamicStatus {
  ATIVA = 'ATIVA',
  CONCLUIDA = 'CONCLUIDA',
  REMOVIDA_PELO_USUARIO_RECEBEDOR = 'REMOVIDA_PELO_USUARIO_RECEBEDOR',
  REMOVIDA_PELO_PSP = 'REMOVIDA_PELO_PSP',
}

type InfoAdicional = {
  readonly nome: string;
  readonly valor: string;
};

export type PIXPaylodParams = {
  readonly DPP?: string;
  readonly codMun?: string;
};

export type PIXFuturePayload = {
  readonly revisao: number;
  readonly calendario: {
    readonly criacao: string;
    readonly apresentacao: string;
    readonly dataDeVencimento?: string;
    readonly validadeAposVencimento?: number;
  };
  readonly devedor?: {
    readonly cpf?: string;
    readonly cnpj?: string;
    readonly nome?: string;
  };
  readonly recebedor?: {
    readonly cpf?: string;
    readonly cnpj?: string;
    readonly nome: string;
    readonly logradouro: string;
    readonly cidade: string;
    readonly utf: string;
    readonly cep: string;
  };
  readonly valor: {
    readonly original?: string;
    readonly multa?: string;
    readonly juros?: string;
    readonly abatimento?: string;
    readonly desconto?: string;
    readonly final: string;
  };
  readonly chave: string;
  readonly txid: string;
  readonly solicitacaoPagador?: string;
  readonly infoAdicionais: readonly InfoAdicional[];
  readonly status: PixDynamicStatus;
};

export type PIXInstantPayload = {
  readonly revisao: number;
  readonly calendario: {
    readonly criacao: string;
    readonly apresentacao: string;
    readonly expiracao: number;
  };
  readonly devedor?: {
    readonly cpf?: string;
    readonly cnpj?: string;
    readonly nome: string;
  };
  readonly valor: {
    readonly original: string;
    readonly modalidadeAlteracao?: 0 | 1;
    // TODO: Missing retirada object
  };
  readonly chave: string;
  readonly txid: string;
  readonly solicitacaoPagador?: string;
  readonly infoAdicionais?: readonly InfoAdicional[];
  readonly status: PixDynamicStatus;
};

export type PIXPayload = PIXInstantPayload | PIXFuturePayload;

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
};
