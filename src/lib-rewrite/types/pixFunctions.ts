export type PixFnDefault = {
  readonly toEmvCode: () => string;
  readonly toImage: () => string;
  readonly isStatic: () => boolean;
  readonly isDynamic: () => boolean;
};

export type PixDynamicFn = PixFnDefault & {
  readonly fetchPayload: () => string;
};
