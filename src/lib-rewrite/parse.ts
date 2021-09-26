import { ParsedTags, TagsWithSubTags } from './types/pixEmvSchema';

export function parseEmv({
  emvCode,
  currentIndex = 0,
  currentData = {},
}): ParsedTags {
  const tag = +emvCode.substring(currentIndex, currentIndex + 2);
  const length = Number(emvCode.substring(currentIndex + 2, currentIndex + 4));
  const value = emvCode.substring(currentIndex + 4, currentIndex + 4 + length);

  if (!length || !value.length || length !== value.length) {
    return {
      isValid: false,
      rawTags: currentData,
    };
  }

  const newData = {
    ...currentData,
    [tag]: {
      tag: tag,
      length: length,
      value: value,
      ...(Object.values(TagsWithSubTags).includes(tag)
        ? { subTags: parseEmv({ emvCode: value }) }
        : {}),
    },
  };

  if (currentIndex + 4 + length === emvCode.length) {
    return {
      isValid: true,
      rawTags: newData,
      getTag: (tag: string | number) => newData?.[Number(tag)]?.value,
      getSubTag: (tag: string | number, mainTag: string | number) =>
        newData?.[Number(mainTag)]?.subTags?.getTag(Number(tag)),
    };
  } else {
    return parseEmv({
      emvCode,
      currentIndex: currentIndex + 4 + length,
      currentData: newData,
    });
  }
}
