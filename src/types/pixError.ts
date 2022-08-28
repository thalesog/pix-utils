export type PixError = {
  readonly error: boolean;
  readonly message: string;
  readonly throwIfError: () => never;
};
