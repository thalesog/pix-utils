declare type QRElementMap = Map<number, QRCodeNode>;
declare type QRNodeType = 'root' | 'data' | 'template' | 'identified-template' | 'void';
export declare class QRCodeNode {
    type: QRNodeType;
    content: string;
    baseOffset: number;
    elements: QRElementMap;
    isType(type: QRNodeType): boolean;
    isTemplate(): boolean;
    readonly tag?: number;
    constructor(type: QRNodeType, content: string, tag?: number, baseOffset?: number);
    parseElementSequence(sequence: string, baseOffset?: number): QRElementMap;
    parseAsTemplate(isIdentified: boolean): this;
    hasElement(tag: number): boolean;
    getElement(tag: number): QRCodeNode;
    newDataElement(tag: number, content: string): QRCodeNode;
    newTemplateElement(tag: number, lastTag?: number, isIdentified?: boolean, nodes?: QRCodeNode[]): QRCodeNode;
    deleteElement(tag: number): void;
    toJSON(): any;
    ensureDataElement(tag: number, defaultContent?: string): QRCodeNode;
    private buildTagLength;
    buildQRString(offset?: number): string;
    findIdentifiedTemplate(id: string, first?: number, last?: number): QRCodeNode[];
}
export {};
