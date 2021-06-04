import { RuleValidator, ValidationError } from './utils/rule-validator';
import { PIXQRCode } from './pix-qrcode';
export declare enum PIXQRErrorCode {
    OK = 0,
    INVALID_QRCODE = 1,
    CRC_MISMATCH = 2,
    MISSING_MANDATORY_ELEMENT = 3,
    MISSING_PIX_MAI = 4,
    PIX_MAI_INVALID = 5,
    DUPLICATE_PIX_MAI = 6
}
export declare class PIXQRCodeError extends ValidationError<PIXQRErrorCode> {
    errorCode: PIXQRErrorCode;
    constructor(errorCode: PIXQRErrorCode, message?: string);
}
export declare function getRuleValidator(): RuleValidator<PIXQRCode>;
