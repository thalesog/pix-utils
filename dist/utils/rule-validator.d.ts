export declare type xValidationRule<CTX> = (context: CTX, v: RuleValidator<CTX>) => void | ValidationResult | Promise<ValidationResult>;
export interface RuleDescription<CTX> {
    id: string;
    description?: string;
    when?: (context: CTX, v: RuleValidator<CTX>) => boolean | Promise<boolean>;
    rule?: (context: CTX, v: RuleValidator<CTX>) => void | ValidationResult | Promise<ValidationResult>;
}
export declare class ValidationError<EC = any> extends Error {
    errorCode: EC;
    errorName: string;
    constructor(errorCode: EC, message?: string);
}
export declare type ValidationResult = {
    status: 'none' | 'not-applicable' | 'running' | 'pass' | 'inconclusive' | 'fail';
    error?: ValidationError;
};
export declare type ValidationObserver = (v: RuleValidator<any>, result: ValidationResult) => void;
export declare class RuleValidator<CTX> {
    ruleInfo: RuleDescription<CTX>;
    parent?: RuleValidator<CTX>;
    protected childValidators: RuleValidator<CTX>[];
    constructor(ruleInfo: RuleDescription<CTX>);
    static get<CTX>(info: RuleDescription<CTX>): RuleValidator<CTX>;
    addRule(info: RuleDescription<CTX>): this;
    addValidator(rule: RuleValidator<CTX>): this;
    result: ValidationResult;
    protected handleResult(res: ValidationResult, observer?: ValidationObserver, isFinal?: boolean): ValidationResult;
    protected executeRule(context: CTX): Promise<ValidationResult>;
    validate(context: CTX, observer?: ValidationObserver): Promise<ValidationResult>;
}
