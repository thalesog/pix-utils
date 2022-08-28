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
  if (elements.type === PixElementType.STATIC) {
    const staticObject = {
      ...elements,
      toBRCode: () => emvCode,
      toImage: () => toBase64(emvCode),
    };

    const throwIfError = () => ({
      ...staticObject,
      throwIfError: () => staticObject,
    });

    return {
      ...staticObject,
      throwIfError,
    } as PixStaticObject;
  }
  if (elements.type === PixElementType.DYNAMIC) {
    const dynamicObject = {
      ...elements,
      toBRCode: () => emvCode,
      fetchPayload: ({ DPP, codMun }) =>
        fetchPayload({ url: elements.url, DPP, codMun }),
      toImage: () => toBase64(emvCode),
    };

    const throwIfError = () => ({
      ...dynamicObject,
      throwIfError: () => dynamicObject,
    });

    return {
      ...dynamicObject,
      throwIfError,
    } as PixDynamicObject;
  }
  throw new Error('Invalid Pix type');
}
