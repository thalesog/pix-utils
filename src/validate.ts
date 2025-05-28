import {
  PixDynamicObject,
  PixElements,
  PixElementType,
  PixObjects,
  PixRecurrenceObject,
  PixStaticObject,
} from './types/pixElements';
import { EmvMaiSchema, EmvSchema, ValidTags } from './types/pixEmvSchema';
import { PixError } from './types/pixError';

export function isPix(
  emvElements: ValidTags,
  test: 'pix' | 'valid' | 'static' | 'dynamic' | 'recurrence'
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

  const isRecurrence = emvElements.getSubTag(
    EmvMaiSchema.TAG_MAI_URL,
    EmvSchema.TAG_UNRESERVED_TEMPLATE
  );

  switch (test) {
    case 'pix':
      return true;
    case 'valid':
      return !!isStatic || !!isDynamic || !!isRecurrence;
    case 'static':
      return !!isStatic;
    case 'dynamic':
      return !!isDynamic;
    case 'recurrence':
      return !!isRecurrence;
    default:
      return false;
  }
}

export function hasError(
  pixElement: PixObjects | PixError
): pixElement is PixError {
  return !!(pixElement as PixError).error;
}

export function hasElementError(
  pixElement: PixElements | PixError
): pixElement is PixError {
  return !!(pixElement as PixError).error;
}

export function isStaticPix(
  pixElement: PixObjects
): pixElement is PixStaticObject {
  return pixElement && pixElement.type === PixElementType.STATIC;
}

export function isDynamicPix(
  pixElement: PixObjects
): pixElement is PixDynamicObject {
  return pixElement && pixElement.type === PixElementType.DYNAMIC;
}

export function isRecurrencePix(
  pixElement: PixObjects
): pixElement is PixRecurrenceObject {
  return pixElement && pixElement.type === PixElementType.RECURRENCE;
}
