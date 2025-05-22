import fetchPayload, { fetchRecPayload } from './dynamicPayload';
import { createEmv } from './emvHandler';
import { PixElement, PixElementType, PixObject } from './types/pixElements';
import { toBase64 } from './utils/qrcodeGenerator';

function generateThrowFn<T extends PixElementType>(
  obj: PixElement[T]
): () => PixObject[T] {
  return () => ({
    ...obj,
    throwIfError: () => obj,
  });
}

export function generatePixObject<T extends PixElementType>(
  elements: PixElement[T]
): PixObject[T] {
  if (elements.type === PixElementType.INVALID) {
    throw new Error('Invalid Pix type');
  }

  const emvCode = createEmv(elements);

  const generatedObject = {
    ...elements,
    toBRCode: () => emvCode,
    toImage: () => toBase64(emvCode),
    ...(elements.type === PixElementType.STATIC && elements.urlRec
      ? {
          fetchPayloadRec: () => fetchRecPayload({ url: elements.urlRec }),
        }
      : {}),
    ...(elements.type === PixElementType.DYNAMIC
      ? {
          fetchPayload: ({ DPP, codMun }) =>
            fetchPayload({ url: elements.url, DPP, codMun }),
        }
      : {}),
    ...(elements.type === PixElementType.COMPOSITE
      ? {
          fetchPayload: elements.url
            ? ({ DPP, codMun }) =>
                fetchPayload({ url: elements.url, DPP, codMun })
            : undefined,
          fetchPayloadRec: () => fetchRecPayload({ url: elements.urlRec }),
        }
      : {}),
  };

  return {
    ...generatedObject,
    throwIfError: generateThrowFn<T>(generatedObject),
  };
}
