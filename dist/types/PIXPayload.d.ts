export declare type PIXPayload = {
    revisao: number;
    calendario: {
        criacao: string;
        apresentacao: string;
        expiracao?: number;
        vencimento?: string;
        diasAposVencimento?: number;
    };
    devedor?: {
        cpf?: string;
        cnpj?: string;
        nome?: string;
    };
    valor: {
        original?: string;
        final?: string;
        juros?: string;
        multa?: string;
        desconto?: string;
        abatimento?: string;
        modalidadeAlteracao: number;
    };
    chave: string;
    txid: string;
    solicitacaoPagador?: string;
    infoAdicionais: {
        nome: string;
        valor: string;
    }[];
    status: string;
};
export declare const PayloadExample: PIXPayload;
