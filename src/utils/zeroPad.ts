export default function zeroPad(value: number, size: number) {
  return `${value}`.padStart(size, '0');
}
