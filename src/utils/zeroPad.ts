export default function zeroPad(value: number, size: number) {
  return ('0'.repeat(size) + String(value)).substring(-size);
}
