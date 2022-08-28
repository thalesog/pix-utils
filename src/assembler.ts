import fetchPayload from './dynamicPayload';
import { createEmv } from './emvHandler';
import {
  PixDynamicObject,
  PixElements,
  PixElementType,
  PixObject,
  PixStaticObject,
} from './types/pixElements';
import { toBase64 } from './utils/qrcodeGenerator';

export function generatePixObject(elements: PixElements): PixObject {
  const emvCode = createEmv(elements);
  switch (elements.type) {
    case PixElementType.STATIC:
      return {
        ...elements,
        toBRCode: () => emvCode,
        toImage: () => toBase64(emvCode),
      } as PixStaticObject;

    case PixElementType.DYNAMIC:
      return {
        ...elements,
        toBRCode: () => emvCode,
        fetchPayload: ({ DPP, codMun }) =>
          fetchPayload({ url: elements.url, DPP, codMun }),
        toImage: () => toBase64(emvCode),
      } as PixDynamicObject;
  }
}
