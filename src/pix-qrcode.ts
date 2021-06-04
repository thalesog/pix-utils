import fetchPayload, { PIXFetchResults } from './payload/fetchPayload'
import { ValidationObserver, ValidationResult } from './utils/rule-validator'
import { EMVMerchantQRCode, EMVMerchantQRParams } from './emv-merchant-qrcode/emv-merchant-qrcode'
import { EMVQR } from './emv-merchant-qrcode/emv-qrcode-tags'
import { QRCodeNode } from './emv-merchant-qrcode/qrcode-node'
import { getRuleValidator, PIXQRCodeError, PIXQRErrorCode } from './pix-qrcode-validator'
import { PIXQRCodeElements } from './types/PIXElements'

export class PIX {
  static GUI = 'br.gov.bcb.pix'
  static TAG_MAI_CHAVE = 1
  static TAG_MAI_INFO_ADD = 2
  static TAG_MAI_URL = 25
}

export class PIXQRCode {
  protected emvQRCode: EMVMerchantQRCode

  protected constructor(emvQRCode: EMVMerchantQRCode) {
    this.emvQRCode = emvQRCode
  }

  getMAI(): QRCodeNode {
    const maiList = this.emvQRCode.findIdentifiedTemplate(
      PIX.GUI,
      EMVQR.MAI_TEMPLATE_FIRST,
      EMVQR.MAI_TEMPLATE_LAST
    )

    return maiList[0]
  }

  static createCode(elements: PIXQRCodeElements): PIXQRCode {
    const pixQRCode = new PIXQRCode(EMVMerchantQRCode.createCode(elements))
    const emvQRCode = pixQRCode.emvQRCode
    const guiNode = new QRCodeNode('data', PIX.GUI, EMVQR.TAG_TEMPLATE_GUI)

    const maiPIX = emvQRCode.newTemplateElement(
      EMVQR.MAI_TEMPLATE_FIRST,
      EMVQR.MAI_TEMPLATE_LAST,
      true,
      [guiNode]
    )

    if (elements.type === 'static') {
      if (elements.chave) maiPIX.newDataElement(PIX.TAG_MAI_CHAVE, elements.chave)

      if (elements.infoAdicional)
        maiPIX.newDataElement(PIX.TAG_MAI_INFO_ADD, elements.infoAdicional)

      if (elements.txid) {
        const el62 = emvQRCode.newTemplateElement(EMVQR.TAG_ADDITIONAL_DATA)
        el62.newDataElement(EMVQR.TAG_AD_REF_LABEL, elements.txid)
      }
    } else {
      if (elements.url) maiPIX.newDataElement(PIX.TAG_MAI_URL, elements.url)
    }

    return pixQRCode
  }

  static parseCode(qrCode: string, params?: EMVMerchantQRParams): PIXQRCode {
    return new PIXQRCode(EMVMerchantQRCode.parseCode(qrCode, params))
  }

  public async validateCode(observer?: ValidationObserver): Promise<ValidationResult> {
    return await getRuleValidator().validate(this, observer)
  }

  isPIX(test: 'pix' | 'valid' | 'static' | 'dynamic'): boolean {
    const pixMAI = this.getMAI()
    if (!pixMAI) return false

    const isStatic = pixMAI.hasElement(PIX.TAG_MAI_CHAVE)
    const isDynamic = pixMAI.hasElement(PIX.TAG_MAI_URL)

    switch (test) {
      case 'pix':
        return true
      case 'valid':
        return isStatic || isDynamic
      case 'static':
        return isStatic
      case 'dynamic':
        return isDynamic
      default:
        return false
    }
  }

  extractElements(): PIXQRCodeElements {
    const emvQR = this.emvQRCode
    const basicElements = emvQR.extractElements()

    if (this.isPIX('static')) {
      return {
        type: 'static',
        ...basicElements,
        chave: this.getMAI()?.getElement(PIX.TAG_MAI_CHAVE).content,
        infoAdicional: this.getMAI()?.getElement(PIX.TAG_MAI_INFO_ADD).content,
        txid: emvQR.getElement(EMVQR.TAG_ADDITIONAL_DATA)?.getElement(EMVQR.TAG_AD_REF_LABEL)
          ?.content,
      }
    } else if (this.isPIX('dynamic')) {
      return {
        type: 'dynamic',
        ...basicElements,
        url: this.getMAI()?.getElement(PIX.TAG_MAI_URL).content,
      }
    }

    throw new PIXQRCodeError(
      PIXQRErrorCode.INVALID_QRCODE,
      'Unable to extract static/dynamic elements'
    )
  }

  async getPayloadData(): Promise<PIXFetchResults | false> {
    if (this.isPIX('dynamic')) {
      return await fetchPayload(this.getMAI()?.getElement(PIX.TAG_MAI_URL).content)
    }
    throw new PIXQRCodeError(
      PIXQRErrorCode.MISSING_MANDATORY_ELEMENT,
      'You can only get payload data from dynamic '
    )
  }
}
