import { assembleEmvCode } from './emvHandler';
import { PixValidObject, ValidPixElements } from './types/pixElements';

export function generatePixObject(elements: ValidPixElements) {
  return {
    ...elements,
    toBRCode: () => assembleEmvCode(elements),
    toImage: () => {
      return 'Not implemented';
    },
  } as PixValidObject;
}
