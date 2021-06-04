export interface EMVQRCodeMandatoryElements {
    merchantCategoryCode: string;
    transactionCurrency: number;
    countryCode: string;
    merchantName: string;
    merchantCity: string;
}
export interface EMVQRCodeBasicElements extends EMVQRCodeMandatoryElements {
    oneTime?: boolean;
    transactionAmount?: number;
}
export interface PIXDynamicElements extends EMVQRCodeBasicElements {
    type: 'dynamic';
    url: string;
}
export interface PIXStaticElements extends EMVQRCodeBasicElements {
    type: 'static';
    chave: string;
    txid?: string;
    infoAdicional?: string;
}
export declare type PIXQRCodeElements = PIXStaticElements | PIXDynamicElements;
