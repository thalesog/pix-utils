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
  switch (elements.type) {
    case PixElementType.STATIC:
      return {
        ...elements,
        toBRCode: () => createEmv(elements),
        toImage: () => toBase64(createEmv(elements)),
      } as PixStaticObject;

    case PixElementType.DYNAMIC:
      return {
        ...elements,
        toBRCode: () => createEmv(elements),
        fetchPayload: ({ DPP, codMun }) =>
          fetchPayload({ url: elements.url, DPP, codMun }),
        toImage: () => toBase64(createEmv(elements)),
      } as PixDynamicObject;
  }
}
