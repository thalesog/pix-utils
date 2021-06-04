import { PIXPayload } from '../types/PIXPayload'

export function validatePayload(
  payload: PIXPayload,
  options: { isCobV: boolean } = { isCobV: false }
): boolean {
  console.log(payload, options)
  console.log('Not implemented')
  return false
}
