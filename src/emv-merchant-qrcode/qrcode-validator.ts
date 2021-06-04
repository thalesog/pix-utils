import { EMVQR } from '../emv-merchant-qrcode/emv-qrcode-tags'
import {
  QRSchemaElement,
  rootEMVSchema,
  lookupNodeSchema,
} from '../emv-merchant-qrcode/element-scheme'
import { QRCodeNode } from '../emv-merchant-qrcode/qrcode-node'
import { computeCRC } from '../emv-merchant-qrcode/crc'
import { RuleValidator, ValidationError } from '../utils/rule-validator'

export enum QRErrorCode {
  INVALID_PARAM,
  INVALID_QRCODE,
  CRC_MISMATCH,
  MISSING_MANDATORY_ELEMENT,
  INVALID_ELEMENT,
}

export class QRCodeError extends ValidationError<QRErrorCode> {
  constructor(public errorCode: QRErrorCode, message?: string) {
    super(errorCode, message)

    this.errorName = 'EMVQR-' + QRErrorCode[errorCode]
  }
}

const mandatoryElements: number[] = [
  EMVQR.TAG_INIT, // Start
  EMVQR.TAG_MCC,
  EMVQR.TAG_TRANSACTION_CURRENCY,
  EMVQR.TAG_COUNTRY_CODE,
  EMVQR.TAG_MERCHANT_NAME,
  EMVQR.TAG_MERCHANT_CITY,
  EMVQR.TAG_CRC, // CRC
]

function validateElement(val: string | undefined, schema: QRSchemaElement, path: string) {
  //console.log( "Validating: " + path + `[${val}]` )

  // optional?
  if (!val) {
    if (!schema.optional)
      throw new QRCodeError(
        QRErrorCode.MISSING_MANDATORY_ELEMENT,
        `Element ${path} missing and is mandatory`
      )
    return
  }

  // length
  if (schema?.length) {
    if (schema.length instanceof Object) {
      const lenInfo = schema.length

      if (lenInfo.max && val.length > lenInfo.max)
        throw new QRCodeError(
          QRErrorCode.INVALID_ELEMENT,
          `Element ${path} must have maximum length of ${lenInfo.max}`
        )
      if (lenInfo.min && val.length < lenInfo.min)
        throw new QRCodeError(
          QRErrorCode.INVALID_ELEMENT,
          `Element ${path} must have minimum length of ${lenInfo.min}`
        )
    } else {
      if (val.length !== schema.length)
        throw new QRCodeError(
          QRErrorCode.INVALID_ELEMENT,
          `Element ${path} must have length of ${schema.length}`
        )
    }
  }

  // pattern regex
  if (schema?.pattern) {
    const pattern = schema.pattern instanceof RegExp ? schema.pattern : new RegExp(schema.pattern)

    //console.log( `pattern /${pattern.source}/ (${val}) => ${pattern.test(val)}`)
    if (!pattern.test(val))
      throw new QRCodeError(QRErrorCode.INVALID_ELEMENT, `Element ${path} has invalid contents`)
  }
}

function validateNode(node: QRCodeNode, schema: QRSchemaElement, path = '') {
  //console.log( "Validating: " + path + `=[${node.content}]:${node.type}` )

  if (node.isType('data')) {
    validateElement(node.content, schema, path)
  } else {
    node.elements.forEach((element: QRCodeNode) => {
      const nodeSchema: QRSchemaElement = lookupNodeSchema(schema, node, element.tag!)

      const elementPath = path + (path.length ? ':' : '') + ('00' + element.tag!).slice(-2)

      validateNode(element, nodeSchema, elementPath)
    })
  }
}

export function getRuleValidator(): RuleValidator<QRCodeNode> {
  return RuleValidator.get<QRCodeNode>({ id: 'EMVQR' })
    .addRule({
      id: 'start-element-00',
      description: "Initial element is '00' with contents '01'",
      rule: (root) => {
        if (root.getElement(0).baseOffset !== 0) {
          throw new QRCodeError(QRErrorCode.INVALID_QRCODE, 'Missing start element (00)')
        }

        if (root.getElement(0).content !== '01') {
          throw new QRCodeError(QRErrorCode.INVALID_QRCODE, 'Invalid value for start element (00)')
        }
      },
    })
    .addRule({
      id: 'final-element-63',
      description: "Final element is CRC '63'",
      rule: (root) => {
        const crcEl = root.getElement(EMVQR.TAG_CRC)

        if (crcEl.baseOffset !== root.content.length - 8 || root.content.slice(-8, -4) !== '6304') {
          throw new QRCodeError(QRErrorCode.INVALID_QRCODE, 'CRC must be final element (63)')
        }
      },
    })
    .addRule({
      id: 'valid-crc',
      description: 'CRC is valid',
      rule: (root) => {
        const crcEl = root.getElement(EMVQR.TAG_CRC)

        // 3. CRC Correct
        const calculatedCRC = computeCRC(root.content.slice(0, -4))
        if (calculatedCRC !== crcEl.content) {
          throw new QRCodeError(QRErrorCode.CRC_MISMATCH, 'Invalid CRC')
        }
      },
    })
    .addRule({
      id: 'one-or-more-mai',
      description: 'Contains one or more Merchant Account Information elements',
      rule: (root) => {
        const maiList = Array.from(root.elements.keys()).filter((v) => v >= 2 && v <= 51)

        if (maiList.length === 0) {
          throw new QRCodeError(
            QRErrorCode.MISSING_MANDATORY_ELEMENT,
            'Must have at least one Merchant Account Information'
          )
        }
      },
    })
    .addRule({
      id: 'mandatory-elements',
      description: 'Contains EMV mandatory elements',
      rule: (root) => {
        mandatoryElements.forEach((tag) => {
          if (!root.hasElement(tag as number))
            throw new QRCodeError(
              QRErrorCode.MISSING_MANDATORY_ELEMENT,
              'Missing mandatory tag (' + tag + ')'
            )
        })
      },
    })
    .addRule({
      id: 'valid-elements',
      description: 'Elements are valid',
      rule: (root) => {
        validateNode(root, rootEMVSchema)
      },
    })
}
