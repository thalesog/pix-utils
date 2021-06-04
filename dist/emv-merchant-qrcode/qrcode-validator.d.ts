import { QRCodeNode } from '../emv-merchant-qrcode/qrcode-node';
import { RuleValidator, ValidationError } from '../utils/rule-validator';
export declare enum QRErrorCode {
    INVALID_PARAM = 0,
    INVALID_QRCODE = 1,
    CRC_MISMATCH = 2,
    MISSING_MANDATORY_ELEMENT = 3,
    INVALID_ELEMENT = 4
}
export declare class QRCodeError extends ValidationError<QRErrorCode> {
    errorCode: QRErrorCode;
    constructor(errorCode: QRErrorCode, message?: string);
}
export declare function getRuleValidator(): RuleValidator<QRCodeNode>;
