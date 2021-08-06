import { EMVQR } from '../emv-merchant-qrcode/emv-qrcode-tags'
import { QRCodeNode } from '../emv-merchant-qrcode/qrcode-node'
import { getRuleValidator, QRCodeError, QRErrorCode } from '../emv-merchant-qrcode/qrcode-validator'
import { computeCRC } from '../emv-merchant-qrcode/crc'

import { QRSchemaElement } from '../emv-merchant-qrcode/element-scheme'
import { ValidationObserver, ValidationResult } from '../utils/rule-validator'
import { EMVQRCodeBasicElements } from '../types/PIXElements'

type EMVEncoding = 'utf8' | 'base64'

export interface EMVMerchantQRParams {
  encoding?: EMVEncoding
}

const defaultParams: EMVMerchantQRParams = {
  encoding: 'utf8',
}

const convertCode = (qrCode = '', encoding: EMVEncoding = 'utf8'): string => {
  switch (encoding) {
    case 'utf8':
      return qrCode

    case 'base64': {
      const u8 = Buffer.from(qrCode, 'base64')
      return new TextDecoder().decode(u8)
    }

    default:
      throw new QRCodeError(QRErrorCode.INVALID_PARAM, "encoding must be 'utf8' or 'base64'")
  }
}

export class EMVMerchantQRCode extends QRCodeNode {
  type: 'root' = 'root'

  protected constructor(qrCode: string, params: EMVMerchantQRParams) {
    super('root', convertCode(qrCode, params.encoding))
  }

  static createCode(basicElements?: EMVQRCodeBasicElements): EMVMerchantQRCode {
    const root = new EMVMerchantQRCode('', { encoding: 'utf8' })
    if (basicElements) {
      root.newDataElement(EMVQR.TAG_MCC, basicElements.merchantCategoryCode)

      root.newDataElement(
        EMVQR.TAG_TRANSACTION_CURRENCY,
        ('000' + basicElements.transactionCurrency).slice(-3)
      )

      root.newDataElement(EMVQR.TAG_COUNTRY_CODE, basicElements.countryCode)
      root.newDataElement(EMVQR.TAG_MERCHANT_NAME, basicElements.merchantName)
      root.newDataElement(EMVQR.TAG_MERCHANT_CITY, basicElements.merchantCity)
      if (basicElements.oneTime) root.newDataElement(EMVQR.TAG_ONETIME_PAYMENT, '12')
      if (basicElements.transactionAmount)
        root.newDataElement(
          EMVQR.TAG_TRANSACTION_AMOUNT,
          basicElements.transactionAmount.toFixed(2)
        )
    }

    return root
  }

  static parseCode(qrCode: string, params?: EMVMerchantQRParams): EMVMerchantQRCode {
    params = {
      ...defaultParams,
      ...params,
    }

    const root = new EMVMerchantQRCode(qrCode, params)

    function toTemplate(node: QRCodeNode, isIdentified: boolean, tag: number, lastTag?: number) {
      for (let index = tag; index <= (lastTag ?? tag); ++index) {
        if (node.hasElement(index)) node.getElement(index).parseAsTemplate(isIdentified)
      }
    }

    // process MAI 26..51
    toTemplate(root, true, EMVQR.MAI_TEMPLATE_FIRST, EMVQR.MAI_TEMPLATE_LAST)

    // EL62 Additional Data Field Template
    if (root.hasElement(EMVQR.TAG_ADDITIONAL_DATA)) {
      toTemplate(root, false, EMVQR.TAG_ADDITIONAL_DATA)

      // Payment system specific .. child 50.99
      toTemplate(root.getElement(EMVQR.TAG_ADDITIONAL_DATA), true, 50, 99)
    }

    // EL64 = Language stuff
    toTemplate(root, false, 64)

    // EL80-99 =
    toTemplate(root, true, 80, 99)

    return root
  }

  getDataElement(tag: number): string {
    if (this.hasElement(tag)) {
      return this.getElement(tag).content
    }
    return ''
  }

  extractElements(): EMVQRCodeBasicElements {
    const basicElements: EMVQRCodeBasicElements = {
      merchantCategoryCode: this.getDataElement(EMVQR.TAG_MCC),
      transactionCurrency: Number(+this.getDataElement(EMVQR.TAG_TRANSACTION_CURRENCY)),
      countryCode: this.getDataElement(EMVQR.TAG_COUNTRY_CODE),
      merchantName: this.getDataElement(EMVQR.TAG_MERCHANT_NAME),
      merchantCity: this.getDataElement(EMVQR.TAG_MERCHANT_CITY),
      transactionAmount: Number(+this.getDataElement(EMVQR.TAG_TRANSACTION_AMOUNT)),
      oneTime: this.getDataElement(EMVQR.TAG_ONETIME_PAYMENT) === '12',
    }

    return basicElements
  }

  /*
   * Validate QR code by EMV Rules
   */
  async validateCode(observer?: ValidationObserver): Promise<ValidationResult> {
    return getRuleValidator().validate(this, observer)
  }

  /*
   * Rebuild string from QR Node structure, calculating correct CRC
   */
  buildQRString(): string {
    let content = this.content

    // "00" - first element in QR string
    content = this.ensureDataElement(0, '01').buildQRString()

    // build rest (-00,-63) .. passing correct offset
    content += super.buildQRString(content.length)

    // Recalculate CRC - tag "63" - last element in QR string

    // reset CRC with correct length and concat tag+length
    content += this.newDataElement(EMVQR.TAG_CRC, '0000').buildQRString(content.length).slice(0, -4)

    // Recalculate CRC .. upto to and including tag+length of "63"
    const crc = computeCRC(content)
    this.getElement(EMVQR.TAG_CRC).content = crc

    // reset content
    this.baseOffset = 0
    this.content = content = content + crc

    return content
  }

  dumpNode(node: QRCodeNode = this, schema: QRSchemaElement, indent: string): string {
    let result = ''

    if (node.isType('data')) {
      result += `${indent} ${('00' + node.tag).slice(-2)} (${schema.name})\n`
      result += `${indent} ${node.content}\n`
    } else {
      if (!node.isType('root')) {
        result += indent + '(' + ('00' + node.tag).slice(-2) + '): ' + schema.name + '\n'

        indent += '  '
      }

      node.elements.forEach((element: QRCodeNode) => {
        const nodeSchema: QRSchemaElement = schema?.elementMap?.[element.tag!] ?? {
          name: 'unknown',
          elementMap: {},
        }
        result += this.dumpNode(element, nodeSchema, indent)
      })
    }

    return result
  }
}
