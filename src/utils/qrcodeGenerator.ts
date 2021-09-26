import { toDataURL } from 'qrcode';

export async function toBase64(brCode: string): Promise<string> {
  return toDataURL(brCode);
}
