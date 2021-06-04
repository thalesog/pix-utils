import { PIXFetchResults } from './payload/fetchPayload';
import { ValidationObserver, ValidationResult } from './utils/rule-validator';
import { EMVMerchantQRCode, EMVMerchantQRParams } from './emv-merchant-qrcode/emv-merchant-qrcode';
import { QRCodeNode } from './emv-merchant-qrcode/qrcode-node';
import { PIXQRCodeElements } from './types/PIXElements';
export declare class PIX {
    static GUI: string;
    static TAG_MAI_CHAVE: number;
    static TAG_MAI_INFO_ADD: number;
    static TAG_MAI_URL: number;
}
export declare class PIXQRCode {
    protected emvQRCode: EMVMerchantQRCode;
    protected constructor(emvQRCode: EMVMerchantQRCode);
    getMAI(): QRCodeNode;
    static createCode(elements: PIXQRCodeElements): PIXQRCode;
    static parseCode(qrCode: string, params?: EMVMerchantQRParams): PIXQRCode;
    validateCode(observer?: ValidationObserver): Promise<ValidationResult>;
    isPIX(test: 'pix' | 'valid' | 'static' | 'dynamic'): boolean;
    extractElements(): PIXQRCodeElements;
    getPayloadData(): Promise<PIXFetchResults | false>;
}
