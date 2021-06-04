export interface DataSchemaElement {
    name: string;
    type?: 'string' | 'integer' | 'boolean';
    optional?: boolean;
    pattern?: string | RegExp;
    length?: number | {
        min?: number;
        max?: number;
    };
}
