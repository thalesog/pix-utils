import { DataSchemaElement } from '../utils/data-schema-element';
import { QRCodeNode } from '../emv-merchant-qrcode/qrcode-node';
export interface QRSchemaElement extends DataSchemaElement {
    lastTag?: number;
    elementMap?: QRElementSchemaMap;
    identifiedElementMap?: Record<string, QRElementSchemaMap>;
}
export declare type QRElementSchemaMap = Record<number, QRSchemaElement>;
export declare const rootEMVSchema: {
    name: string;
    elementMap: QRElementSchemaMap;
};
export declare function lookupNodeSchema(schema: QRSchemaElement, node: QRCodeNode, tag: number): QRSchemaElement;
