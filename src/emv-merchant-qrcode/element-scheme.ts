import { DataSchemaElement } from '../utils/data-schema-element'
import { EMVQR } from '../emv-merchant-qrcode/emv-qrcode-tags'
import { QRCodeNode } from '../emv-merchant-qrcode/qrcode-node'

export interface QRSchemaElement extends DataSchemaElement {
  lastTag?: number
  elementMap?: QRElementSchemaMap
  identifiedElementMap?: Record<string, QRElementSchemaMap>
}

export type QRElementSchemaMap = Record<number, QRSchemaElement>

const paymentSystemSpecificTemplateMap = {
  0: {
    name: 'Globally Unique Identifier',
    length: { max: 32 },
    optional: true,
  },
  1: {
    lastTag: 99,
    name: 'Payment System specific',
    optional: true,
  },
}

const reservedTemplateMap = {
  0: {
    name: 'Globally Unique Identifier',
    length: { max: 32 },
    optional: true,
  },
  1: {
    lastTag: 99,
    name: 'Context specific data',
    optional: true,
  },
}

const additionalDataFieldMap: QRElementSchemaMap = {
  1: {
    name: 'Bill Number',
    length: { max: 25 },
    optional: true,
  },
  2: {
    name: 'Mobile Number',
    length: { max: 25 },
    optional: true,
  },
  3: {
    name: 'Store Label',
    length: { max: 25 },
    optional: true,
  },
  4: {
    name: 'Loyalty Number',
    length: { max: 25 },
    optional: true,
  },
  5: {
    name: 'Reference Label',
    length: { max: 25 },
    optional: true,
  },
  6: {
    name: 'Customer Label',
    length: { max: 25 },
    optional: true,
  },
  7: {
    name: 'Terminal Label',
    length: { max: 25 },
    optional: true,
  },
  8: {
    name: 'Purpose of Transaction',
    length: { max: 25 },
    optional: true,
  },
  9: {
    name: 'Additional Consumer Data Request',
    length: { max: 25 },
    optional: true,
  },
  10: {
    lastTag: 49,
    name: 'RFU for EMVCo',
    optional: true,
  },
  50: {
    lastTag: 99,
    name: 'Payment System specific template',
    optional: true,
    elementMap: paymentSystemSpecificTemplateMap,
  },
}

const merchantInformationLanguageTemplateMap = {
  0: {
    name: 'Language Preference',
    optional: true,
  },
  1: {
    name: 'Merchant Name - Alternate Language',
    optional: true,
  },
  3: {
    name: 'Merchant City - Alternate Language',
    optional: true,
  },
}

const rootSchemaMap: QRElementSchemaMap = {
  0: {
    name: 'Payload Format Indicator',
    length: 2,
    pattern: /^01$/,
  },
  1: {
    name: 'Point of Initiation Method',
    optional: true,
    length: 2,
    pattern: /^1[12]$/,
  },
  2: {
    lastTag: 25,
    name: 'Merchant Account Information',
    length: { max: 99 },
  },
  26: {
    lastTag: 51,
    name: 'Merchant Account Information',
    elementMap: paymentSystemSpecificTemplateMap,
  },
  52: {
    name: 'Merchant Category Code',
    length: 4,
    pattern: /^\d*$/,
  },
  53: {
    name: 'Transaction Currency',
    length: 3,
    pattern: /^\d*$/,
  },
  54: {
    name: 'Transaction Amount',
    length: { max: 13 },
    pattern: /^[\d]+(.\d\d)?$/,
  },
  55: {
    name: 'Tip or Convenience Indicator',
    length: 2,
    optional: true,
  },
  56: {
    name: 'Value of Convenience Fee Fixed',
    length: { max: 13 },
    pattern: /^[\d]+(.\d\d)?$/,
    //    presence: 'C',
  },
  57: {
    name: 'Value of Convenience Fee Percentage',
    //    presence: 'C',
  },
  58: {
    name: 'Country Code',
    length: 2,
  },
  59: {
    name: 'Merchant Name',
    length: { max: 25 },
  },
  60: {
    name: 'Merchant City',
  },
  61: {
    name: 'Postal Code',
    optional: true,
  },
  62: {
    name: 'Additional Data Field Template',
    optional: true,
    elementMap: additionalDataFieldMap,
  },
  63: {
    name: 'CRC',
    pattern: /^[A-Fa-f\d]*$/,
  },
  64: {
    name: 'Merchant Information — Language Template',
    optional: true,
    elementMap: merchantInformationLanguageTemplateMap,
  },
  65: {
    lastTag: 79,
    name: 'RFU for EMVCo',
    optional: true,
  },
  80: {
    lastTag: 99,
    name: 'Unreserved Templates',
    optional: true,
    elementMap: reservedTemplateMap,
  },
}

export const rootEMVSchema = {
  name: 'root',
  elementMap: rootSchemaMap,
}

export function lookupNodeSchema(
  schema: QRSchemaElement,
  node: QRCodeNode,
  tag: number
): QRSchemaElement {
  let elementMap = schema?.elementMap

  if (schema?.identifiedElementMap) {
    if (node.hasElement(EMVQR.TAG_TEMPLATE_GUI)) {
      const gui = node.getElement(EMVQR.TAG_TEMPLATE_GUI).content.toUpperCase()
      // TODO: Replace with map()
      for (const xx in schema.identifiedElementMap) {
        if (xx.toUpperCase() === gui) {
          elementMap = {
            ...elementMap,
            ...schema.identifiedElementMap[xx],
          }
        }
      }
    }
  }

  let nodeSchema: QRSchemaElement = { name: 'Unknown', elementMap: {} }

  if (elementMap?.[tag]) {
    nodeSchema = elementMap[tag]
  } else {
    // Not found ..
    for (const xx in elementMap) {
      const elTag = parseInt(xx)
      const el = elementMap[elTag]

      if (tag >= elTag && el.lastTag && tag <= el.lastTag) {
        nodeSchema = el
      }
    }
  }

  return nodeSchema
}
