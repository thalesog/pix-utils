import { PixError } from '../types/pixError';

export function generateErrorObject(message: string): PixError {
  return {
    error: true,
    message,
    throwIfError: () => {
      throw new Error(message);
    },
  };
}
