import { toDataURL } from 'qrcode'
import { PIXQRCodeError, PIXQRErrorCode } from './pix-qrcode-validator'

export async function toBase64(brCode: string): Promise<string> {
  try {
    const dataUrl = await toDataURL(brCode)
    return dataUrl.toString()
  } catch (error) {
    throw new PIXQRCodeError(PIXQRErrorCode.INVALID_QRCODE, 'Invalid input string')
  }
}

export async function toImage(brCode: string): Promise<Buffer> {
  const base64 = await toBase64(brCode)
  const matches = base64.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)

  if (matches == null || matches.length !== 3)
    throw new PIXQRCodeError(PIXQRErrorCode.INVALID_QRCODE, 'Invalid input string')

  return Buffer.from(matches[2], 'base64')
}
