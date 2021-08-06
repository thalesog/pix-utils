export declare enum PixDynamicStatus {
    ATIVA = "ATIVA",
    CONCLUIDA = "CONCLUIDA",
    REMOVIDA_PELO_USUARIO_RECEBEDOR = "REMOVIDA_PELO_USUARIO_RECEBEDOR",
    REMOVIDA_PELO_PSP = "REMOVIDA_PELO_PSP"
}
declare type InfoAdicional = {
    nome: string;
    valor: string;
};
export declare type PIXPaylodParams = {
    DPP?: string;
    codMun?: string;
};
export declare type PIXFuturePayload = {
    revisao: number;
    calendario: {
        criacao: string;
        apresentacao: string;
        dataDeVencimento?: string;
        validadeAposVencimento?: number;
    };
    devedor?: {
        cpf?: string;
        cnpj?: string;
        nome?: string;
    };
    recebedor?: {
        cpf?: string;
        cnpj?: string;
        nome: string;
        logradouro: string;
        cidade: string;
        utf: string;
        cep: string;
    };
    valor: {
        original?: string;
        multa?: string;
        juros?: string;
        abatimento?: string;
        desconto?: string;
        final: string;
    };
    chave: string;
    txid: string;
    solicitacaoPagador?: string;
    infoAdicionais: InfoAdicional[];
    status: PixDynamicStatus;
};
export declare type PIXInstantPayload = {
    revisao: number;
    calendario: {
        criacao: string;
        apresentacao: string;
        expiracao: number;
    };
    devedor?: {
        cpf?: string;
        cnpj?: string;
        nome: string;
    };
    valor: {
        original: string;
        modalidadeAlteracao?: 0 | 1;
    };
    chave: string;
    txid: string;
    solicitacaoPagador?: string;
    infoAdicionais?: InfoAdicional[];
    status: PixDynamicStatus;
};
export declare type PIXPayload = PIXInstantPayload | PIXFuturePayload;
export declare const PayloadExample: PIXPayload;
export {};
