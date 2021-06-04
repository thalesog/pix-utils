import { QRCodeNode } from '../emv-merchant-qrcode/qrcode-node';
import { QRSchemaElement } from '../emv-merchant-qrcode/element-scheme';
import { ValidationObserver, ValidationResult } from '../utils/rule-validator';
import { EMVQRCodeBasicElements } from '../types/PIXElements';
declare type EMVEncoding = 'utf8' | 'base64';
export interface EMVMerchantQRParams {
    encoding?: EMVEncoding;
}
export declare class EMVMerchantQRCode extends QRCodeNode {
    type: 'root';
    protected constructor(qrCode: string, params: EMVMerchantQRParams);
    static createCode(basicElements?: EMVQRCodeBasicElements): EMVMerchantQRCode;
    static parseCode(qrCode: string, params?: EMVMerchantQRParams): EMVMerchantQRCode;
    getDataElement(tag: number): string;
    extractElements(): EMVQRCodeBasicElements;
    validateCode(observer?: ValidationObserver): Promise<ValidationResult>;
    buildQRString(): string;
    dumpNode(node: QRCodeNode | undefined, schema: QRSchemaElement, indent: string): string;
}
export {};
