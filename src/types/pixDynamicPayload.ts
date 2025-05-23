export enum PixDynamicStatus {
  ATIVA = 'ATIVA',
  CONCLUIDA = 'CONCLUIDA',
  REMOVIDA_PELO_USUARIO_RECEBEDOR = 'REMOVIDA_PELO_USUARIO_RECEBEDOR',
  REMOVIDA_PELO_PSP = 'REMOVIDA_PELO_PSP',
}

export enum Periodicidade {
  SEMANAL = 'SEMANAL',
  MENSAL = 'MENSAL',
  TRIMESTRAL = 'TRIMESTRAL',
  SEMESTRAL = 'SEMESTRAL',
  ANUAL = 'ANUAL',
}

export enum PoliticaRetentativa {
  NAO_PERMITE = 'NAO_PERMITE',
  PERMITE_3R_7D = 'PERMITE_3R_7D',
}

export enum StatusRec {
  CRIADA = 'CRIADA',
  APROVADA = 'APROVADA',
  REJEITADA = 'REJEITADA',
  EXPIRADA = 'EXPIRADA',
  CANCELADA = 'CANCELADA',
}

export enum ModalidadeAgente {
  AGTEC = 'AGTEC',
  AGTOT = 'AGTOT',
  AGPSS = 'AGPSS',
}

export enum ModalidadeAgenteTroco {
  AGTEC = 'AGTEC',
  AGTOT = 'AGTOT',
}

type InfoAdicional = {
  readonly nome: string;
  readonly valor: string;
};

export type PIXPaylodParams = {
  readonly DPP?: string;
  readonly codMun?: string;
};

export type DevedorPF = {
  readonly cpf: string;
  readonly nome: string;
};

export type DevedorPJ = {
  readonly cnpj: string;
  readonly nome: string;
};

export type Devedor = DevedorPF | DevedorPJ;

export type RetiradaSaque = {
  readonly valor: string;
  readonly modalidadeAlteracao?: 0 | 1;
  readonly modalidadeAgente: ModalidadeAgente;
  readonly prestadorDoServicoDeSaque: string;
};

export type RetiradaTroco = {
  readonly valor: string;
  readonly modalidadeAlteracao?: 0 | 1;
  readonly modalidadeAgente: ModalidadeAgenteTroco;
  readonly prestadorDoServicoDeSaque: string;
};

export type Retirada = {
  readonly saque?: RetiradaSaque;
  readonly troco?: RetiradaTroco;
};

export type PIXFuturePayload = {
  readonly revisao: number;
  readonly calendario: {
    readonly criacao: string;
    readonly apresentacao: string;
    readonly dataDeVencimento?: string;
    readonly validadeAposVencimento?: number;
  };
  readonly devedor?: Devedor;
  readonly recebedor?: {
    readonly cpf?: string;
    readonly cnpj?: string;
    readonly nome: string;
    readonly nomeFantasia?: string;
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
  readonly devedor?: Devedor;
  readonly valor: {
    readonly original: string;
    readonly modalidadeAlteracao?: 0 | 1;
    readonly retirada?: Retirada;
  };
  readonly chave: string;
  readonly txid: string;
  readonly solicitacaoPagador?: string;
  readonly infoAdicionais?: readonly InfoAdicional[];
  readonly status: PixDynamicStatus;
};

export type PIXRecPayload = {
  readonly idRec: string;
  readonly vinculo: {
    readonly objeto: string;
    readonly devedor: Devedor;
    readonly contrato: string;
  };
  readonly calendario: {
    readonly dataInicial: string;
    readonly dataFinal?: string;
    readonly periodicidade: Periodicidade;
  };
  readonly valor?: {
    readonly valorRec: string;
    readonly valorMinimoRecebedor?: string;
  };
  readonly recebedor: {
    readonly ispbParticipante: string;
    readonly cnpj: string;
    readonly nome: string;
  };
  readonly politicaRetentativa: PoliticaRetentativa;
  readonly atualizacao: {
    readonly status: StatusRec;
    readonly data: string;
  }[];
};

export type PIXPayload = PIXInstantPayload | PIXFuturePayload | PIXRecPayload;
