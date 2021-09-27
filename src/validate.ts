import {
  PixDynamicObject,
  PixElements,
  PixElementType,
  PixObject,
  PixStaticObject,
} from './types/pixElements';
import { EmvMaiSchema, EmvSchema, ValidTags } from './types/pixEmvSchema';
import { PixError } from './types/pixError';

export function isPix(
  emvElements: ValidTags,
  test: 'pix' | 'valid' | 'static' | 'dynamic'
): boolean {
  if (!emvElements.getTag(EmvSchema.TAG_MAI)) return false;

  const isDynamic = emvElements.getSubTag(
    EmvMaiSchema.TAG_MAI_URL,
    EmvSchema.TAG_MAI
  );
  const isStatic = emvElements.getSubTag(
    EmvMaiSchema.TAG_MAI_PIXKEY,
    EmvSchema.TAG_MAI
  );

  switch (test) {
    case 'pix':
      return true;
    case 'valid':
      return !!isStatic || !!isDynamic;
    case 'static':
      return !!isStatic;
    case 'dynamic':
      return !!isDynamic;
    default:
      return false;
  }
}

export function hasError(
  pixElement: PixObject | PixError
): pixElement is PixError {
  return !!(pixElement as PixError).error;
}

export function hasElementError(
  pixElement: PixElements | PixError
): pixElement is PixError {
  return !!(pixElement as PixError).error;
}

export function isStaticPix(
  pixElement: PixObject
): pixElement is PixStaticObject {
  return pixElement && pixElement.type === PixElementType.STATIC;
}

export function isDynamicPix(
  pixElement: PixObject
): pixElement is PixDynamicObject {
  return pixElement && pixElement.type === PixElementType.DYNAMIC;
}
