import {
  DynamicPixEmvElements,
  InvalidPixElements,
  PixElementType,
  PixEmvElements,
  StaticPixEmvElements,
} from './types/pixElements';
import { EmvMaiSchema, EmvSchema, ValidTags } from './types/pixEmvSchema';

export function isPIX(
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

export function isInvalid(
  pixElement: PixEmvElements
): pixElement is InvalidPixElements {
  return pixElement && pixElement.type === PixElementType.INVALID;
}

export function isStaticPix(
  pixElement: PixEmvElements
): pixElement is StaticPixEmvElements {
  return pixElement && pixElement.type === PixElementType.STATIC;
}

export function isDynamicPix(
  pixElement: PixEmvElements
): pixElement is DynamicPixEmvElements {
  return pixElement && pixElement.type === PixElementType.DYNAMIC;
}
